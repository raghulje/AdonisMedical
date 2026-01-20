import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../../../contexts/AuthContext';
import { getDefaultImageUrl } from '../../../utils/imageUrl';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }

    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      // Navigation is handled by the login function in AuthContext
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl" data-aos="zoom-in">
          {/* Logo */}
          <div className="flex justify-center mb-6" data-aos="fade-down" data-aos-delay="100">
            <img 
              src={getDefaultImageUrl('2024/09/logo_adonis_4x-1.svg')} 
              alt="Adonis Medical Logo" 
              className="h-16 transition-all duration-300 hover:scale-110"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="150">
            <h1 className="text-3xl font-medium text-[#1F2937] mb-2">Admin Portal</h1>
            <p className="text-sm text-[#6B7280]">Sign in to access the content management system</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-[#9CA3AF] text-lg"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all duration-300 hover:border-[#3B82F6] text-[#1F2937] placeholder-[#9CA3AF]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div data-aos="fade-up" data-aos-delay="250">
              <label htmlFor="password" className="block text-sm font-medium text-[#374151] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-lock-line text-[#9CA3AF] text-lg"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all duration-300 hover:border-[#3B82F6] text-[#1F2937] placeholder-[#9CA3AF]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6B7280] hover:text-[#374151] active:text-[#1F2937] transition-colors duration-200 focus:outline-none cursor-pointer z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  <i className={`text-xl ${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'}`}></i>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm" data-aos="fade-up">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div data-aos="fade-up" data-aos-delay="300">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="350">
            <p className="text-xs text-[#6B7280]">
              © 2026 Refex Group. All rights reserved.
            </p>
            <a 
              href="#" 
              className="text-xs text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300 inline-block mt-1"
            >
              Secure Admin Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
