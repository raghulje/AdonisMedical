import { useHomeHero } from '../../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

const HeroSection = () => {
  const { hero, loading, error } = useHomeHero();

  const getOverlayOpacity = (opacity: number | null): number => {
    return opacity !== null ? opacity / 100 : 0.2;
  };

  if (loading) {
    return (
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      </section>
    );
  }

  if (error) {
    // Fallback to default content on error
    return (
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getDefaultImageUrl('2024/09/hospital-hallway-with-people-walking-down-it-1-1.jpg')})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-3 sm:px-4 md:px-6 max-w-5xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium text-white mb-3 sm:mb-4 md:mb-6 leading-tight px-1 sm:px-2" data-aos="fade-in">
            Adonis Medical Systems
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-4 sm:mb-6 md:mb-8 px-1 sm:px-2" data-aos="fade-in" data-aos-delay="100">
            Excellence In Technology, Dedication in Service
          </p>
        </div>
      </section>
    );
  }

  const backgroundImage = hero?.backgroundImage ? getImageUrl(hero.backgroundImage) : getDefaultImageUrl('2024/09/hospital-hallway-with-people-walking-down-it-1-1.jpg');
  const overlayOpacity = getOverlayOpacity(hero?.overlayOpacity || null);
  const title = hero?.title || 'Adonis Medical Systems';
  const subtitle = hero?.subtitle || 'Excellence In Technology, Dedication in Service';
  const titleColor = hero?.titleColor || '#FFFFFF';
  const subtitleColor = hero?.subtitleColor || '#FFFFFF';

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/20"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-3 sm:px-4 md:px-6 max-w-5xl mx-auto w-full">
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium mb-3 sm:mb-4 md:mb-6 leading-tight px-1 sm:px-2" 
          style={{ color: titleColor }}
          data-aos="fade-in"
        >
          {title}
        </h1>
        <p 
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 px-1 sm:px-2" 
          style={{ color: subtitleColor }}
          data-aos="fade-in" 
          data-aos-delay="100"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
