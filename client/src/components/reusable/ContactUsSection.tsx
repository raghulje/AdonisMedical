import { useState } from 'react';
import { useReusableContact } from '../../hooks';
import { getImageUrl } from '../../utils/imageUrl';
import { api } from '../../utils/api';
import {
  DEFAULT_COUNTRY_DIAL_CODE,
  getMobileLocalMaxLength,
  INDIA_DIAL_CODE,
  PHONE_COUNTRY_OPTIONS
} from '../../utils/phoneCountryCodes';
import {
  buildInternationalMobile,
  validateContactForm
} from '../../utils/contactFormValidation';

const ContactUsSection = () => {
  const { content, loading } = useReusableContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileLocal: '',
    message: ''
  });
  const [countryDialCode, setCountryDialCode] = useState(DEFAULT_COUNTRY_DIAL_CODE);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'email' | 'message' | 'mobile', string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next =
      name === 'mobileLocal'
        ? value.replace(/\D/g, '').slice(0, getMobileLocalMaxLength(countryDialCode))
        : value;
    setFormData({
      ...formData,
      [name]: next
    });
    if (name === 'name' && fieldErrors.name && next.trim().length >= 3) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleNameBlur = () => {
    const t = formData.name.trim();
    if (t.length > 0 && t.length < 3) {
      setFieldErrors((prev) => ({ ...prev, name: 'Name must be at least 3 characters' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaChecked) {
      alert('Please check the captcha checkbox to proceed');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setApiError(null);
    setFieldErrors({});

    const validation = validateContactForm({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      countryDialCode,
      mobileLocal: formData.mobileLocal
    });
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    const fullMobile = buildInternationalMobile(countryDialCode, formData.mobileLocal);

    try {
      const response = await api.post('/contact-submissions', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        countryDialCode,
        mobileLocal: formData.mobileLocal.replace(/\D/g, ''),
        mobile: fullMobile,
        source: 'reusable-contact-section'
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', mobileLocal: '', message: '' });
        setCaptchaChecked(false);
      } else {
        setSubmitStatus('error');
        setApiError('Something went wrong. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      const msg = error instanceof Error ? error.message : 'Please check your details and try again.';
      setApiError(msg);
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
              <div data-aos="fade-up" data-aos-delay="100">
                <label htmlFor="reusable-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-user-3-line text-gray-400 text-xl"></i>
                  </div>
                  <input
                    id="reusable-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleNameBlur}
                    required
                    minLength={3}
                    autoComplete="name"
                    className={`w-full pl-12 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400 ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Name (min. 3 characters)"
                  />
                </div>
                {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
              </div>

              <div data-aos="fade-up" data-aos-delay="200">
                <label htmlFor="reusable-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-mail-line text-gray-400 text-xl"></i>
                  </div>
                  <input
                    id="reusable-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className={`w-full pl-12 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400 ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Email Id"
                  />
                </div>
                {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              <div data-aos="fade-up" data-aos-delay="300">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                  <select
                    value={countryDialCode}
                    onChange={(e) => {
                      const next = e.target.value;
                      setCountryDialCode(next);
                      setFormData((prev) => ({
                        ...prev,
                        mobileLocal:
                          getMobileLocalMaxLength(next) < prev.mobileLocal.length
                            ? prev.mobileLocal.slice(0, getMobileLocalMaxLength(next))
                            : prev.mobileLocal
                      }));
                    }}
                    className="w-full sm:min-w-[14rem] sm:max-w-[min(100%,18rem)] shrink-0 pl-3 pr-2 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent bg-white text-sm text-gray-800"
                    aria-label="Country or region"
                  >
                    {PHONE_COUNTRY_OPTIONS.map((o) => (
                      <option key={`${o.label}-${o.dialCode}`} value={o.dialCode}>
                        {o.flag} {o.label} ({o.dialCode})
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1 min-w-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-phone-line text-gray-400 text-xl"></i>
                    </div>
                    <input
                      id="reusable-mobile-local"
                      type="tel"
                      name="mobileLocal"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="tel-national"
                      maxLength={getMobileLocalMaxLength(countryDialCode)}
                      value={formData.mobileLocal}
                      onChange={handleChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400 ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={
                        countryDialCode === INDIA_DIAL_CODE
                          ? '10-digit mobile number'
                          : 'Digits only (no spaces or letters)'
                      }
                    />
                  </div>
                </div>
                {fieldErrors.mobile && <p className="text-sm text-red-600 mt-1">{fieldErrors.mobile}</p>}
              </div>

              <div data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="reusable-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <i className="ri-send-plane-line text-gray-400 text-xl"></i>
                  </div>
                  <textarea
                    id="reusable-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={4}
                    className={`w-full pl-12 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400 ${fieldErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Message (max 500 characters)"
                  ></textarea>
                </div>
                <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                {fieldErrors.message && <p className="text-sm text-red-600 mt-1">{fieldErrors.message}</p>}
              </div>

              {/* Pseudo Captcha — keep outside AOS so clicks work; native checkbox + z-index */}
              <div className="relative z-[100] flex flex-wrap items-center gap-3 sm:gap-4 p-3 pr-4 border border-gray-200 rounded-lg bg-[#f9f9f9] shadow-sm pointer-events-auto">
                <input
                  type="checkbox"
                  id="reusable-captcha"
                  checked={captchaChecked}
                  onChange={(e) => {
                    setCaptchaChecked(e.target.checked);
                    if (e.target.checked) {
                      setSubmitStatus(null);
                      setApiError(null);
                    }
                  }}
                  className="h-5 w-5 shrink-0 cursor-pointer accent-[#0066CC] rounded border-gray-300"
                />
                <label
                  htmlFor="reusable-captcha"
                  className="text-sm font-medium text-gray-700 cursor-pointer select-none flex-1 min-w-0"
                >
                  I'm not a robot
                </label>
                <div className="flex flex-col items-center justify-center text-[10px] text-gray-500 leading-tight sm:ml-auto">
                  <img
                    src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                    alt=""
                    className="w-8 h-8 mb-0.5 opacity-80 pointer-events-none"
                  />
                  <span>reCAPTCHA</span>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {apiError || 'Sorry, there was an error sending your message. Please try again.'}
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

