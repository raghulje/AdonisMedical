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
  const safetyImageUrl = content?.safetyImage ? getImageUrl(content.safetyImage) : getDefaultImageUrl('2024/10/Frame-32-3-1.jpg');
  const excellenceImageUrl = content?.excellenceImage ? getImageUrl(content.excellenceImage) : getDefaultImageUrl('2024/10/Frame-32-4-1.jpg');

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
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ color: '#7FBA00' }} data-aos="fade-down">
              {content?.heroTitle || 'About Us'}
            </h1>
            {content?.heroSubtitle && (
              <p className="text-xl text-white/90" data-aos="fade-up" data-aos-delay="200">
                {content.heroSubtitle}
              </p>
            )}
          </div>
        </section>

        {/* Company Overview Section */}
        {content?.overviewContent && (
          <section className="py-16 px-6" style={{ backgroundColor: '#FAFAFA' }}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left Column - Image */}
                <div className="order-2 md:order-1" data-aos="fade-right">
                  <img
                    src={overviewImageUrl}
                    alt={content.overviewImage?.altText || 'Company Overview'}
                    className="w-full h-auto rounded-lg hover:shadow-2xl transition-shadow duration-300"
                  />
                </div>

                {/* Right Column - Text */}
                <div className="order-1 md:order-2" data-aos="fade-left">
                  {content.overviewHeading && (
                    <h2 className="text-3xl font-bold mb-6" style={{ color: '#7FBA00' }}>
                      {content.overviewHeading}
                    </h2>
                  )}
                  <div className="text-gray-700 text-base leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: content.overviewContent || '' }} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Safety and Innovation Section */}
        {content?.safetyContent && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text */}
                <div className="space-y-6" data-aos="fade-right">
                  {content.safetyHeading && (
                    <h2 className="text-4xl font-bold" style={{ color: '#7FBA00' }}>
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
            </div>
          </section>
        )}

        {/* Excellence Section */}
        {content?.excellenceContent && (
          <section className="py-16 px-6" style={{ backgroundColor: '#F5F5DC' }}>
            <div className="max-w-7xl mx-auto">
              {content.excellenceHeading && (
                <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#7FBA00' }} data-aos="fade-up">
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
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#7FBA00' }} data-aos="fade-up">
              Global Reach and Vision
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="text-center space-y-4 hover-lift cursor-pointer" data-aos="flip-up" data-aos-delay="100">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#FF6B35' }}>
                    <i className="ri-global-line text-white text-3xl"></i>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  Adonis Medical Systems is driven by the mission to provide state-of-the-art radiology products worldwide.
                </p>
              </div>

              {/* Card 2 */}
              <div className="text-center space-y-4 hover-lift cursor-pointer" data-aos="flip-up" data-aos-delay="200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#FF6B35' }}>
                    <i className="ri-hand-heart-line text-white text-3xl"></i>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  We empower medical practitioners with the tools and technologies they need to diagnose and treat patients quickly, effectively, and effortlessly.
                </p>
              </div>

              {/* Card 3 */}
              <div className="text-center space-y-4 hover-lift cursor-pointer" data-aos="flip-up" data-aos-delay="300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#FF6B35' }}>
                    <i className="ri-trophy-line text-white text-3xl"></i>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  Our commitment to quality and customer satisfaction continues to fuel our growth and strengthen our presence in the global healthcare market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactUsSection />
      </main>
      <Footer />
    </div>
  );
}
