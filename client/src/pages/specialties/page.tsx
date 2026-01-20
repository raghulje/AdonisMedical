import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getDefaultImageUrl, getImageUrl } from '../../utils/imageUrl';
import { useSpecialtiesPage } from '../../hooks/useSpecialtiesPage';

export default function SpecialtiesPage() {
  const { content, cards, loading } = useSpecialtiesPage();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : getDefaultImageUrl('2024/10/our-specialties.png');

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
      <section 
        className="relative h-[500px] flex items-center justify-start bg-cover bg-center" 
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <h1 className="text-5xl md:text-6xl font-medium text-[#7DC244] mb-4" data-aos="fade-down">
            {content?.heroTitle || 'Our Specialties'}
          </h1>
          {content?.heroSubtitle && (
            <p className="text-xl text-white" data-aos="fade-up" data-aos-delay="100">
              {content.heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* Specialties Grid Section */}
      {cards.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.slice(0, 3).map((card, index) => {
                const cardImageUrl = card.cardImage ? getImageUrl(card.cardImage) : '';
                const bgImageUrl = card.backgroundImage ? getImageUrl(card.backgroundImage) : '';
                const linkUrl = card.internalLink || '/products';
                
                return (
                  <div 
                    key={card.id}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                    style={bgImageUrl ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {cardImageUrl && (
                        <img 
                          alt={card.name} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                          src={cardImageUrl}
                        />
                      )}
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-500">{card.name}</h3>
                      <a 
                        href={linkUrl} 
                        className="w-12 h-12 bg-[#2879B6] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#1f5f8f] hover:shadow-lg cursor-pointer relative overflow-hidden"
                      >
                        <i className="ri-arrow-right-line text-white text-xl relative z-10 transition-transform duration-300 hover:translate-x-1"></i>
                        <div className="absolute inset-0 bg-[#1f5f8f] transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Second Row - Centered */}
            {cards.length > 3 && (
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                {cards.slice(3).map((card, index) => {
                  const cardImageUrl = card.cardImage ? getImageUrl(card.cardImage) : '';
                  const bgImageUrl = card.backgroundImage ? getImageUrl(card.backgroundImage) : '';
                  const linkUrl = card.internalLink || '/products';
                  
                  // Calculate width to match grid columns: same as first row cards
                  const cardWidth = 'w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]';
                  
                  return (
                    <div 
                      key={card.id}
                      className={`${cardWidth} bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                      data-aos="fade-up"
                      data-aos-delay={(index + 4) * 100}
                      style={bgImageUrl ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    >
                      <div className="relative h-64 overflow-hidden">
                        {cardImageUrl && (
                          <img 
                            alt={card.name} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                            src={cardImageUrl}
                          />
                        )}
                      </div>
                      <div className="p-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-[#2879B6]">{card.name}</h3>
                        <a 
                          href={linkUrl} 
                          className="w-12 h-12 bg-[#2879B6] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#1f5f8f] hover:shadow-lg cursor-pointer relative overflow-hidden"
                        >
                          <i className="ri-arrow-right-line text-white text-xl relative z-10 transition-transform duration-300 hover:translate-x-1"></i>
                          <div className="absolute inset-0 bg-[#1f5f8f] transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <ContactUsSection />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <a href="/request-demo" className="py-4 text-center bg-white hover:bg-gray-50 transition-all duration-300 active:scale-95 cursor-pointer">
            <span className="text-gray-800 font-medium whitespace-nowrap">Request Demo</span>
          </a>
          <a href="/contact-us" className="py-4 text-center bg-[#7DC244] hover:bg-[#6BC04A] transition-all duration-300 active:scale-95 cursor-pointer">
            <span className="text-white font-medium whitespace-nowrap">Contact Us</span>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
