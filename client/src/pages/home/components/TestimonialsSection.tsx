import { useTestimonials } from '../../../hooks';
import { getDefaultImageUrl } from '../../../utils/imageUrl';

const TestimonialsSection = () => {
  const { testimonials, loading, error } = useTestimonials();

  // Fallback images for testimonials without uploaded images
  const defaultImages = [
    getDefaultImageUrl('2024/12/Screenshot-21.png'),
    getDefaultImageUrl('2024/12/Frame-387.png'),
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12" data-aos="fade-up">
          <p className="text-[#FF6B35] font-medium mb-2">Testimonial</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Client Stories & Experiences</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center p-4">
            <p>Failed to load testimonials. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-[#FF6B35] p-8 rounded-lg text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="mb-6">
                  <img
                    src={getDefaultImageUrl('2024/11/Container-5.png')}
                    alt="Quote"
                    className="w-16 h-auto"
                  />
                </div>

                <p className="text-white leading-relaxed mb-6 text-lg italic">
                  "{testimonial.testimonialText}"
                </p>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.clientImage?.filePath || defaultImages[index % 2]}
                    alt={testimonial.clientName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{testimonial.clientName}</h3>
                    {testimonial.clientPosition && testimonial.clientCompany && (
                      <p className="text-sm text-white/90">
                        {testimonial.clientPosition}, {testimonial.clientCompany}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
