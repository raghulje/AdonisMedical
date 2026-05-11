import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContactUs, useReusableContact } from '../../hooks';
import { api } from '../../utils/api';
import SEO from '../../components/seo/SEO';
import { getSEOConfig } from '../../utils/seoConfig';
import { DEFAULT_COUNTRY_DIAL_CODE } from '../../utils/phoneCountryCodes';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Combobox } from '@headlessui/react';
import { useCooldownTimer } from '../../hooks/enquiry/useCooldownTimer';
import { useEmailValidation } from '../../hooks/enquiry/useEmailValidation';
import { usePhoneValidation } from '../../hooks/enquiry/usePhoneValidation';
import { checkEnquiry, createEnquiry, HttpError } from '../../hooks/enquiry/enquiryApi';

const PRODUCT_OPTIONS = [
  'HF Mobile',
  'HF Fixed',
  'FPD-C-Arm',
  '1K*1K High End HF C-ARM',
  'Line Frequency X-Ray Systems',
  'Digital Radiography',
  'Dream Series-Ceiling Suspended',
] as const;

const TOP_CITY_OPTIONS = [
  'Mumbai, Maharashtra',
  'Delhi, Delhi',
  'Bengaluru, Karnataka',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Surat, Gujarat',
  'Lucknow, Uttar Pradesh',
  'Kanpur, Uttar Pradesh',
  'Nagpur, Maharashtra',
  'Indore, Madhya Pradesh',
  'Bhopal, Madhya Pradesh',
  'Patna, Bihar',
  'Ludhiana, Punjab',
  'Agra, Uttar Pradesh',
  'Visakhapatnam, Andhra Pradesh',
  'Coimbatore, Tamil Nadu',
] as const;

