import { useSpecialties, useHomeSpecialties } from '../../../hooks';
import { getDefaultImageUrl, getImageUrl } from '../../../utils/imageUrl';

const SpecialtiesSection = () => {
  const { specialties, loading: specialtiesLoading } = useSpecialties();
  const { section, loading: sectionLoading, error } = useHomeSpecialties();

  // Fallback specialties if API fails or returns empty
  const defaultSpecialties = [
    { name: 'Radiology', id: 1, orderIndex: 0 },
    { name: 'Urology', id: 2, orderIndex: 1 },
    { name: 'Neurology', id: 3, orderIndex: 2 },
    { name: 'Orthopedic', id: 4, orderIndex: 3 },
    { name: 'Gastroenterology', id: 5, orderIndex: 4 },
  ];

  const displaySpecialties = specialties.length > 0 ? specialties : defaultSpecialties;
  const loading = specialtiesLoading || sectionLoading;

  // Get section image from CMS or fallback
  const sectionImage = section?.image ? getImageUrl(section.image) : getDefaultImageUrl('2024/09/Frame-32-1.jpg');
  const heading = section?.heading || 'Our Specialties';
  const description = section?.description || 'Discover our selection of healthcare consulting services designed to support you in reaching clinical excellence and operational efficiency, enhancing financial performance, and delivering high-quality patient care.';
  const ctaText = section?.ctaText || 'Explore our full suite of';
  const ctaUrl = section?.ctaUrl || '/products';

  return (
    <section className="py-14 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
          {/* Left Image */}
          <div className="relative" data-aos="fade-up">
            <img
              src={sectionImage}
              alt={section?.image?.altText || 'Our Specialties'}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-8 relative z-10" data-aos="fade-up">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-medium text-[#7DC244] mb-6">
              {heading}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>

            {/* Numbered List with Gradient Underlines */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
                </div>
              ) : (
                displaySpecialties.slice(0, 5).map((specialty, index) => {
                  // Alternating gradient: green for even (0,2,4), orange for odd (1,3)
                  const isEven = index % 2 === 0;
                  const gradientColor = isEven ? 'from-[#7DC244] to-[#FF6B35]' : 'from-[#FF6B35] to-[#7DC244]';
                  
                  return (
                    <div key={specialty.id || index} className="space-y-3 py-3" data-aos="fade-left" data-aos-delay={index * 100}>
                      <div className="flex items-center gap-3">
                        <span className="text-[#FF6B35] font-bold text-xl flex-shrink-0 bg-orange-100 px-2 py-1 rounded">
                          {String(index + 1).padStart(2, '0')}.
                        </span>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">{specialty.name}</h3>
                      </div>
                      {/* Gradient Underline - Starting from number position */}
                      <div className={`h-[2px] w-full bg-gradient-to-r ${gradientColor}`}></div>
                    </div>
                  );
                })
              )}
            </div>

            {/* CTA Button - Overlapping/Colliding with Left Image */}
            <div className="relative -mt-16 lg:-ml-24 z-20" data-aos="zoom-in" data-aos-delay="600">
              <div className="bg-[#FF6B35] p-6 md:p-8 rounded-lg text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <p className="text-lg font-medium mb-2">{ctaText}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-medium">Medical Imaging Products</p>
                  <a
                    href={ctaUrl}
                    className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-[#7DC244] hover:bg-gray-100 transition-all duration-300 hover:scale-110 ml-4 flex-shrink-0"
                  >
                    <i className="ri-arrow-right-up-line text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
