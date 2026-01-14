import { useHomeQuality } from '../../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

const QualitySection = () => {
  const { quality, loading, error } = useHomeQuality();

  const backgroundImage = quality?.image ? getImageUrl(quality.image) : getDefaultImageUrl('2024/10/Frame-9-1-1.jpg');
  const title = quality?.title || 'Quality Assurance';
  const content = quality?.content || 'Certified to the highest national and international standards, our equipment delivers flawless performance backed by rigorous in-house testing.';

  if (loading) {
    return (
      <section className="py-20 bg-gray-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-20 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-in">
            {title}
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed" data-aos="fade-in" data-aos-delay="100">
            {content}
          </p>
          <div data-aos="fade-in" data-aos-delay="200">
            <a
              href="/quality-assurance"
              className="inline-block px-8 py-3 bg-[#0066CC] text-white text-sm font-medium rounded-md hover:bg-[#0052A3] transition-all duration-300 hover:shadow-lg whitespace-nowrap"
            >
              Explore our quality assurance solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
