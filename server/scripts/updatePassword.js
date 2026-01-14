/**
 * Script to update user password
 * Usage: node scripts/updatePassword.js <email> <newPassword>
 */

require('dotenv').config();
const { sequelize } = require('../models');
const { hashPassword } = require('../utils/password');
const { User } = require('../models');

async function updatePassword() {
  try {
    const email = process.argv[2] || 'raghul.je@refex.co.in';
    const newPassword = process.argv[3] || 'RefexAdmin@123';

    console.log(`\n🔐 Updating password for: ${email}`);
    
    // Find user
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.error(`❌ User not found: ${email}`);
      process.exit(1);
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword);
    
    // Update user
    await user.update({ passwordHash });
    
    console.log(`✅ Password updated successfully for: ${user.fullName}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   New password: ${newPassword}`);
    
    // Test login
    const { comparePassword } = require('../utils/password');
    const isValid = await comparePassword(newPassword, user.passwordHash);
    console.log(`\n🧪 Password verification test: ${isValid ? '✅ PASSED' : '❌ FAILED'}`);
    
  } catch (error) {
    console.error('❌ Error updating password:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

updatePassword();

