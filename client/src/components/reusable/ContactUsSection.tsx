import { useState } from 'react';
import { useReusableContact } from '../../hooks';
import { getImageUrl } from '../../utils/imageUrl';
import { api } from '../../utils/api';

const ContactUsSection = () => {
  const { content, loading } = useReusableContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaChecked) {
      alert('Please check the captcha checkbox to proceed');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await api.post('/contact-submissions', {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message || '',
        source: 'reusable-contact-section'
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', mobile: '', message: '' });
        setCaptchaChecked(false);
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

  if (loading) {
    return null; // Don't show anything while loading
  }

  if (!content) {
    return null; // Don't show if no content
  }

  // Get background image URL if available
  const backgroundImageUrl = content.backgroundImage ? getImageUrl(content.backgroundImage) : null;
  const sectionStyle = backgroundImageUrl
    ? {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
    : {};

  return (
    <section
      className="py-20 bg-gradient-to-b from-green-50 to-white"
      style={sectionStyle}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8">
              {content.heading || 'Contact Us'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100" className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-user-3-line text-gray-400 text-xl"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Name"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200" className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400 text-xl"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Email Id"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300" className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-phone-line text-gray-400 text-xl"></i>
                </div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Mobile"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="400" className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <i className="ri-send-plane-line text-gray-400 text-xl"></i>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Message"
                ></textarea>
              </div>

              {/* Pseudo Captcha */}
              <div data-aos="fade-up" data-aos-delay="500" className="inline-flex items-center gap-4 p-3 pr-8 border border-gray-200 rounded shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-[#f9f9f9]">
                <div className="flex items-center justify-center w-8 h-8">
                  <input
                    type="checkbox"
                    id="reusable-captcha"
                    checked={captchaChecked}
                    onChange={(e) => setCaptchaChecked(e.target.checked)}
                    className="w-6 h-6 border-2 border-gray-300 rounded-sm cursor-pointer focus:ring-0 checked:bg-[#0066CC]"
                  />
                </div>
                <label htmlFor="reusable-captcha" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                  I'm not a robot
                </label>
                <div className="flex flex-col items-center justify-center ml-4 text-[10px] text-gray-500 leading-tight">
                  <img
                    src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                    alt="reCAPTCHA"
                    className="w-8 h-8 mb-0.5 opacity-80"
                  />
                  <span>reCAPTCHA</span>
                  <div className="flex gap-1">
                    <span className="hover:underline cursor-pointer">Privacy</span>
                    <span>-</span>
                    <span className="hover:underline cursor-pointer">Terms</span>
                  </div>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <div data-aos="fade-up" data-aos-delay="600" className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !captchaChecked}
                  className="px-8 py-3 bg-[#0066CC] text-white font-medium rounded-md hover:bg-[#0052A3] transition-all duration-300 hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8" data-aos="fade-up">
            {content.companyName && (
              <div>
                <h5 className="text-xl font-bold text-gray-900 mb-4">{content.companyName}</h5>
                {content.address && (
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.address.replace(/\n/g, '<br />') }}></p>
                )}
              </div>
            )}

            <div className="space-y-4">
              {content.phone && (
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="100">
                  {content.phoneIconId && content.phoneIcon ? (
                    <img 
                      src={getImageUrl(content.phoneIcon)} 
                      alt={content.phoneIcon.altText || 'Phone icon'} 
                      className="w-6 h-6 object-contain flex-shrink-0"
                    />
                  ) : (
                    <i className="ri-phone-line text-[#0066CC] text-xl"></i>
                  )}
                  <a href={`tel:${content.phone}`} className="text-gray-700 hover:text-[#0066CC] transition-colors duration-300">
                    {content.phone}
                  </a>
                </div>
              )}

              {content.email && (
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="200">
                  {content.emailIconId && content.emailIcon ? (
                    <img 
                      src={getImageUrl(content.emailIcon)} 
                      alt={content.emailIcon.altText || 'Email icon'} 
                      className="w-6 h-6 object-contain flex-shrink-0"
                    />
                  ) : (
                    <i className="ri-mail-line text-[#0066CC] text-xl"></i>
                  )}
                  <a href={`mailto:${content.email}`} className="text-gray-700 hover:text-[#0066CC] transition-colors duration-300">
                    {content.email}
                  </a>
                </div>
              )}
            </div>

            {content.image && (
              <div data-aos="fade-up" data-aos-delay="300">
                <img
                  src={getImageUrl(content.image)}
                  alt={content.image.altText || 'Contact us'}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;

