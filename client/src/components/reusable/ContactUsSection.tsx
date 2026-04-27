import { useState } from 'react';
import { useReusableContact } from '../../hooks';
import { getImageUrl } from '../../utils/imageUrl';
import { api } from '../../utils/api';
import { DEFAULT_COUNTRY_DIAL_CODE } from '../../utils/phoneCountryCodes';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useCooldownTimer } from '../../hooks/enquiry/useCooldownTimer';
import { useEmailValidation } from '../../hooks/enquiry/useEmailValidation';
import { usePhoneValidation } from '../../hooks/enquiry/usePhoneValidation';
import { checkEnquiry, createEnquiry, HttpError } from '../../hooks/enquiry/enquiryApi';

const ContactUsSection = () => {
  const { content, loading } = useReusableContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mobileLocal: '',
    message: ''
  });
  const [countryDialCode, setCountryDialCode] = useState(DEFAULT_COUNTRY_DIAL_CODE);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'email' | 'message' | 'mobile', string>>>({});
  const [touched, setTouched] = useState<Partial<Record<'name' | 'email' | 'phone' | 'message', boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const { isCoolingDown, secondsLeft, startCooldown } = useCooldownTimer(10);

  const emailValidation = useEmailValidation(formData.email, true);
  const phoneValidation = usePhoneValidation(formData.phone, true);
  const messageError =
    !formData.message.trim()
      ? 'Message is required'
      : formData.message.trim().length < 50
        ? 'Message must be at least 50 characters'
        : null;

  const validateAndSet = (field: keyof typeof touched) => {
    if (field === 'name') {
      const v = formData.name.trim();
      setFieldErrors((prev) => ({ ...prev, name: !v ? 'Name is required' : v.length < 2 ? 'Name must be at least 2 characters' : undefined }));
    }
    if (field === 'email') setFieldErrors((prev) => ({ ...prev, email: emailValidation.validate() as any }));
    if (field === 'phone') setFieldErrors((prev) => ({ ...prev, mobile: phoneValidation.validate() || undefined }));
    if (field === 'message') setFieldErrors((prev) => ({ ...prev, message: messageError || undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = value;
    setFormData({
      ...formData,
      [name]: next
    });
    const key = (name === 'phone' ? 'phone' : name) as keyof typeof touched;
    setTouched((prev) => ({ ...prev, [key]: true }));
    if (touched[key]) validateAndSet(key);
  };

  const handleNameBlur = () => {
    const t = formData.name.trim();
    if (t.length > 0 && t.length < 2) {
      setFieldErrors((prev) => ({ ...prev, name: 'Name must be at least 2 characters' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isCoolingDown) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setApiError(null);
    setFieldErrors({});

    const nextErrors: typeof fieldErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) nextErrors.name = 'Name must be at least 2 characters';
    const emailErr = emailValidation.validate();
    if (emailErr) nextErrors.email = emailErr as any;
    const phoneErr = phoneValidation.validate();
    if (phoneErr) nextErrors.mobile = phoneErr;
    if (messageError) nextErrors.message = messageError;
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setTouched({ name: true, email: true, phone: true, message: true });
      setIsSubmitting(false);
      return;
    }

    try {
      // Duplicate check (skip if endpoint not present)
      try {
        const dup = await checkEnquiry({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        });
        if (dup?.exists) {
          setFieldErrors((prev) => ({ ...prev, mobile: 'This phone number is already registered' }));
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        if (!(err instanceof HttpError && err.status === 404)) throw err;
      }

      // Preferred API
      try {
        await createEnquiry({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          source: 'adonis-reusable-contact',
        });
      } catch (err) {
        if (!(err instanceof HttpError && err.status === 404)) throw err;
      }

      const response = await api.post('/contact-submissions', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        countryDialCode,
        mobileLocal: formData.mobileLocal.replace(/\D/g, ''),
        mobile: formData.phone.trim(),
        source: 'reusable-contact-section'
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', mobileLocal: '', message: '' });
        setCountryDialCode(DEFAULT_COUNTRY_DIAL_CODE);
        startCooldown();
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
                    onBlur={() => validateAndSet('email')}
                    required
                    autoComplete="email"
                    className={`w-full pl-12 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all duration-300 placeholder-gray-400 ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Email Id"
                  />
                </div>
                {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              <div data-aos="fade-up" data-aos-delay="300" className="relative z-[500]">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile <span className="text-red-500">*</span>
                </span>
                <div className="relative z-[200]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <i className="ri-phone-line text-gray-400 text-xl"></i>
                  </div>
                  <div className={`w-full pl-10 pr-2 py-2.5 border rounded-md bg-white focus-within:ring-2 focus-within:ring-[#0066CC] focus-within:border-transparent transition-all duration-300 text-sm ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'}`}>
                    <PhoneInput
                      country="in"
                      value={formData.phone.replace(/^\+/, '')}
                      onChange={(value) => {
                        const e164 = value ? `+${value}` : '';
                        setFormData((prev) => ({ ...prev, phone: e164 }));
                        if (!e164) {
                          setCountryDialCode(DEFAULT_COUNTRY_DIAL_CODE);
                          setFormData((prev) => ({ ...prev, mobileLocal: '' }));
                          return;
                        }
                        const parsed = parsePhoneNumberFromString(e164);
                        if (parsed) {
                          setCountryDialCode(`+${parsed.countryCallingCode}`);
                          setFormData((prev) => ({ ...prev, mobileLocal: String(parsed.nationalNumber || '') }));
                        }
                      }}
                      inputProps={{ name: 'phone', required: true, autoComplete: 'tel', onBlur: () => validateAndSet('phone') }}
                      containerStyle={{ position: 'relative', zIndex: 200 }}
                      dropdownStyle={{ zIndex: 9999 }}
                      containerClass="w-full"
                      inputClass="!w-full !border-0 !shadow-none focus:!outline-none !bg-transparent !pl-12"
                      buttonClass="!bg-transparent !border-0"
                      dropdownClass="!text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                {fieldErrors.mobile && <p className="text-sm text-red-600 mt-1">{fieldErrors.mobile}</p>}
              </div>

              <div data-aos="fade-up" data-aos-delay="400" className="relative z-[0]">
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
                    onBlur={() => validateAndSet('message')}
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
                  disabled={isSubmitting || isCoolingDown}
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

