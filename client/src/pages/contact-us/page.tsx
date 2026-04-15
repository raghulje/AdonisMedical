import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContactUs, useReusableContact } from '../../hooks';
import { api } from '../../utils/api';
import SEO from '../../components/seo/SEO';
import { getSEOConfig } from '../../utils/seoConfig';
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

export default function ContactUsPage() {
  const { content, loading } = useContactUs();
  const { content: contactInfo } = useReusableContact();
  const seoConfig = getSEOConfig('/contact-us');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileLocal: '',
    message: ''
  });
  const [countryDialCode, setCountryDialCode] = useState(DEFAULT_COUNTRY_DIAL_CODE);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'email' | 'message' | 'mobile', string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);

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
    if (!captchaChecked) {
      setApiError('Please confirm you are not a robot.');
      setSubmitStatus('error');
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

    // Track form submission
    const { trackFormSubmit } = await import('../../utils/analytics');
    trackFormSubmit('Contact Us Form', 'contact', {
      source: 'contact-us',
    });

    const fullMobile = buildInternationalMobile(countryDialCode, formData.mobileLocal);

    try {
      const response = await api.post('/contact-submissions', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        countryDialCode,
        mobileLocal: formData.mobileLocal.replace(/\D/g, ''),
        mobile: fullMobile,
        source: 'contact-us'
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

  return (
    <>
      <SEO {...seoConfig} />
      <div className="pt-20">
        <Header />
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#E8F5E9] to-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-5xl font-medium mb-4" style={{ color: '#7DC244' }} data-aos="fade-down">
              {content?.heroTitle || 'Contact Us'}
            </h1>
            {(content?.heroSubtitle || content?.introText) && (() => {
              const subtitle = content.heroSubtitle || content.introText || '';
              // Preserve CMS newlines; if none, split after "?" for the two-sentence layout
              const formattedSubtitle = subtitle.includes('\n') ? subtitle : subtitle.replace(/^(.+\?)\s+/, '$1\n');
              return (
                <p className="text-gray-600 text-lg max-w-2xl mx-auto whitespace-pre-line" data-aos="fade-up" data-aos-delay="100">
                  {formattedSubtitle}
                </p>
              );
            })()}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl" data-aos="zoom-in">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Company Info - from Reusable Contact CMS */}
              <div className="bg-[#E8F5E9] p-8 md:p-12">
                <h5 className="text-xl font-bold text-gray-800 mb-4" data-aos="fade-right" data-aos-delay="100">
                  {contactInfo?.companyName || 'ADONIS MEDICAL SYSTEMS PVT LTD'}
                </h5>
                <p
                  className="text-gray-700 mb-6"
                  data-aos="fade-right"
                  data-aos-delay="150"
                  dangerouslySetInnerHTML={{ __html: (contactInfo?.address || 'E-70, PHASE- VIII, INDUSTRIAL AREA,\nMOHALI, 160071.').replace(/\n/g, '<br />') }}
                />

                <div className="space-y-4 mb-8">
                  {contactInfo?.phone && (
                    <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2" data-aos="fade-right" data-aos-delay="200">
                      <i className="ri-phone-fill text-2xl transition-all duration-500 hover:scale-125 hover:rotate-12" style={{ color: '#7DC244' }}></i>
                      <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="text-gray-700 hover:text-[#7DC244] transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                  {contactInfo?.email && (
                    <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2" data-aos="fade-right" data-aos-delay="250">
                      <i className="ri-mail-fill text-2xl transition-all duration-500 hover:scale-125 hover:rotate-12" style={{ color: '#7DC244' }}></i>
                      <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-[#7DC244] transition-colors break-all">
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Google Map */}
                <div className="rounded-lg overflow-hidden shadow-md h-64 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]" data-aos="fade-right" data-aos-delay="300">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo?.address?.replace(/\n/g, ' ')?.trim() || 'ADONIS MEDICAL SYSTEMS PVT LTD E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI. 160071')}&t=m&z=10&output=embed&iwloc=near`}
                    title={contactInfo?.companyName || 'Company Location'}
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
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 hover:scale-125"></i>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleNameBlur}
                        required
                        minLength={3}
                        autoComplete="name"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your name (min. 3 characters)"
                      />
                    </div>
                    {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
                  </div>

                  <div data-aos="fade-left" data-aos-delay="150">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Id <span className="text-red-500">*</span>
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
                        autoComplete="email"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
                  </div>

                  <div data-aos="fade-left" data-aos-delay="200">
                    <span className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile <span className="text-red-500">*</span>
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                      <select
                        id="countryDialCode"
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
                        className="w-full sm:min-w-[14rem] sm:max-w-[min(100%,18rem)] shrink-0 pl-3 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none bg-white text-gray-800 text-sm"
                        aria-label="Country or region"
                      >
                        {PHONE_COUNTRY_OPTIONS.map((o) => (
                          <option key={`${o.label}-${o.dialCode}`} value={o.dialCode}>
                            {o.flag} {o.label} ({o.dialCode})
                          </option>
                        ))}
                      </select>
                      <div className="relative flex-1 min-w-0">
                        <i className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                          type="tel"
                          id="mobileLocal"
                          name="mobileLocal"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          autoComplete="tel-national"
                          maxLength={getMobileLocalMaxLength(countryDialCode)}
                          value={formData.mobileLocal}
                          onChange={handleChange}
                          required
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'}`}
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

                  <div data-aos="fade-left" data-aos-delay="250">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] resize-none ${fieldErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your message (max 500 characters)"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                    {fieldErrors.message && <p className="text-sm text-red-600 mt-1">{fieldErrors.message}</p>}
                  </div>

                  <div className="relative z-[100] flex flex-wrap items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50 pointer-events-auto">
                    <input
                      type="checkbox"
                      id="contact-page-captcha"
                      checked={captchaChecked}
                      onChange={(e) => {
                        setCaptchaChecked(e.target.checked);
                        if (e.target.checked) {
                          setApiError(null);
                          setSubmitStatus(null);
                        }
                      }}
                      className="h-5 w-5 shrink-0 cursor-pointer accent-[#7DC244] rounded border-gray-300"
                    />
                    <label htmlFor="contact-page-captcha" className="text-sm text-gray-700 cursor-pointer select-none flex-1">
                      I'm not a robot
                    </label>
                    <img
                      src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                      alt=""
                      className="h-8 sm:ml-auto pointer-events-none opacity-80"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      {apiError || 'Sorry, there was an error sending your message. Please try again.'}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !captchaChecked}
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
    </>
  );
}
