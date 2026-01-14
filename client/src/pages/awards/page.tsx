import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAwards, useAwardsPage } from '../../hooks';
import { getDefaultImageUrl, getImageUrl } from '../../utils/imageUrl';

export default function AwardsPage() {
  const { awards, loading, error } = useAwards();
  const { content: pageContent, loading: contentLoading } = useAwardsPage();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Fallback placeholder image - only used when image fails to load (server error)
  const placeholderImage = getDefaultImageUrl('2025/04/Award01-1.jpg');

  return (
    <div className="pt-20">
      <Header />
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-32 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
            pageContent?.heroImage 
              ? getImageUrl(pageContent.heroImage) 
              : getDefaultImageUrl('2024/10/image-1-1.jpg')
          })`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#9ACD32] mb-6" data-aos="fade-down">
            {pageContent?.heroTitle || 'Awards'}
          </h1>
          {pageContent?.heroSubtitle && (
            <p className="text-xl text-white font-light" data-aos="fade-up" data-aos-delay="100">
              {pageContent.heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* Awards Grid Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#9ACD32]"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center p-8 bg-red-50 rounded-lg">
              <i className="ri-error-warning-line text-4xl mb-4"></i>
              <p className="text-lg">Failed to load awards. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.map((award, index) => {
                const imageUrl = award.image ? getImageUrl(award.image) : null;
                const placeholderImage = getDefaultImageUrl('2025/04/Award01-1.jpg');
                
                return (
                  <div 
                    key={award.id} 
                    className="cursor-pointer group"
                    data-aos="zoom-in"
                    data-aos-delay={index * 50}
                    title={award.title}
                  >
                    <div className="overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={award.title}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                          loading={index < 4 ? 'eager' : 'lazy'}
                          onError={(e) => {
                            // Only fallback if image fails to load (server error)
                            const target = e.target as HTMLImageElement;
                            if (target.src !== placeholderImage) {
                              target.src = placeholderImage;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                          <i className="ri-image-line text-4xl text-gray-400"></i>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
