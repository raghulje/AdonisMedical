import { useHomeQuality } from '../../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

const QualitySection = () => {
  const { quality, loading, error } = useHomeQuality();

  const backgroundImage = quality?.backgroundImage ? getImageUrl(quality.backgroundImage) : (quality?.image ? getImageUrl(quality.image) : getDefaultImageUrl('2024/10/Frame-9-1-1.jpg'));
  const title = quality?.heading || quality?.title || 'Quality Assurance';
  const content = quality?.description || quality?.content || 'Certified to the highest national and international standards, our equipment delivers flawless performance backed by rigorous in-house testing.';

  if (loading) {
    return (
      <section className="py-14 bg-gray-200 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-14 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-lg shadow-lg border border-white/20">
          <h2 className="text-4xl md:text-5xl font-medium text-[#7DC244] mb-6" data-aos="fade-in">
            {title}
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed" data-aos="fade-in" data-aos-delay="100">
            {content}
          </p>
          <div data-aos="fade-in" data-aos-delay="200">
            <a
              href="/quality-assurance"
              className="inline-block px-8 py-3 bg-[#2879B6] text-white text-sm font-medium rounded-md hover:bg-[#1f5f8f] transition-all duration-300 hover:shadow-lg whitespace-nowrap"
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
