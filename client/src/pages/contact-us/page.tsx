import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContactUs } from '../../hooks';
import { api } from '../../utils/api';

export default function ContactUsPage() {
  const navigate = useNavigate();
  const { content, loading } = useContactUs();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await api.post('/contact-submissions', {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message || '',
        source: 'contact-us'
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', mobile: '', message: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#E8F5E9] to-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#7DC244' }} data-aos="fade-down">
            {content?.heroTitle || 'Contact Us'}
          </h1>
          {(content?.heroSubtitle || content?.introText) && (
            <p className="text-gray-600 text-lg max-w-2xl" data-aos="fade-up" data-aos-delay="100">
              {content.heroSubtitle || content.introText}
            </p>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl" data-aos="zoom-in">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Company Info */}
            <div className="bg-[#E8F5E9] p-8 md:p-12">
              <h5 className="text-xl font-bold text-gray-800 mb-4" data-aos="fade-right" data-aos-delay="100">
                ADONIS MEDICAL SYSTEMS PVT LTD
              </h5>
              <p className="text-gray-700 mb-6" data-aos="fade-right" data-aos-delay="150">
                E-70, PHASE- VIII, INDUSTRIAL AREA,<br />
                MOHALI, 160071.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2" data-aos="fade-right" data-aos-delay="200">
                  <i className="ri-phone-fill text-2xl transition-all duration-500 hover:scale-125 hover:rotate-12" style={{ color: '#7DC244' }}></i>
                  <a href="tel:+919872003273" className="text-gray-700 hover:text-[#7DC244] transition-colors">
                    9872003273
                  </a>
                </div>
                <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2" data-aos="fade-right" data-aos-delay="250">
                  <i className="ri-mail-fill text-2xl transition-all duration-500 hover:scale-125 hover:rotate-12" style={{ color: '#7DC244' }}></i>
                  <a href="mailto:support@adonismedical.com" className="text-gray-700 hover:text-[#7DC244] transition-colors break-all">
                    support@adonismedical.com
                  </a>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-lg overflow-hidden shadow-md h-64 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]" data-aos="fade-right" data-aos-delay="300">
                <iframe
                  src="https://maps.google.com/maps?q=ADONIS%20MEDICAL%20SYSTEMS%20PVT%20LTD%20E-70%2C%20PHASE-%20VIII%2C%20INDUSTRIAL%20AREA%2C%20MOHALI.%20160071&t=m&z=10&output=embed&iwloc=near"
                  title="ADONIS MEDICAL SYSTEMS PVT LTD Location"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6" data-readdy-form id="contact-form">
                <div data-aos="fade-left" data-aos-delay="100">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 hover:scale-125"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244]"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div data-aos="fade-left" data-aos-delay="150">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Id
                  </label>
                  <div className="relative">
                    <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 hover:scale-125"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div data-aos="fade-left" data-aos-delay="200">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile
                  </label>
                  <div className="relative">
                    <i className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 hover:scale-125"></i>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244]"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div data-aos="fade-left" data-aos-delay="250">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] resize-none"
                    placeholder="Your message (max 500 characters)"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50 transition-all duration-300 hover:border-[#7DC244]" data-aos="fade-left" data-aos-delay="300">
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2874B6] hover:bg-[#1e5a8f] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  data-aos="fade-left"
                  data-aos-delay="350"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
