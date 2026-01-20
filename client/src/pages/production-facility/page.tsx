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
  const introBackgroundImageUrl = content?.introBackgroundImage ? getImageUrl(content.introBackgroundImage) : null;
  const flexibilityImageUrl = content?.flexibilityImage ? getImageUrl(content.flexibilityImage) : getDefaultImageUrl('2024/10/Frame-32-5-1.jpg');
  const qualityBackgroundImageUrl = content?.qualityBackgroundImage ? getImageUrl(content.qualityBackgroundImage) : null;
  const qualityImageUrl = content?.qualityImage ? getImageUrl(content.qualityImage) : getDefaultImageUrl('2024/10/Frame-32-6-1.jpg');

  // Get first 3 features for introduction section
  const introFeatures = features.slice(0, 3);
  // Get next 3 features for quality process overview
  const qualityProcessFeatures = features.slice(3, 6);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DC244]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
      </div>
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

      {/* Introduction Section with Rounded Top Corners */}
      <section className="relative -mt-24 z-20 pb-0 px-0">
        <div className="w-full max-w-[1920px] mx-auto">
          <div
            className="bg-white rounded-t-[3rem] md:rounded-t-[4rem] rounded-b-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-16 relative overflow-hidden min-h-[500px]"
            style={introBackgroundImageUrl ? {
              backgroundImage: `url(${introBackgroundImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            } : {}}
          >
            {/* Background Overlay */}
            {introBackgroundImageUrl && (
              <div className="absolute inset-0 bg-white/20 z-0"></div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
              {/* Intro Text */}
              {content?.introText && (
                <div className="max-w-4xl mx-auto mb-16">
                  <div
                    className="text-center text-gray-700 text-lg md:text-xl leading-relaxed font-medium"
                    data-aos="fade-up"
                    dangerouslySetInnerHTML={{ __html: content.introText }}
                  />
                </div>
              )}

              {/* Feature Highlights (First 3 features) */}
              {introFeatures.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
                  {introFeatures.map((feature, idx) => (
                    <div key={feature.id} className="text-left group cursor-default" data-aos="fade-up" data-aos-delay={idx * 100}>
                      <div className="flex justify-start mb-4">
                        <div className="w-12 h-12 flex items-center justify-start transform transition-transform duration-300 group-hover:scale-110">
                          {feature.icon ? (
                            <img
                              src={getImageUrl(feature.icon)}
                              alt={feature.icon.altText || feature.heading || ''}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <>
                              {/* Use uploaded SVGs for the icons or fallback */}
                              <img
                                src={[
                                  '/production_facility/full_vertical_integration.svg',
                                  '/production_facility/streamlined_processes.svg',
                                  '/production_facility/quality_controll.svg'
                                ][idx] || getDefaultImageUrl('vector.svg')}
                                alt={feature.heading}
                                className="w-12 h-12 object-contain"
                                onError={(e) => {
                                  // Fallback to icon class if SVG fails
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              {/* Fallback Icon (hidden by default if image loads) */}
                              <i className={`hidden ${feature.iconClass || ['ri-puzzle-2-line', 'ri-settings-4-line', 'ri-shield-check-line'][idx]} text-5xl text-[#FF6B35]`}></i>
                            </>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-2">
                        {feature.heading}
                      </h3>
                      {feature.description && (
                        <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Flexibility in Manufacturing Section */}
              {content?.flexibilityHeading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-20">
                  <div data-aos="fade-right" className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-medium text-[#7DC244] mb-6">
                      {content.flexibilityHeading}
                    </h2>

                    {/* First Paragraph */}
                    {content?.flexibilityContent && (
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {content.flexibilityContent}
                      </p>
                    )}

                    {/* Highlighted Box with Full Rectangular Gradient Border */}
                    {content?.highlightedBoxText && (
                      <div className="my-10" data-aos="fade-up">
                        <div
                          className="p-[5px]"
                          style={{
                            background: 'linear-gradient(151deg, rgba(125, 194, 68, 1) 0%, rgba(238, 106, 49, 1) 100%)'
                          }}
                        >
                          <div className="bg-[#F0F5ED] p-6 md:p-2 h-full">
                            <p className="text-lg md:text-xl text-gray-900 font-bold leading-snug">
                              {content.highlightedBoxText}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Third Paragraph */}
                    {content?.flexibilityAdditionalText && (
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {content.flexibilityAdditionalText}
                      </p>
                    )}

                    <a
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#2879B6] text-white font-medium text-lg rounded hover:bg-[#1f5f8f] transition-all duration-300 mt-6 shadow-md"
                      href="/contact-us"
                    >
                      Know More
                      <i className="ri-external-link-line text-lg"></i>
                    </a>
                  </div>
                  <div className="relative pl-4" data-aos="fade-left" data-aos-delay="100">
                    <div className="relative rounded-lg overflow-hidden shadow-xl">
                      <div className="absolute inset-0 bg-[#7DC244]/10 z-0"></div>
                      <img
                        alt={content.flexibilityImage?.altText || 'Flexibility in Manufacturing'}
                        className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105 relative z-10"
                        src={flexibilityImageUrl}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section - Normal Styled (No Rounded Corners) */}
      {content?.qualityHeading && (
        <section className="relative -mt-8 z-20 pb-0 px-0">
          <div className="w-full max-w-[1920px] mx-auto">
            <div
              className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-16 relative overflow-hidden min-h-[500px]"
              style={qualityBackgroundImageUrl ? {
                backgroundImage: `url(${qualityBackgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}}
            >
              {/* Background Overlay */}
              {qualityBackgroundImageUrl && (
                <div className="absolute inset-0 bg-white/20 z-0"></div>
              )}

              <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                {/* Quality Heading and Content */}
                <div className="mb-12" data-aos="fade-up">
                  <h2 className="text-3xl md:text-4xl font-medium text-[#7DC244] mb-6">
                    {content.qualityHeading}
                  </h2>
                  {content?.qualityContent && (
                    <div className="text-lg text-gray-700 max-w-3xl" dangerouslySetInnerHTML={{ __html: content.qualityContent }} />
                  )}
                </div>

                {/* Split Section: Image & Process Overview */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
                  {/* Left Column: Image */}
                  <div className="relative pl-4" data-aos="fade-right">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-[#7DC244]/10 z-0"></div>
                      <img
                        alt={content.qualityImage?.altText || 'Rigorous Quality Assurance'}
                        className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105 relative z-10"
                        src={qualityImageUrl}
                      />
                    </div>
                  </div>

                  {/* Right Column: Process Overview */}
                  <div data-aos="fade-left" data-aos-delay="100">
                    {qualityProcessFeatures.length > 0 && (
                      <>
                        <h3 className="text-2xl font-medium mb-8 text-gray-800">Process Overview:</h3>
                        <div className="space-y-8">
                          {qualityProcessFeatures.map((feature, idx) => (
                            <div key={feature.id} className="group" data-aos="fade-up" data-aos-delay={idx * 100}>
                              <div className="flex items-start gap-3">
                                <span className="text-[#FF6B35] font-bold text-xl flex-shrink-0">
                                  {String(idx + 1).padStart(2, '0')}.
                                </span>
                                <div className="flex-1">
                                  <h4 className="text-lg md:text-xl text-gray-800 font-semibold mb-2">{feature.heading}</h4>
                                  {feature.description && (
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{feature.description}</p>
                                  )}
                                  {/* Gradient Underline matching Home Page */}
                                  <div className="h-[2px] w-full bg-gradient-to-r from-[#7DC244] to-[#FF6B35] mt-4"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-gray-600 mt-8 text-sm">
                          By following these stringent protocols, we ensure that our products are reliable, accurate, and ready to perform.
                        </p>
                      </>
                    )}
                  </div>
                </div>
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
