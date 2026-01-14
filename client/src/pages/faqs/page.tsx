import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import { useFaqs } from '../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function FaqsPage() {
  const { page, items, loading } = useFaqs();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const getOverlayOpacity = (opacity: number | null): number => {
    return opacity !== null ? opacity / 100 : 0.4;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ED957]"></div>
      </div>
    );
  }

  const backgroundImage = page?.backgroundImage 
    ? getImageUrl(page.backgroundImage) 
    : getDefaultImageUrl('2024/09/hospital-hallway-with-people-walking-down-it-1-1.jpg');
  const overlayOpacity = getOverlayOpacity(page?.overlayOpacity || null);
  const title = page?.heroTitle || 'Frequently Asked Questions';
  const subtitle = page?.heroSubtitle || 'Find answers to common questions about our products and services';
  const titleColor = page?.titleColor || '#FFFFFF';
  const subtitleColor = page?.subtitleColor || '#FFFFFF';

  // Get the image from the first FAQ item (or use a default)
  const faqsImage = items.length > 0 && items[0].image 
    ? getImageUrl(items[0].image) 
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" 
            style={{ color: titleColor }}
            data-aos="fade-in"
          >
            {title}
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8" 
            style={{ color: subtitleColor }}
            data-aos="fade-in" 
            data-aos-delay="100"
          >
            {subtitle}
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section 
        className="py-20"
        style={{
          backgroundImage: page?.sectionBackgroundImage ? `url(${getImageUrl(page.sectionBackgroundImage)})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: page?.sectionBackgroundImage ? 'transparent' : '#F9FAFB'
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image */}
            {faqsImage && (
              <div className="relative" data-aos="fade-right">
                <img
                  src={faqsImage}
                  alt="FAQs"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
              </div>
            )}

            {/* Right Side - FAQs */}
            <div className="space-y-6" data-aos="fade-left">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#FF6B35] text-white rounded-lg flex items-center justify-center font-bold text-lg">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {item.question}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <p className="text-gray-500 italic text-center">
                    No FAQs available. Please add FAQs through the admin dashboard.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reusable Contact Section */}
      <ContactUsSection />

      <Footer />
    </div>
  );
}

