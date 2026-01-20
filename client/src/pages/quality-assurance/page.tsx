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

  // Filter out ISO and limit to 4 certifications for the numbered list
  const filteredCertifications = certifications
    .filter(cert => {
      const name = (cert.name || '').toUpperCase();
      const abbreviation = (cert.abbreviation || '').toUpperCase();
      return !name.includes('ISO') && !abbreviation.includes('ISO');
    })
    .slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DC244]"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          {content?.heroTitle && (
            <h1 className="text-4xl md:text-5xl font-medium text-[#7DC244] text-left" data-aos="fade-down">
              {content.heroTitle}
            </h1>
          )}
          {content?.heroSubtitle && (
            <p className="text-xl text-white mt-4 text-left" data-aos="fade-up" data-aos-delay="100">{content.heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative -mt-24 z-20 pb-0 px-0">
        <div className="w-full max-w-[1920px] mx-auto">
          <div
            className="bg-white rounded-t-[3rem] md:rounded-t-[4rem] rounded-b-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-16 relative overflow-hidden min-h-[500px]"
            style={content?.backgroundImage ? {
              backgroundImage: `url(${getImageUrl(content.backgroundImage)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            } : {}}
          >
            {/* Background Overlay */}
            {content?.backgroundImage && (
              <div className="absolute inset-0 bg-white/20 z-0"></div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

              {/* Intro Text */}
              {content?.introText && (
                <div className="max-w-4xl mx-auto mb-20">
                  <div
                    className="text-center text-gray-700 text-lg md:text-xl leading-relaxed font-medium"
                    data-aos="fade-up"
                    dangerouslySetInnerHTML={{ __html: content.introText }}
                  />
                </div>
              )}

              {/* Certification Logos */}
              {certifications.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-24">
                  {certifications.map((cert, idx) => (
                    <div key={cert.id} className="group flex flex-col items-center gap-4" data-aos="fade-up" data-aos-delay={idx * 100}>
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#F3F4F6] flex items-center justify-center p-6 transition-all duration-300 transform group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg border border-transparent group-hover:border-gray-100">
                        {cert.logo ? (
                          <img
                            alt={cert.logo.altText || cert.name}
                            className="w-full h-full object-contain transition-all duration-300"
                            src={getImageUrl(cert.logo)}
                          />
                        ) : (
                          <span className="text-gray-400 text-sm font-bold text-center uppercase tracking-wider">{cert.abbreviation || cert.name}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Split Section: Certifications List & Image */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16">

                {/* Left Column: Certifications List */}
                <div data-aos="fade-right">
                  <h2 className="text-3xl md:text-4xl font-medium text-[#7DC244] mb-12 leading-tight">
                    {content?.mainHeading || 'All ADONIS products are certified to meet national and international quality standards.'}
                  </h2>

                  <div className="space-y-6">
                    {filteredCertifications.length > 0 ? (
                      filteredCertifications.map((cert, idx) => (
                        <div key={cert.id} className="group" data-aos="fade-up" data-aos-delay={idx * 100}>
                          <div className="flex items-center gap-6">
                            <span className="flex-shrink-0 flex items-center justify-center w-14 h-10 bg-[#FFF0E6] text-[#FF6B35] font-bold text-lg rounded-sm">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <div>
                              <h3 className="text-lg md:text-xl text-gray-800">
                                <span className="font-semibold">{cert.abbreviation}</span> <span className="font-normal">({cert.name})</span>
                              </h3>
                            </div>
                          </div>
                          {/* Custom Gradient Underline */}
                          <div className="h-[3px] w-full bg-gradient-to-r from-[#7DC244] to-[#FF6B35] mt-4 mb-6"></div>
                        </div>
                      ))
                    ) : (
                      !certificationsLoading && (
                        <p className="text-gray-500 italic py-4">Certification details referencing national standards will appear here.</p>
                      )
                    )}
                  </div>
                </div>

                {/* Right Column: Main Image */}
                <div className="relative pl-4" data-aos="fade-left">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    {/* Green glow effect behind image */}
                    <div className="absolute inset-0 bg-[#7DC244]/10 z-0"></div>
                    <img
                      alt={content?.mainImage?.altText || 'Quality Assurance Lab'}
                      className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105 relative z-10"
                      src={mainImageUrl}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Content / Manufacturing Text */}
              {content?.mainContent && (
                <div className="max-w-5xl mx-auto mt-12">
                  <div
                    className="text-center text-gray-500 text-sm md:text-base leading-relaxed"
                    data-aos="fade-up"
                    dangerouslySetInnerHTML={{ __html: content.mainContent }}
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactUsSection />
      <Footer />
    </div>
  );
}
