import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProductionFacility } from '../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';

export default function ProductionFacilityPage() {
  const { content, features, loading, featuresLoading } = useProductionFacility();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : getDefaultImageUrl('2024/10/Frame-9-1.jpg');
  const flexibilityImageUrl = content?.flexibilityImage ? getImageUrl(content.flexibilityImage) : getDefaultImageUrl('2024/10/Frame-32-5-1.jpg');
  const qualityImageUrl = content?.qualityImage ? getImageUrl(content.qualityImage) : getDefaultImageUrl('2024/10/Frame-32-6-1.jpg');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7CB342]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
      </div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            alt={content?.heroImage?.altText || 'Production Facility'} 
            className="w-full h-full object-cover object-center" 
            src={heroImageUrl}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" data-aos="fade-down">
            {content?.heroTitle || 'Production Facility'}
          </h1>
          {content?.heroSubtitle && (
            <p className="text-xl md:text-2xl font-light" data-aos="fade-up" data-aos-delay="100">{content.heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {content?.introText && (
            <div className="mb-16 text-center" data-aos="fade-up">
              <div className="text-lg text-gray-700 max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.introText }} />
            </div>
          )}
          {features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={feature.id} className="text-center" data-aos="zoom-in" data-aos-delay={idx * 100}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rotate-12">
                      <i className="ri-settings-3-line text-5xl text-[#FF6B35]"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-[#FF6B35]">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="text-gray-600 mt-2">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Flexibility Section */}
      {content?.flexibilityTitle && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-4xl font-bold text-[#7CB342] mb-6">{content.flexibilityTitle}</h2>
                {content.flexibilityContent && (
                  <div className="text-lg text-gray-700 mb-8" dangerouslySetInnerHTML={{ __html: content.flexibilityContent }} />
                )}
                <a 
                  className="inline-block px-8 py-3 bg-[#7CB342] text-white font-semibold rounded-md hover:bg-[#6da035] transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer" 
                  href="/contact-us"
                >
                  Know More
                </a>
              </div>
              <div data-aos="fade-left" data-aos-delay="100">
                <img 
                  alt={content.flexibilityImage?.altText || 'Flexibility in Manufacturing'} 
                  className="w-full h-auto rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl" 
                  src={flexibilityImageUrl}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quality Assurance Section */}
      {content?.qualityTitle && (
        <section className="py-20 px-4 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-down">
              <h2 className="text-4xl font-bold text-[#7CB342] mb-6">{content.qualityTitle}</h2>
              {content.qualityContent && (
                <div className="text-lg text-gray-700 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: content.qualityContent }} />
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div data-aos="fade-right">
                <img 
                  alt={content.qualityImage?.altText || 'Rigorous Quality Assurance'} 
                  className="w-full h-auto rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl" 
                  src={qualityImageUrl}
                />
              </div>
              <div data-aos="fade-left" data-aos-delay="100">
                {features.length > 3 && (
                  <>
                    <h3 className="text-2xl font-bold mb-8 text-gray-800">Process Overview:</h3>
                    <div className="space-y-6">
                      {features.slice(3).map((feature, idx) => (
                        <div 
                          key={feature.id}
                          className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                          data-aos="fade-up"
                          data-aos-delay={150 + idx * 50}
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-xl transition-all duration-500 hover:scale-125 hover:rotate-12">
                              {String(idx + 1).padStart(2, '0')}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
                            {feature.description && (
                              <p className="text-gray-700">{feature.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <ContactUsSection />
      <Footer />
    </div>
  );
}
