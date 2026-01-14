const { User, LoginHistory } = require('../models');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const status = require('../helpers/response');

exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return status.badRequestResponse(res, 'Email already registered');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await User.create({
      username,
      email,
      passwordHash,
      fullName,
      role: role || 'editor',
      isActive: true
    });

    // Generate token
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return status.createdResponse(res, 'User registered successfully', {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return status.errorResponse(res, 'Registration failed', 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return status.unauthorizedResponse(res, 'Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      return status.forbiddenResponse(res, 'Account is inactive');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return status.unauthorizedResponse(res, 'Invalid credentials');
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    // Log login history
    await LoginHistory.create({
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      loginAt: new Date()
    });

    // Generate token
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return status.successResponse(res, 'Login successful', {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return status.errorResponse(res, 'Login failed', 500);
  }
};

exports.me = async (req, res) => {
  try {
    return status.successResponse(res, 'User profile', {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return status.errorResponse(res, 'Failed to get profile', 500);
  }
};

