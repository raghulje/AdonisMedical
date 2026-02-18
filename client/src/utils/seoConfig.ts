import { SEOProps } from '../components/seo/SEO';

// Base company information
export const COMPANY_INFO = {
  name: 'Adonis Medical Systems',
  legalName: 'ADONIS MEDICAL SYSTEMS PVT LTD',
  url: 'https://www.adonismedical.com',
  logo: 'https://www.adonismedical.com/wp-content/uploads/2025/11/cropped-adoinis-favicon-270x270.jpg',
  address: {
    street: 'E-70, PHASE- VIII, INDUSTRIAL AREA',
    city: 'MOHALI',
    postalCode: '160071',
    country: 'India',
  },
  contact: {
    phone: '+919872003273',
    email: 'support@adonismedical.com',
  },
  description: 'Adonis Medical Systems - Excellence In Technology, Dedication in Service. Leader in medical imaging with 30+ years of experience in X-ray solutions, digital radiography, C-arm systems, and healthcare technology.',
};

// Generate Organization structured data
export const getOrganizationStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_INFO.legalName,
  url: COMPANY_INFO.url,
  logo: COMPANY_INFO.logo,
  description: COMPANY_INFO.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    postalCode: COMPANY_INFO.address.postalCode,
    addressCountry: COMPANY_INFO.address.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: COMPANY_INFO.contact.phone,
    contactType: 'Customer Service',
    email: COMPANY_INFO.contact.email,
    areaServed: 'Worldwide',
    availableLanguage: ['English'],
  },
  sameAs: [
    // Add social media links if available
  ],
});

// Generate Product structured data
export const getProductStructuredData = (productName: string, description: string, image?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: productName,
  description: description,
  image: image || COMPANY_INFO.logo,
  brand: {
    '@type': 'Brand',
    name: COMPANY_INFO.name,
  },
  manufacturer: {
    '@type': 'Organization',
    name: COMPANY_INFO.legalName,
  },
  category: 'Medical Equipment',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'INR',
  },
});

