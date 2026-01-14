import { useHomeHero } from '../../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

const HeroSection = () => {
  const { hero, loading, error } = useHomeHero();

  const getOverlayOpacity = (opacity: number | null): number => {
    return opacity !== null ? opacity / 100 : 0.4;
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      </section>
    );
  }

  if (error) {
    // Fallback to default content on error
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getDefaultImageUrl('2024/09/hospital-hallway-with-people-walking-down-it-1-1.jpg')})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" data-aos="fade-in">
            Adonis Medical Systems
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8" data-aos="fade-in" data-aos-delay="100">
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" 
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
  );
};

export default HeroSection;
