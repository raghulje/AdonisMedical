import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRequestDemo } from '../../hooks';
import { api } from '../../utils/api';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useCooldownTimer } from '../../hooks/enquiry/useCooldownTimer';
import { useEmailValidation } from '../../hooks/enquiry/useEmailValidation';
import { usePhoneValidation } from '../../hooks/enquiry/usePhoneValidation';
import { checkEnquiry, createEnquiry, HttpError } from '../../hooks/enquiry/enquiryApi';

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
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'email' | 'mobile' | 'message', string>>>({});
  const [touched, setTouched] = useState<Partial<Record<'name' | 'email' | 'mobile' | 'message', boolean>>>({});
  const { isCoolingDown, secondsLeft, startCooldown } = useCooldownTimer(10);

  const emailValidation = useEmailValidation(formData.email, true);
  const phoneValidation = usePhoneValidation(formData.mobile, true);
  const messageError =
    !formData.message.trim()
      ? 'Message is required'
      : formData.message.trim().length < 50
        ? 'Message must be at least 50 characters'
        : null;

  const validateAndSet = (field: keyof typeof touched) => {
    const next: Partial<Record<'name' | 'email' | 'mobile' | 'message', string>> = {};
    if (field === 'name') next.name = !formData.name.trim() ? 'Name is required' : formData.name.trim().length < 2 ? 'Name must be at least 2 characters' : undefined;
    if (field === 'email') next.email = emailValidation.validate() || undefined;
    if (field === 'mobile') next.mobile = phoneValidation.validate() || undefined;
    if (field === 'message') next.message = messageError || undefined;
    setFieldErrors((prev) => ({ ...prev, ...next }));
  };

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
    const key = name as keyof typeof touched;
    if (key in touched) {
      setTouched((prev) => ({ ...prev, [key]: true }));
      if (touched[key]) validateAndSet(key);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCoolingDown) return;

    // Validate required fields
    if (!formData.name || !formData.hospitalName || !formData.email || !formData.mobile || !formData.product || !formData.date || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    const nextErrors: typeof fieldErrors = {};
    if (formData.name.trim().length < 2) nextErrors.name = 'Name must be at least 2 characters';
    const emailErr = emailValidation.validate();
    if (emailErr) nextErrors.email = emailErr;
    const phoneErr = phoneValidation.validate();
    if (phoneErr) nextErrors.mobile = phoneErr;
    if (messageError) nextErrors.message = messageError;
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Track form submission
    const { trackFormSubmit } = await import('../../utils/analytics');
    trackFormSubmit('Request Demo Form', 'demo_request', {
      product: formData.product,
    });

    try {
      // Duplicate check (skip if endpoint not present)
      try {
        const dup = await checkEnquiry({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.mobile.trim(),
        });
        if (dup?.exists) {
          setFieldErrors((prev) => ({ ...prev, mobile: 'This phone number is already registered' }));
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        if (!(err instanceof HttpError && err.status === 404)) throw err;
      }

      // Preferred API (non-blocking if missing)
      try {
        await createEnquiry({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.mobile.trim(),
          hospitalName: formData.hospitalName,
          product: formData.product,
          preferredDate: formData.date,
          message: formData.message || '',
          source: 'adonis-request-demo',
        });
      } catch (err) {
        if (!(err instanceof HttpError && err.status === 404)) throw err;
      }

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
        startCooldown();
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Title */}
          <div className="mb-12 text-center" data-aos="fade-down">
            <h1 className="text-5xl font-medium text-[#7DC244]">{content?.heroTitle || 'Request a Demo'}</h1>
            {content?.heroSubtitle && (
              <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
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
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, name: true }));
                      validateAndSet('name');
                    }}
                    required
                    maxLength={400}
                    className={`w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder=""
                  />
                  {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
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
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, email: true }));
                      validateAndSet('email');
                    }}
                    required
                    maxLength={400}
                    className={`w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder=""
                  />
                  {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
                </div>

                {/* Mobile */}
                <div data-aos="fade-up" data-aos-delay="250" className="relative z-[500]">
                  <label htmlFor="mobile" className="flex items-center gap-2 text-gray-600 mb-2">
                    <i className="ri-phone-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                    <span className="text-sm">Mobile</span>
                  </label>
                  <div className={`w-full px-2 py-1 border rounded-md focus-within:ring-2 focus-within:ring-[#7DC244] focus-within:border-transparent transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'}`}>
                    <PhoneInput
                      country="in"
                      value={formData.mobile.replace(/^\+/, '')}
                      onChange={(value) => setFormData((prev) => ({ ...prev, mobile: value ? `+${value}` : '' }))}
                      inputProps={{
                        name: 'mobile',
                        id: 'mobile',
                        required: true,
                        autoComplete: 'tel',
                        onBlur: () => {
                          setTouched((prev) => ({ ...prev, mobile: true }));
                          validateAndSet('mobile');
                        }
                      }}
                      containerStyle={{ position: 'relative', zIndex: 200 }}
                      dropdownStyle={{ zIndex: 9999 }}
                      containerClass="w-full"
                      inputClass="!w-full !border-0 !shadow-none focus:!outline-none"
                      buttonClass="!bg-transparent !border-0"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {fieldErrors.mobile && <p className="text-xs text-red-500 mt-1">{fieldErrors.mobile}</p>}
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
                <div data-aos="fade-up" data-aos-delay="400" className="relative z-[0]">
                  <label htmlFor="message" className="flex items-center gap-2 text-gray-600 mb-2">
                    <i className="ri-message-3-line text-gray-400 text-sm transition-all duration-300 hover:scale-125"></i>
                    <span className="text-sm">Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, message: true }));
                    validateAndSet('message');
                  }}
                  required
                    rows={3}
                    maxLength={500}
                  className={`w-full px-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:border-transparent resize-none transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder=""
                  />
                {fieldErrors.message && <p className="text-xs text-red-500 mt-1">{fieldErrors.message}</p>}
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
                    disabled={isSubmitting || isCoolingDown}
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