// Generate WebSite structured data
export const getWebSiteStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: COMPANY_INFO.name,
  url: COMPANY_INFO.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${COMPANY_INFO.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

// SEO configurations for each page
export const seoConfig: Record<string, SEOProps> = {
  '/': {
    title: 'Home - Excellence In Technology, Dedication in Service',
    description: 'Adonis Medical Systems - Leading manufacturer of medical imaging equipment including X-ray systems, digital radiography, C-arm systems, and healthcare technology solutions. 30+ years of excellence.',
    keywords: 'medical imaging, x-ray systems, digital radiography, c-arm, medical equipment, healthcare technology, Adonis Medical Systems, medical imaging solutions',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        getOrganizationStructuredData(),
        getWebSiteStructuredData(),
      ],
    },
  },
  '/about': {
    title: 'About Us - 30+ Years of Excellence in Medical Imaging',
    description: 'Learn about Adonis Medical Systems - a leading manufacturer of medical imaging equipment with over 30 years of experience. Discover our commitment to quality, innovation, and global healthcare solutions.',
    keywords: 'about Adonis Medical Systems, medical imaging company, healthcare technology manufacturer, medical equipment company India, X-ray systems manufacturer',
    type: 'website',
  },
  '/our-products': {
    title: 'Our Products - Medical Imaging Equipment & Solutions',
    description: 'Explore Adonis Medical Systems comprehensive range of medical imaging products including HF Mobile X-ray systems, Digital Radiography, C-arm systems, and more advanced healthcare solutions.',
    keywords: 'medical imaging products, X-ray equipment, digital radiography systems, C-arm systems, HF mobile X-ray, medical imaging solutions, healthcare equipment',
    type: 'website',
  },
  '/products/hf-mobile': {
    title: 'HF Mobile X-Ray System - Portable Medical Imaging Solution',
    description: 'Discover Adonis HF Mobile X-ray system - a versatile, portable medical imaging solution designed for hospitals and clinics. High-frequency technology with exceptional image quality and mobility.',
    keywords: 'HF mobile X-ray, portable X-ray system, mobile X-ray machine, high frequency X-ray, medical imaging equipment, portable radiography',
    type: 'product',
  },
  '/products/digital-radiography': {
    title: 'Digital Radiography Systems - Advanced Medical Imaging Technology',
    description: 'Advanced digital radiography systems by Adonis Medical Systems. High-resolution imaging, fast workflow, and cutting-edge technology for modern healthcare facilities.',
    keywords: 'digital radiography, DR systems, digital X-ray, medical imaging technology, radiography equipment, digital imaging systems',
    type: 'product',
  },
  '/products/dream-series-ceiling-suspended': {
    title: 'Dream Series Ceiling Suspended X-Ray System',
    description: 'Dream Series ceiling suspended X-ray system by Adonis - advanced overhead X-ray solution with precision positioning, high image quality, and ergonomic design for modern radiology departments.',
    keywords: 'ceiling suspended X-ray, overhead X-ray system, ceiling mounted X-ray, radiology equipment, medical imaging systems',
    type: 'product',
  },
  '/products/line-frequency-x-ray-systems': {
    title: 'Line Frequency X-Ray Systems - Reliable Medical Imaging',
    description: 'Line frequency X-ray systems by Adonis Medical Systems. Durable, reliable, and cost-effective medical imaging solutions for hospitals and diagnostic centers.',
    keywords: 'line frequency X-ray, X-ray systems, medical imaging equipment, diagnostic X-ray, radiology systems',
    type: 'product',
  },
  '/products/1k1k-high-end-hf-c-arm': {
    title: '1K1K High-End HF C-Arm System - Advanced Surgical Imaging',
    description: '1K1K high-end HF C-arm system - premium surgical imaging solution with exceptional image quality, advanced features, and precision for complex surgical procedures.',
    keywords: 'C-arm system, surgical imaging, HF C-arm, fluoroscopy system, surgical X-ray, medical imaging equipment',
    type: 'product',
  },
  '/products/fpd-c-arm': {
    title: 'FPD C-Arm System - Flat Panel Detector C-Arm',
    description: 'FPD C-arm system with flat panel detector technology. Advanced fluoroscopy solution for surgical and interventional procedures with superior image quality.',
    keywords: 'FPD C-arm, flat panel detector C-arm, fluoroscopy system, surgical imaging, C-arm X-ray',
    type: 'product',
  },
  '/products/hf-fixed': {
    title: 'HF Fixed X-Ray System - Stationary Medical Imaging',
    description: 'HF fixed X-ray system by Adonis - high-frequency stationary X-ray solution for radiology departments. Reliable, efficient, and designed for high-volume imaging.',
    keywords: 'HF fixed X-ray, stationary X-ray system, fixed radiography, medical imaging equipment, radiology X-ray',
    type: 'product',
  },
  '/specialties': {
    title: 'Our Specialties - Medical Imaging Solutions by Specialty',
    description: 'Adonis Medical Systems provides specialized medical imaging solutions for Radiology, Urology, Neurology, Orthopedics, Gastroenterology, and more healthcare specialties.',
    keywords: 'medical specialties, radiology equipment, urology imaging, neurology imaging, orthopedic imaging, gastroenterology equipment',
    type: 'website',
  },
  '/careers': {
    title: 'Careers - Join Adonis Medical Systems',
    description: 'Join Adonis Medical Systems and be part of a leading medical imaging technology company. Explore career opportunities in healthcare technology, engineering, and medical equipment manufacturing.',
    keywords: 'careers Adonis Medical, medical equipment jobs, healthcare technology careers, medical imaging jobs, engineering jobs healthcare',
    type: 'website',
  },
  '/contact-us': {
    title: 'Contact Us - Get in Touch with Adonis Medical Systems',
    description: 'Contact Adonis Medical Systems for inquiries about our medical imaging products, technical support, sales, or partnerships. Located in Mohali, India. Phone: +919872003273, Email: support@adonismedical.com',
    keywords: 'contact Adonis Medical, medical equipment contact, X-ray system inquiry, healthcare technology support, medical imaging sales',
    type: 'website',
  },
  '/clients': {
    title: 'Our Clients - Trusted Healthcare Partners',
    description: 'Adonis Medical Systems serves healthcare facilities worldwide. Discover our trusted client partnerships and the hospitals, clinics, and medical centers using our medical imaging solutions.',
    keywords: 'Adonis Medical clients, healthcare partners, medical imaging customers, hospital clients, medical equipment users',
    type: 'website',
  },
  '/awards': {
    title: 'Awards & Recognition - Adonis Medical Systems',
    description: 'Recognition and awards received by Adonis Medical Systems for excellence in medical imaging technology, innovation, and healthcare solutions.',
    keywords: 'Adonis Medical awards, medical equipment awards, healthcare technology recognition, medical imaging excellence',
    type: 'website',
  },
  '/investor-relations': {
    title: 'Investor Relations - Adonis Medical Systems',
    description: 'Investor relations information for Adonis Medical Systems. Financial reports, company updates, and investor resources for stakeholders.',
    keywords: 'Adonis Medical investor relations, medical equipment company investors, healthcare technology investment',
    type: 'website',
  },
  '/management': {
    title: 'Management Team - Leadership at Adonis Medical Systems',
    description: 'Meet the leadership team at Adonis Medical Systems - experienced professionals driving innovation in medical imaging technology and healthcare solutions.',
    keywords: 'Adonis Medical management, medical equipment leadership, healthcare technology executives',
    type: 'website',
  },
  '/our-presence': {
    title: 'Our Global Presence - Adonis Medical Systems Worldwide',
    description: 'Adonis Medical Systems global presence and reach. Serving healthcare facilities worldwide with medical imaging solutions and support.',
    keywords: 'Adonis Medical global presence, international medical equipment, worldwide healthcare solutions',
    type: 'website',
  },
  '/production-facility': {
    title: 'Production Facility - Manufacturing Excellence',
    description: 'State-of-the-art production facility of Adonis Medical Systems. Advanced manufacturing capabilities for medical imaging equipment with quality assurance and precision engineering.',
    keywords: 'medical equipment manufacturing, X-ray system production, medical imaging facility, healthcare technology manufacturing',
    type: 'website',
  },
  '/quality-assurance': {
    title: 'Quality Assurance - Excellence in Medical Imaging',
    description: 'Quality assurance and certification standards at Adonis Medical Systems. ISO certified manufacturing, rigorous testing, and commitment to excellence in medical imaging equipment.',
    keywords: 'medical equipment quality, ISO certified medical devices, quality assurance healthcare, medical imaging standards',
    type: 'website',
  },
  '/faqs': {
    title: 'Frequently Asked Questions - Adonis Medical Systems',
    description: 'Frequently asked questions about Adonis Medical Systems products, services, technical specifications, support, and medical imaging solutions.',
    keywords: 'Adonis Medical FAQ, medical equipment questions, X-ray system FAQ, healthcare technology FAQ',
    type: 'website',
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions - Adonis Medical Systems',
    description: 'Terms and conditions for using Adonis Medical Systems website and services. Legal information and user agreements.',
    keywords: 'terms and conditions, legal terms, user agreement',
    type: 'website',
    noindex: true, // Legal pages typically noindex
  },
  '/privacy-policy': {
    title: 'Privacy Policy - Adonis Medical Systems',
    description: 'Privacy policy of Adonis Medical Systems. Information about how we collect, use, and protect your personal data.',
    keywords: 'privacy policy, data protection, privacy statement',
    type: 'website',
    noindex: true, // Legal pages typically noindex
  },
};

// Helper function to get SEO config for a path
export const getSEOConfig = (path: string): SEOProps => {
  return seoConfig[path] || {
    title: 'Adonis Medical Systems - Excellence In Technology, Dedication in Service',
    description: COMPANY_INFO.description,
    keywords: 'medical imaging, x-ray systems, digital radiography, c-arm, medical equipment, healthcare technology',
  };
};

