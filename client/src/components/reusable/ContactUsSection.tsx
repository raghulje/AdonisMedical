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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              {content.heading || 'Contact Us'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100">
                <label htmlFor="reusable-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="reusable-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="Your name"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200">
                <label htmlFor="reusable-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Id
                </label>
                <input
                  type="email"
                  id="reusable-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="your@email.com"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300">
                <label htmlFor="reusable-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile
                </label>
                <input
                  type="tel"
                  id="reusable-mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="Your mobile number"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="reusable-message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="reusable-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 hover:border-[#0066CC]"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {/* Dummy Captcha Checkbox */}
              <div data-aos="fade-up" data-aos-delay="500" className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  id="reusable-captcha"
                  checked={captchaChecked}
                  onChange={(e) => setCaptchaChecked(e.target.checked)}
                  className="w-5 h-5 border-2 border-gray-400 rounded cursor-pointer"
                />
                <label htmlFor="reusable-captcha" className="text-sm text-gray-700 cursor-pointer">
                  I'm not a robot
                </label>
                <div className="ml-auto">
                  <img 
                    src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
                    alt="reCAPTCHA" 
                    className="h-8 w-auto"
                  />
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <div data-aos="fade-up" data-aos-delay="600">
                <button
                  type="submit"
                  disabled={isSubmitting || !captchaChecked}
                  className="px-8 py-3 bg-[#0066CC] text-white font-medium rounded-md hover:bg-[#0052A3] transition-all duration-300 hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <i className="ri-phone-line text-[#0066CC] text-xl"></i>
                  <a href={`tel:${content.phone}`} className="text-gray-700 hover:text-[#0066CC] transition-colors duration-300">
                    {content.phone}
                  </a>
                </div>
              )}

              {content.email && (
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="200">
                  <i className="ri-mail-line text-[#0066CC] text-xl"></i>
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

