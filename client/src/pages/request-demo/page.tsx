import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRequestDemo } from '../../hooks';
import { api } from '../../utils/api';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';

const RequestDemoPage = () => {
  const { content, loading } = useRequestDemo();
  const [formData, setFormData] = useState({
    name: '',
    hospitalName: '',
    email: '',
    mobile: '',
    product: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.hospitalName || !formData.email || !formData.mobile || !formData.product || !formData.date) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await api.post('/demo-requests', {
        name: formData.name,
        hospitalName: formData.hospitalName,
        email: formData.email,
        mobile: formData.mobile,
        product: formData.product,
        preferredDate: formData.date,
        message: formData.message || ''
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          hospitalName: '',
          email: '',
          mobile: '',
          product: '',
          date: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <Header />
      
      {/* Main Content Section */}
      <div 
        className="min-h-screen py-16 relative"
        style={{
          backgroundImage: content?.backgroundImage ? `url(${getImageUrl(content.backgroundImage)})` : `url(${getDefaultImageUrl('2024/09/Frame-75-1.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: content?.backgroundImage ? 'transparent' : '#F5F8F0'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Title */}
          <div className="mb-12" data-aos="fade-down">
            <h1 className="text-5xl font-bold text-[#7DC244]">{content?.heroTitle || 'Request a Demo'}</h1>
            {content?.heroSubtitle && (
              <p className="text-gray-600 text-lg mt-4 max-w-2xl">
                {content.heroSubtitle}
              </p>
            )}
          </div>

          {/* Intro Text - Full Width */}
          {content?.introText && (
            <div className="mb-12" data-aos="fade-right">
              <p className="text-base text-gray-700 leading-relaxed w-full">
                {content.introText}
              </p>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div>
              {/* Paragraphs */}
              {content?.paragraphs && content.paragraphs.length > 0 && (
                <div className="mb-12 space-y-4" data-aos="fade-right">
                  {content.paragraphs.map((paragraph, index) => (
                    <p key={paragraph.id} className="text-base text-gray-700 leading-relaxed">
                      {paragraph.content}
                    </p>
                  ))}
                </div>
              )}

              {/* Features Grid */}
              {content?.features && content.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {content.features.map((feature, index) => (
                    <div key={feature.id} className="flex flex-col items-start" data-aos="zoom-in" data-aos-delay={(index + 1) * 100}>
                      <div className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-500 hover:scale-125 hover:rotate-12">
                        {feature.iconImage ? (
                          <img 
                            src={getImageUrl(feature.iconImage)} 
                            alt={feature.iconImage.altText || feature.title}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <i className="ri-checkbox-circle-line text-4xl text-[#FF6B35]"></i>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-[#FF6B35]">{feature.title}</h2>
                      <p className="text-sm text-gray-600">
                        {feature.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-500 hover:shadow-2xl" data-aos="fade-left">
              <form onSubmit={handleSubmit} data-readdy-form className="space-y-5">
                {/* Name */}
                <div data-aos="fade-up" data-aos-delay="100">
                  <label htmlFor="name" className="flex items-center gap-2 text-gray-600 mb-2">
                    <i className="ri-user-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                    <span className="text-sm">Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={400}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent transition-all duration-300 hover:border-[#7DC244]"
                    placeholder=""
                  />
                </div>

                {/* Hospital Name */}
                <div data-aos="fade-up" data-aos-delay="150">
                  <label htmlFor="hospitalName" className="flex items-center gap-2 text-gray-600 mb-2">
                    <i className="ri-hospital-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                    <span className="text-sm">Hospital Name</span>
                  </label>
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    required
                    maxLength={400}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent transition-all duration-300 hover:border-[#7DC244]"
                    placeholder=""
                  />
                </div>

                {/* Email */}
                <div data-aos="fade-up" data-aos-delay="200">
                  <label htmlFor="email" className="flex items-center gap-2 text-gray-600 mb-2">
                    <i className="ri-mail-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                    <span className="text-sm">Email Id</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={400}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent transition-all duration-300 hover:border-[#7DC244]"
                    placeholder=""
                  />
                </div>

                {/* Mobile */}
                <div data-aos="fade-up" data-aos-delay="250">
                  <label htmlFor="mobile" className="flex items-center gap-2 text-gray-600 mb-2">
                    <i className="ri-phone-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                    <span className="text-sm">Mobile</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    maxLength={400}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent transition-all duration-300 hover:border-[#7DC244]"
                    placeholder=""
                  />
                </div>

                {/* Product and Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Select Product */}
                  <div data-aos="fade-up" data-aos-delay="300">
                    <label htmlFor="product" className="flex items-center gap-2 text-gray-600 mb-2">
                      <i className="ri-product-hunt-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                      <span className="text-sm">Select Product</span>
                    </label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent appearance-none bg-white cursor-pointer transition-all duration-300 hover:border-[#7DC244]"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")", backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                    >
                      <option value="">Select Product</option>
                      <option value="HF Mobile">HF Mobile</option>
                      <option value="HF Fixed">HF Fixed</option>
                      <option value="FPD-C-Arm">FPD-C-Arm</option>
                      <option value="Line Frequency X-Ray Systems">Line Frequency X-Ray Systems</option>
                      <option value="Digital Radiography">Digital Radiography</option>
                      <option value="Dream Series-Ceiling Suspended">Dream Series-Ceiling Suspended</option>
                      <option value="0.5K High End HF C-ARM">0.5K High End HF C-ARM</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div data-aos="fade-up" data-aos-delay="350">
                    <label htmlFor="date" className="flex items-center gap-2 text-gray-600 mb-2">
                      <i className="ri-calendar-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                      <span className="text-sm">Date</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent cursor-pointer transition-all duration-300 hover:border-[#7DC244]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div data-aos="fade-up" data-aos-delay="400">
                  <label htmlFor="message" className="flex items-center gap-2 text-gray-600 mb-2">
                    <i className="ri-message-3-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                    <span className="text-sm">Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent resize-none transition-all duration-300 hover:border-[#7DC244]"
                    placeholder=""
                  />
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50 transition-all duration-300 hover:border-[#7DC244]" data-aos="fade-up" data-aos-delay="450">
                  <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center cursor-pointer hover:border-[#7DC244] transition-all duration-300 hover:scale-110">
                    <i className="ri-check-line text-[#7DC244] text-sm hidden"></i>
                  </div>
                  <span className="text-sm text-gray-700">I'm not a robot</span>
                  <div className="ml-auto">
                    <img 
                      src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
                      alt="reCAPTCHA" 
                      className="h-8"
                    />
                  </div>
                </div>

                {/* Submit Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 text-sm">Thank you! Your demo request has been submitted successfully.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">Please fill in all required fields correctly.</p>
                  </div>
                )}

                {/* Submit Button */}
                <div data-aos="fade-up" data-aos-delay="500">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2879B6] hover:bg-[#1e5a8a] text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request a demo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RequestDemoPage;
