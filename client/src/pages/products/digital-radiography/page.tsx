import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/feature/Header';
import Footer from '../../../components/feature/Footer';
import ContactUsSection from '../../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProduct } from '../../../hooks';
import { getProductApiSlug } from '../../../utils/productSlugs';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

export default function DigitalRadiographyPage() {
  const navigate = useNavigate();
  const { content, images, features, variants, loading, error } = useProduct(getProductApiSlug('digital-radiography'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const mainImage = images.find(img => img.isPrimary) || images[0];
  const mainImageUrl = mainImage?.image ? getImageUrl(mainImage.image) : getDefaultImageUrl('2025/05/Digital-Radiography-New.jpg');
  const allImages = images.length > 0 ? images.map(img => img.image ? getImageUrl(img.image) : '').filter(Boolean) : [mainImageUrl];

  const relatedProducts = [
    { name: 'HF Fixed', image: getDefaultImageUrl('2025/02/untitled-33-1024x683.jpg'), link: '/products/hf-fixed' },
    { name: 'HF Mobile', image: getDefaultImageUrl('2025/05/HF-Mobile-New-1024x683.jpg'), link: '/products/hf-mobile' },
    { name: '0.5K High End HF C-ARM', image: getDefaultImageUrl('2025/02/02-1-1024x683.jpg'), link: '/products/1k1k-high-end-hf-c-arm' },
    { name: 'Line Frequency X-Ray Systems', image: getDefaultImageUrl('2025/05/Line-Frequency-New-1024x683.jpg'), link: '/products/line-frequency-x-ray-systems' },
    { name: 'Dream Series-Ceiling Suspended', image: getDefaultImageUrl('2025/03/Dream_series-1024x683.jpg'), link: '/products/dream-series-ceiling-suspended' },
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
              {content?.title || 'Digital Radiography'}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4" data-aos="fade-right">
              <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <img
                  src={allImages[currentImageIndex] || mainImageUrl}
                  alt={mainImage?.image?.altText || content?.title || 'Digital Radiography'}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
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
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Key Features:</h3>
                  <p className="text-gray-700 text-lg">{content.shortDescription}</p>
                </div>
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
                <div className="flex items-start gap-4">
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
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-600 mb-2 text-center" data-aos="fade-up">TESTIMONIAL</p>
          <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center" data-aos="fade-up">Client Stories & Experiences</h2>
        </div>
      </section>
      <Footer />
    </div>
  );
}
