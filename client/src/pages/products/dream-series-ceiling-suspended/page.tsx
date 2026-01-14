import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/feature/Header';
import Footer from '../../../components/feature/Footer';
import ContactUsSection from '../../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProduct, useTestimonials } from '../../../hooks';
import { getProductApiSlug } from '../../../utils/productSlugs';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

export default function DreamSeriesCeilingSuspendedPage() {
  const navigate = useNavigate();
  const { content, images, features, variants, loading, error } = useProduct(getProductApiSlug('dream-series-ceiling-suspended'));
  const { testimonials: cmsTestimonials = [], loading: testimonialsLoading } = useTestimonials();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Use CMS testimonials if available, otherwise use fallback
  const testimonials = cmsTestimonials.length > 0 ? cmsTestimonials.map((t: any) => ({
    text: t.testimonialText,
    name: t.name,
    designation: t.designation || t.company || ''
  })) : [
    {
      text: "What sets ADONIS apart from other medical suppliers is their willingness to go the extra mile. The customer support I got was exemplary and they answered all of my queries patiently just to ensure I was completely satisfied.",
      name: "Dr. S. Karthik",
      designation: "Global Ortho & Trauma Hospital"
    },
    {
      text: "My association with ADONIS has been for a ten years. The products I have used till date 26-10-2024 are of superior quality and long term durability. My complete satisfaction with their products peoples me to further recommend to others.",
      name: "Dr. U. Sai Kiran",
      designation: "Life Care Multi Speciality Hospital"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const mainImage = images.find(img => img.isPrimary) || images[0];
  const mainImageUrl = mainImage?.image ? getImageUrl(mainImage.image) : getDefaultImageUrl('2025/03/Dream_series.jpg');
  const allImages = images.length > 0 ? images.map(img => img.image ? getImageUrl(img.image) : '').filter(Boolean) : [mainImageUrl];

  const relatedProducts = [
    { name: 'HF Fixed', image: getDefaultImageUrl('2025/02/untitled-33-1024x683.jpg'), link: '/products/hf-fixed' },
    { name: 'HF Mobile', image: getDefaultImageUrl('2025/05/HF-Mobile-New-1024x683.jpg'), link: '/products/hf-mobile' },
    { name: '1K*1K High End HF C-ARM', image: getDefaultImageUrl('2025/02/02-1-1024x683.jpg'), link: '/products/1k1k-high-end-hf-c-arm' },
    { name: 'Line Frequency X-Ray Systems', image: getDefaultImageUrl('2025/05/Line-Frequency-New-1024x683.jpg'), link: '/products/line-frequency-x-ray-systems' },
    { name: 'Digital Radiography', image: getDefaultImageUrl('2025/05/Digital-Radiography-New-1024x683.jpg'), link: '/products/digital-radiography' },
    { name: 'FPD-C-Arm', image: getDefaultImageUrl('2025/02/ADN0321-copy-2-1024x683.jpg'), link: '/products/fpd-c-arm' }
  ];

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ED957]"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Header />
      
      {/* Product Details Section */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center" data-aos="fade-down">
            <h1 className="text-5xl font-bold text-[#7ED957]">
              {content?.title || 'Dream Series-Ceiling Suspended'}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4" data-aos="fade-right">
              <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <img
                  src={allImages[currentImageIndex] || mainImageUrl}
                  alt={mainImage?.image?.altText || content?.title || 'Dream Series-Ceiling Suspended'}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-24 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        currentImageIndex === idx ? 'border-[#7ED957]' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {content?.deploymentInfo && (
                <div className="text-center">
                  <span className="inline-block bg-[#0066CC] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    {content.deploymentInfo}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-6" data-aos="fade-left">
              {content?.shortDescription && (
                <p className="text-gray-700 text-lg">
                  {content.shortDescription}
                </p>
              )}
              {content?.fullDescription && (
                <p className="text-gray-700 text-base leading-relaxed">
                  {content.fullDescription}
                </p>
              )}
              {features.length > 0 && (
                <ul className="space-y-3 text-gray-700">
                  {features.map((feature, idx) => (
                    <li key={feature.id} className="flex items-start gap-3 transition-all duration-300 hover:translate-x-2" data-aos="fade-up" data-aos-delay={idx * 50}>
                      <span className="text-[#7ED957] mt-1 transition-transform duration-300 hover:scale-125">•</span>
                      <span>{feature.featureText}</span>
                    </li>
                  ))}
                </ul>
              )}
              {variants.length > 0 && (
                <div className="pt-6" data-aos="fade-up">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant) => (
                      <span key={variant.id} className="px-6 py-2 bg-[#F5F5DC] text-gray-800 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
                        {variant.variantName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-6" data-aos="fade-up">
                <button
                  onClick={() => navigate('/contact-us')}
                  className="px-8 py-3 bg-[#0066CC] text-white font-semibold rounded-md hover:bg-[#0052A3] transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-16 bg-gradient-to-b from-[#F5F5DC] to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#7ED957]" data-aos="fade-up">Our Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                onClick={() => navigate(product.link)}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
              >
                <div className="relative h-64">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <i className="ri-arrow-right-line text-2xl text-[#0066CC]"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitals Served Section */}
      <section className="py-16 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#7ED957]" data-aos="fade-up">Hospitals Served</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((item, idx) => (
              <div key={item} className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-[#7ED957] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-125 hover:rotate-12">
                    <i className="ri-hospital-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Hospital Name</h3>
                    <p className="text-sm text-gray-600">City name, State name</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactUsSection />

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-sm text-gray-600 mb-2 text-center" data-aos="fade-up">TESTIMONIAL</p>
            <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center" data-aos="fade-up">Client Stories & Experiences</h2>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 px-4">
                      <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg p-8 text-white" data-aos="fade-up">
                        <div className="mb-4">
                          <i className="ri-double-quotes-l text-4xl opacity-50"></i>
                        </div>
                        <p className="text-lg mb-6">{testimonial.text}</p>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white rounded-full"></div>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm opacity-90">{testimonial.designation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                      currentTestimonial === idx ? 'bg-orange-500 w-8' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  ></button>
                ))}
              </div>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <i className="ri-arrow-left-s-line text-2xl text-gray-800"></i>
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <i className="ri-arrow-right-s-line text-2xl text-gray-800"></i>
              </button>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
