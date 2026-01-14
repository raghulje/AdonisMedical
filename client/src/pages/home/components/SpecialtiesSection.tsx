import { useSpecialties } from '../../../hooks';
import { getDefaultImageUrl } from '../../../utils/imageUrl';

const SpecialtiesSection = () => {
  const { specialties, loading, error } = useSpecialties();

  // Fallback specialties if API fails or returns empty
  const defaultSpecialties = [
    { name: 'Radiology', iconClass: 'ri-heart-pulse-line' },
    { name: 'Urology', iconClass: 'ri-capsule-line' },
    { name: 'Neurology', iconClass: 'ri-brain-line' },
    { name: 'Orthopedic', iconClass: 'ri-bone-line' },
    { name: 'Gastroenterology', iconClass: 'ri-stethoscope-line' },
  ];

  const displaySpecialties = specialties.length > 0 ? specialties : defaultSpecialties;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Specialties</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div data-aos="fade-up">
            <img
              src={getDefaultImageUrl('2024/09/Frame-32-1.jpg')}
              alt="Our Specialties"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-8" data-aos="fade-up">
            <p className="text-lg text-gray-700 leading-relaxed">
              Discover our selection of healthcare consulting services designed to support you in reaching clinical
              excellence and operational efficiency, enhancing financial performance, and delivering high-quality
              patient care.
            </p>

            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
                </div>
              ) : (
                displaySpecialties.map((specialty, index) => (
                  <div
                    key={specialty.id || index}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    data-aos="fade-left"
                    data-aos-delay={index * 100}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <i className={`${specialty.iconClass || specialty.icon || 'ri-stethoscope-line'} text-white text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{specialty.name}</h3>
                      {specialty.description && (
                        <p className="text-sm text-gray-600 mt-1">{specialty.description}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-[#FF6B35] p-8 rounded-lg text-white hover:shadow-xl transition-all duration-300 cursor-pointer" data-aos="zoom-in" data-aos-delay="600">
              <p className="text-lg font-medium mb-2">Explore our full suite of</p>
              <p className="text-2xl font-bold mb-4">Medical Imaging Products</p>
              <a
                href="/products"
                className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-[#FF6B35] hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              >
                <i className="ri-arrow-right-line text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