function normalizeCityQuery(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9, ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshteinDistance(a: string, b: string) {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  const m = a.length;
  const n = b.length;
  const dp = new Array<number>(n + 1);

  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return dp[n];
}

function isSubsequence(needle: string, haystack: string) {
  let i = 0;
  let j = 0;
  while (i < needle.length && j < haystack.length) {
    if (needle.charCodeAt(i) === haystack.charCodeAt(j)) i++;
    j++;
  }
  return i === needle.length;
}

function SubmissionSuccessOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 10000);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#06121f]/90">
      <div className="relative w-full max-w-3xl rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-[#06121f] via-[#071a2c] to-[#06121f] shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="px-8 py-10 md:px-12 md:py-12">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20" />
              <div className="absolute -inset-3 rounded-full border border-emerald-400/30 animate-spin [animation-duration:6s]" />
              <div className="relative h-20 w-20 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span className="text-white text-2xl font-bold leading-none">✓</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-6 py-5">
              <p className="text-white text-lg md:text-xl font-semibold">
                Your enquiry has been <span className="text-emerald-300">submitted successfully!</span>
              </p>
              <p className="mt-2 text-sm md:text-base text-slate-200/90 leading-relaxed">
                Thank you for reaching out to us.
                <br />
                Our <span className="text-emerald-200 font-semibold">Agentic AI</span> will call you shortly for further enquiry and details.
                During the call, you can provide more details and also ask any queries regarding our businesses and our products.
              </p>
              <p className="mt-3 text-sm text-emerald-200 font-semibold">We&apos;re here to help!</p>
            </div>

            <button
              type="button"
              onClick={onDone}
              className="mt-2 text-xs text-slate-200/70 hover:text-slate-200 underline underline-offset-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactUsPage() {
  const { content, loading } = useContactUs();
  const { content: contactInfo } = useReusableContact();
  const seoConfig = getSEOConfig('/contact-us');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    product: '',
    mobileLocal: '',
    message: ''
  });
  const [countryDialCode, setCountryDialCode] = useState(DEFAULT_COUNTRY_DIAL_CODE);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'email' | 'message' | 'mobile' | 'product', string>>>({});
  const [touched, setTouched] = useState<Partial<Record<'name' | 'email' | 'phone' | 'product' | 'message', boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const { isCoolingDown, secondsLeft, startCooldown } = useCooldownTimer(10);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [indiaCityOptions, setIndiaCityOptions] = useState<string[]>([]);
  const [isCityListLoading, setIsCityListLoading] = useState(true);
  const [cityQuery, setCityQuery] = useState('');

  const emailValidation = useEmailValidation(formData.email, true);
  const phoneValidation = usePhoneValidation(formData.phone, true);
  const productError = !String(formData.product || '').trim() ? 'Product is required' : null;
  const messageError =
    !formData.message.trim()
      ? 'Message is required'
      : formData.message.trim().length < 15
        ? 'Message must be at least 15 characters'
        : null;

  const validateAndSet = (field: keyof typeof touched) => {
    if (field === 'name') {
      const v = formData.name.trim();
      setFieldErrors((prev) => ({ ...prev, name: !v ? 'Name is required' : v.length < 2 ? 'Name must be at least 2 characters' : undefined }));
    }
    if (field === 'email') setFieldErrors((prev) => ({ ...prev, email: emailValidation.validate() as any }));
    if (field === 'phone') setFieldErrors((prev) => ({ ...prev, mobile: phoneValidation.validate() || undefined }));
    if (field === 'product') setFieldErrors((prev) => ({ ...prev, product: productError || undefined }));
    if (field === 'message') setFieldErrors((prev) => ({ ...prev, message: messageError || undefined }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadIndiaCities = async () => {
      try {
        const res = await fetch('/api/geo/india-cities');
        if (!res.ok) throw new Error(`Failed to fetch cities (${res.status})`);
        const payload = await res.json();
        const cities = Array.isArray(payload?.data) ? payload.data : [];
        if (!cancelled) setIndiaCityOptions(cities);
      } catch (error) {
        console.warn('Failed to load India city list from geo endpoint', error);
      } finally {
        if (!cancelled) setIsCityListLoading(false);
      }
    };

    loadIndiaCities();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCoolingDown) return;
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
    if (productError) nextErrors.product = productError;
    if (messageError) nextErrors.message = messageError;
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setTouched({ name: true, email: true, phone: true, product: true, message: true });
      setIsSubmitting(false);
      return;
    }

    // Track form submission
    const { trackFormSubmit } = await import('../../utils/analytics');
    trackFormSubmit('Contact Us Form', 'contact', {
      source: 'contact-us',
    });

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
      if (!(err instanceof HttpError && err.status === 404)) {
        setIsSubmitting(false);
        throw err;
      }
    }

    // Preferred API (non-blocking if missing)
    try {
      await createEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city,
        product: formData.product,
        message: formData.message.trim(),
        source: 'adonis-contact-us',
      });
    } catch (err) {
      if (!(err instanceof HttpError && err.status === 404)) {
        setIsSubmitting(false);
        throw err;
      }
    }

    try {
      const response = await api.post('/contact-submissions', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        product: formData.product,
        countryDialCode,
        mobileLocal: formData.mobileLocal.replace(/\D/g, ''),
        mobile: formData.phone.trim(),
        city: formData.city,
        source: 'contact-us'
      });

      if (response.success) {
        setSubmitStatus('success');
        setShowSuccessOverlay(true);
        setFormData({ name: '', email: '', phone: '', city: '', product: '', mobileLocal: '', message: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const cityOptions = indiaCityOptions;
  const filteredCityOptions = (() => {
    const q = normalizeCityQuery(cityQuery);
    if (!q) {
      const top = TOP_CITY_OPTIONS.filter((c) => cityOptions.includes(c));
      const topSet = new Set(top);
      const rest = cityOptions.filter((c) => !topSet.has(c));
      return [...top, ...rest].slice(0, 250);
    }

    const tokens = q.split(' ').filter(Boolean);
    const maxEdits = q.length >= 7 ? 3 : 2;
    const scored: Array<{ label: string; score: number }> = [];

    for (const label of cityOptions) {
      const normLabel = normalizeCityQuery(label);
      const [cityPart = '', statePart = ''] = normLabel.split(',').map((s) => s.trim());
      let score = 0;

      if (normLabel.startsWith(q)) score += 120;
      if (cityPart.startsWith(q)) score += 160;
      if (cityPart.includes(q)) score += 90;
      if (normLabel.includes(q)) score += 70;

      for (const t of tokens) {
        if (!t) continue;
        if (cityPart.startsWith(t)) score += 45;
        else if (cityPart.includes(t)) score += 18;
        if (statePart.startsWith(t)) score += 22;
        else if (statePart.includes(t)) score += 10;
      }

      if (q.length >= 4 && isSubsequence(q.replace(/[^a-z0-9]/g, ''), cityPart.replace(/[^a-z0-9]/g, ''))) {
        score += 40;
      }

      if (q.length >= 4) {
        const dist = levenshteinDistance(q, cityPart.slice(0, Math.max(q.length + 2, 8)));
        if (dist <= maxEdits) score += (maxEdits - dist + 1) * 14;
      }

      if (score > 0) scored.push({ label, score });
    }

    scored.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));
    return scored.slice(0, 250).map((x) => x.label);
  })();

  return (
    <>
      {showSuccessOverlay && (
        <SubmissionSuccessOverlay
          onDone={() => {
            setShowSuccessOverlay(false);
            setSubmitStatus(null);
          }}
        />
      )}
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
          <div className="bg-white rounded-2xl shadow-xl overflow-visible transition-all duration-500 hover:shadow-2xl" data-aos="zoom-in">
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
                        onBlur={() => validateAndSet('email')}
                        required
                        autoComplete="email"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
                  </div>

                  <div className="relative z-[200]" data-aos="fade-left" data-aos-delay="200">
                    <span className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile <span className="text-red-500">*</span>
                    </span>
                    <div className="relative">
                      <i className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"></i>
                      <div className={`w-full pl-10 pr-2 py-1.5 border rounded-lg focus-within:ring-2 focus-within:ring-[#7DC244] focus-within:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] ${fieldErrors.mobile ? 'border-red-500' : 'border-gray-300'}`}>
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
                          inputProps={{
                            name: 'phone',
                            required: true,
                            autoComplete: 'tel',
                            onBlur: () => validateAndSet('phone')
                          }}
                          containerStyle={{ position: 'relative', zIndex: 60 }}
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

                  <div className="relative z-[300]" data-aos="fade-left" data-aos-delay="215">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Combobox
                      value={formData.city}
                      onChange={(value) => {
                        setFormData((prev) => ({ ...prev, city: value || '' }));
                        setCityQuery('');
                      }}
                    >
                      <div className="relative">
                        <Combobox.Input
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] bg-white"
                          placeholder="Type to search city..."
                          displayValue={(value: string) => value}
                          onChange={(event) => setCityQuery(event.target.value)}
                          onBlur={() => {
                            const typed = cityQuery.trim();
                            if (typed && cityOptions.includes(typed)) {
                              setFormData((prev) => ({ ...prev, city: typed }));
                            }
                            setCityQuery('');
                          }}
                        />
                        <input type="hidden" name="city" value={formData.city} required />

                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </Combobox.Button>
                        {(formData.city || cityQuery) && (
                          <button
                            type="button"
                            aria-label="Clear city"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, city: '' }));
                              setCityQuery('');
                            }}
                            className="absolute inset-y-0 right-10 flex items-center pr-1 text-gray-400 hover:text-gray-600"
                          >
                            <span className="text-2xl font-semibold leading-none">×</span>
                          </button>
                        )}

                        <Combobox.Options className="absolute z-[400] mt-2 max-h-64 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
                          {isCityListLoading ? (
                            <div className="px-4 py-2 text-gray-500">Loading cities...</div>
                          ) : filteredCityOptions.length === 0 ? (
                            <div className="px-4 py-2 text-gray-500">No cities found.</div>
                          ) : (
                            filteredCityOptions.map((label) => (
                              <Combobox.Option
                                key={label}
                                value={label}
                                className={({ active }) =>
                                  `cursor-pointer select-none px-4 py-2 ${active ? 'bg-[#7DC244] text-white' : 'text-gray-900'}`
                                }
                              >
                                {label}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </div>
                    </Combobox>
                  </div>

                  <div className="relative z-10" data-aos="fade-left" data-aos-delay="225">
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                      Product <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="ri-product-hunt-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 hover:scale-125" aria-hidden />
                      <select
                        id="product"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        onBlur={() => validateAndSet('product')}
                        required
                        className={`w-full pl-12 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] appearance-none bg-white cursor-pointer ${fieldErrors.product ? 'border-red-500' : 'border-gray-300'}`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundPosition: 'right 0.75rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.25em 1.25em',
                        }}
                      >
                        <option value="" disabled>
                          Please Select
                        </option>
                        {PRODUCT_OPTIONS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    {fieldErrors.product && <p className="text-sm text-red-600 mt-1">{fieldErrors.product}</p>}
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
                      onBlur={() => validateAndSet('message')}
                      required
                      maxLength={500}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7DC244] focus:border-transparent outline-none transition-all duration-300 hover:border-[#7DC244] resize-none ${fieldErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your message (max 500 characters)"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                    {fieldErrors.message && <p className="text-sm text-red-600 mt-1">{fieldErrors.message}</p>}
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
                    disabled={isSubmitting || isCoolingDown}
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
