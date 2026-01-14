import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useQualityAssurance } from '../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';

export default function QualityAssurancePage() {
  const { content, certifications, loading, certificationsLoading } = useQualityAssurance();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : getDefaultImageUrl('2024/10/Frame-9-1-1.jpg');
  const mainImageUrl = content?.mainImage ? getImageUrl(content.mainImage) : getDefaultImageUrl('2024/10/Frame-32-3-1-1.jpg');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ED957]"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-[#7ED957]" data-aos="fade-down">
            {content?.heroTitle || 'Quality Assurance & Regulatory'}
          </h1>
          {content?.heroSubtitle && (
            <p className="text-xl text-white mt-4" data-aos="fade-up" data-aos-delay="100">{content.heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-[#F5F5DC]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {content?.introText && (
              <div className="text-center text-gray-800 text-lg leading-relaxed mb-12" data-aos="fade-up" dangerouslySetInnerHTML={{ __html: content.introText }} />
            )}
            {certifications.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {certifications.map((cert, idx) => (
                  <div key={cert.id} className="w-32 h-32 flex items-center justify-center hover-lift cursor-pointer" data-aos="zoom-in" data-aos-delay={idx * 100}>
                    {cert.logo ? (
                      <img 
                        alt={cert.logo.altText || cert.name} 
                        className="max-w-full max-h-full object-contain" 
                        src={getImageUrl(cert.logo)}
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-sm text-center px-2">{cert.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-[#7ED957] mb-8 leading-tight">
                {content?.introText ? 'Our Certifications' : 'All ADONIS products are certified to meet national and international quality standards.'}
              </h2>
              {certifications.length > 0 ? (
                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div key={cert.id} className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-[#7ED957]/10 to-transparent border-l-4 border-[#FF6B35] hover:shadow-md transition-all duration-300 cursor-pointer group" data-aos="fade-right" data-aos-delay={idx * 100}>
                      <span className="text-2xl font-bold text-[#FF6B35] min-w-[40px] group-hover:scale-110 transition-transform duration-300">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#7ED957] transition-colors duration-300">
                          {cert.name}
                        </h3>
                        {cert.description && (
                          <p className="text-gray-600 mt-1">{cert.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !certificationsLoading && (
                  <p className="text-gray-500">No certifications available at this time.</p>
                )
              )}
            </div>
            <div className="flex items-center justify-center" data-aos="fade-left">
              <img 
                alt={content?.mainImage?.altText || 'Quality Assurance Professional'} 
                className="rounded-lg shadow-lg w-full max-w-md hover:shadow-2xl hover:scale-105 transition-all duration-300" 
                src={mainImageUrl}
              />
            </div>
          </div>
          {content?.introText && (
            <div className="mt-12 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              <p className="text-center text-gray-700 text-lg leading-relaxed">
                Each equipment manufactured at ADONIS is carefully designed and tested in our own Quality Lab to ensure the utmost accuracy and reliability. Much of the equipment incorporates ADONIS's own indigenous development. The Precision and Image Quality are constantly being improved and incorporated into the new system.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <ContactUsSection />
      <Footer />
    </div>
  );
}
