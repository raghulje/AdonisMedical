import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAbout } from '../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';
import ContactUsSection from '../../components/reusable/ContactUsSection';

export default function AboutPage() {
  const { content, loading, error } = useAbout();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : getDefaultImageUrl('2024/10/image-1-1.jpg');
  const overviewImageUrl = content?.overviewImage ? getImageUrl(content.overviewImage) : getDefaultImageUrl('2024/09/Frame-97-3-1.jpg');
  const backgroundImageUrl = content?.backgroundImage ? getImageUrl(content.backgroundImage) : null;
  const safetyImageUrl = content?.safetyImage ? getImageUrl(content.safetyImage) : getDefaultImageUrl('2024/10/Frame-32-3-1.jpg');
  const excellenceImageUrl = content?.excellenceImage ? getImageUrl(content.excellenceImage) : getDefaultImageUrl('2024/10/Frame-32-4-1.jpg');
  
  const highlights = content?.highlights || [];
  const overviewParagraphs = content?.overviewParagraphs || [];
  const beforeParagraphs = overviewParagraphs.filter(p => p.position === 'before' || !p.position).sort((a, b) => a.orderIndex - b.orderIndex);
  const afterParagraphs = overviewParagraphs.filter(p => p.position === 'after').sort((a, b) => a.orderIndex - b.orderIndex);
  const globalReachCards = content?.globalReachCards || [];
  
  // Debug: Log cards to check icon data
  useEffect(() => {
    if (globalReachCards.length > 0) {
      console.log('Global Reach Cards:', globalReachCards);
      globalReachCards.forEach((card, idx) => {
        console.log(`Card ${idx}:`, { id: card.id, iconId: card.iconId, icon: card.icon, iconClass: card.iconClass });
      });
    }
  }, [globalReachCards]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FBA00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[75vh] pt-32 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/35"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-6" style={{ color: '#7FBA00' }} data-aos="fade-down">
              {content?.heroTitle || 'About Us'}
            </h1>
            {content?.heroSubtitle && (
              <p className="text-xl text-white/90" data-aos="fade-up" data-aos-delay="200">
                {content.heroSubtitle}
              </p>
            )}
          </div>
        </section>

        {/* Combined Overview and Safety Section with Rounded Top Corners */}
        <section className="relative -mt-24 z-20 pb-0 px-0">
          <div className="w-full max-w-[1920px] mx-auto">
            <div
              className="bg-white rounded-t-[3rem] md:rounded-t-[4rem] rounded-b-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-16 relative overflow-hidden"
              style={backgroundImageUrl ? {
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}}
            >
              {/* Background Overlay */}
              {backgroundImageUrl && (
                <div className="absolute inset-0 bg-white/20 z-0"></div>
              )}

              <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                {/* Intro Paragraph - First paragraph from overviewContent */}
                {content?.overviewContent && (
                  <div className="mb-12 text-gray-700 text-base leading-relaxed max-w-4xl" data-aos="fade-up">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: content.overviewContent.split(/\n\n|\.\s+(?=[A-Z])/)[0] || content.overviewContent 
                      }} 
                    />
                  </div>
                )}

                {/* Company Overview Row with Image and Bullet Points */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
                  {/* Left Column - Image with Overlay Text */}
                  <div data-aos="fade-right" className="relative">
                    {content?.overviewImageOverlayText && (
                      <div className="absolute top-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg mb-4">
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {content.overviewImageOverlayText}
                        </p>
                      </div>
                    )}
                    <img
                      src={overviewImageUrl}
                      alt={content.overviewImage?.altText || 'Company Overview'}
                      className="w-full h-auto rounded-lg hover:shadow-2xl transition-shadow duration-300"
                    />
                  </div>

                  {/* Right Column - Heading, Paragraphs, Bullet Points, and Final Paragraph */}
                  <div data-aos="fade-left" className="space-y-6">
                    {content.overviewHeading && (
                      <h2 className="text-3xl md:text-4xl font-medium" style={{ color: '#7FBA00' }}>
                        {content.overviewHeading}
                      </h2>
                    )}
                    
                    {/* Paragraphs before highlights */}
                    {beforeParagraphs.length > 0 && (
                      <div className="space-y-4">
                        {beforeParagraphs.map((paragraph) => (
                          <div key={paragraph.id} className="text-gray-700 text-base leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: paragraph.content }} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bullet Points with Icons */}
                    {highlights.length > 0 && (
                      <div className="space-y-4">
                        {highlights.map((highlight, index) => (
                          <div key={highlight.id} className="flex items-start gap-3" data-aos="fade-left" data-aos-delay={index * 100}>
                            {highlight.icon ? (
                              <img
                                src={getImageUrl(highlight.icon)}
                                alt={highlight.icon.altText || highlight.text}
                                className="w-6 h-6 flex-shrink-0 mt-1"
                              />
                            ) : highlight.iconClass ? (
                              <i className={`${highlight.iconClass} text-[#FF6B35] text-xl flex-shrink-0 mt-1`}></i>
                            ) : (
                              <i className="ri-checkbox-circle-line text-[#FF6B35] text-xl flex-shrink-0 mt-1"></i>
                            )}
                            <p className="text-gray-700 text-base font-semibold leading-relaxed">{highlight.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Paragraphs after highlights */}
                    {afterParagraphs.length > 0 && (
                      <div className="space-y-4">
                        {afterParagraphs.map((paragraph) => (
                          <div key={paragraph.id} className="text-gray-700 text-base leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: paragraph.content }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Safety and Innovation Row */}
                {content?.safetyContent && (
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Column - Text */}
                    <div className="space-y-6" data-aos="fade-right">
                      {content.safetyHeading && (
                        <h2 className="text-3xl md:text-4xl font-medium" style={{ color: '#7FBA00' }}>
                          {content.safetyHeading}
                        </h2>
                      )}
                      <div className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: content.safetyContent || '' }} />
                      <button 
                        className="px-6 py-3 text-white font-medium rounded-md whitespace-nowrap cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                        style={{ backgroundColor: '#7FBA00' }}
                        onClick={() => window.location.href = '/contact-us'}
                        data-aos="zoom-in"
                        data-aos-delay="200"
                      >
                        Know More
                      </button>
                    </div>

                    {/* Right Column - Image */}
                    <div className="rounded-lg overflow-hidden" data-aos="fade-left">
                      <img 
                        src={safetyImageUrl}
                        alt={content.safetyImage?.altText || 'Safety and Innovation'} 
                        className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Excellence Section */}
        {content?.excellenceContent && (
          <section className="py-11 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              {content.excellenceHeading && (
                <h2 className="text-4xl font-medium text-center mb-12" style={{ color: '#7FBA00' }} data-aos="fade-up">
                  {content.excellenceHeading}
                </h2>
              )}
              
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left Column - Image */}
                <div className="rounded-lg overflow-hidden" data-aos="fade-right">
                  <img 
                    src={excellenceImageUrl}
                    alt={content.excellenceImage?.altText || 'Excellence'} 
                    className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Right Column - Text */}
                <div className="space-y-6" data-aos="fade-left">
                  <div className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: content.excellenceContent || '' }} />
                  
                  <div className="p-8 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: '#FF6B35' }} data-aos="zoom-in" data-aos-delay="200">
                    <p className="text-white text-lg font-medium leading-relaxed">
                      For over 30 years, we have been building a market share founded on trust, quality, and well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Global Reach Section */}
        {(content?.globalReachHeading || globalReachCards.length > 0) && (
          <section className="py-11 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <h2 className="text-4xl font-medium text-center mb-12" style={{ color: '#7FBA00' }} data-aos="fade-up">
                {content?.globalReachHeading || 'Global Reach and Vision'}
              </h2>
              
              {globalReachCards.length > 0 && (
                <div className="grid md:grid-cols-3 gap-8">
                  {globalReachCards.map((card, index) => (
                    <div key={card.id} className="text-center space-y-4 hover-lift cursor-pointer" data-aos="flip-up" data-aos-delay={(index + 1) * 100}>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white border-2 border-gray-200">
                          {(card.icon && card.icon.filePath) ? (
                            <img
                              src={getImageUrl(card.icon)}
                              alt={card.icon.altText || card.content}
                              className="w-8 h-8 object-contain"
                            />
                          ) : card.iconClass ? (
                            <i className={`${card.iconClass} text-gray-700 text-3xl`}></i>
                          ) : (
                            <i className="ri-global-line text-gray-700 text-3xl"></i>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <ContactUsSection />
      </main>
      <Footer />
    </div>
  );
}
