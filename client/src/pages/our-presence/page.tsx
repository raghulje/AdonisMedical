import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useOurPresence } from '../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';

export default function OurPresencePage() {
  const { content, locations, loading, locationsLoading } = useOurPresence();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : getDefaultImageUrl('2024/09/image-48-1.jpg');
  const mapImageUrl = content?.mapImage ? getImageUrl(content.mapImage) : getDefaultImageUrl('2024/09/Group-9-884x1024.png');
  const salesServiceImageUrl = content?.salesServiceImage ? getImageUrl(content.salesServiceImage) : getDefaultImageUrl('2024/09/Frame-32-2-1.jpg');

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
      <section className="relative h-[400px] flex items-center justify-start bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/25"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-5xl font-medium mb-3 text-white">
            {content?.heroTitle || 'Our Presence'}
          </h1>
          {content?.heroSubtitle && (
            <p className="text-xl text-white/90">{content.heroSubtitle}</p>
          )}
        </div>
      </section>


      {/* Map Section with Rounded Top Corners */}
      <section className="relative -mt-16 pb-0">
        <div className="w-full">
          <div className="bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-0 pt-8 md:pt-12 lg:pt-16 pb-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-8 md:pb-12 lg:pb-16">
                <div className="flex items-center">
                  {content?.introText && (
                    <div className="text-gray-700 text-base leading-relaxed pr-8" dangerouslySetInnerHTML={{ __html: content.introText }} />
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <div className="relative w-3/5 mb-8">
                    <img
                      alt={content?.mapImage?.altText || 'India Map showing Adonis Medical presence'}
                      className="w-full h-auto"
                      src={mapImageUrl}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <i className="ri-map-pin-fill text-blue-600 text-xl"></i>
                      <span className="text-gray-700 text-sm font-medium">Sales and Service Network</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-map-pin-fill text-orange-500 text-xl"></i>
                      <span className="text-gray-700 text-sm font-medium">Dealer Network</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Sales and Service Teams Section */}
      {content?.salesServiceHeading && (
        <section className="py-14 bg-gradient-to-b from-[#faf9f5] to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-16">
              <h2 className="text-4xl font-medium text-[#7DC244] text-center">
                {content.salesServiceHeading}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <img
                  alt={content.salesServiceImage?.altText || 'Well-connected sales and service teams'}
                  className="w-full h-auto rounded-lg shadow-lg"
                  src={salesServiceImageUrl}
                />
              </div>
              {content.salesServiceContent && (
                <div className="space-y-6">
                  <div className="text-gray-700 text-base leading-relaxed">
                    {content.salesServiceContent.split('\n\n').filter(p => p.trim()).map((paragraph, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-6' : ''}>
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                  <div>
                    <a
                      href="/contact-us"
                      className="inline-block px-8 py-3 bg-[#0066b2] text-white font-medium rounded hover:bg-[#005299] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Know More
                    </a>
                  </div>
                </div>
              )}
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
