import { useEffect } from 'react';
import Header from '../../../components/feature/Header';
import Footer from '../../../components/feature/Footer';
import ContactUsSection from '../../../components/reusable/ContactUsSection';
import TestimonialsSection from '../../home/components/TestimonialsSection';
import HospitalsServedSection from '../../../components/product/HospitalsServedSection';
import ProductImageCarousel from '../../../components/product/ProductImageCarousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProduct, useHomeProducts } from '../../../hooks';
import { getProductApiSlug } from '../../../utils/productSlugs';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';
import { Link } from 'react-router-dom';

export default function FPDCArm() {
  const { content, images, features, variants, loading, error } = useProduct(getProductApiSlug('fpd-c-arm'));
  const { cards: productCards } = useHomeProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const mainImage = images.find(img => img.isPrimary) || images[0];
  const mainImageUrl = mainImage?.image ? getImageUrl(mainImage.image) : getDefaultImageUrl('2025/02/ADN0321-copy-2.jpg');
  const allImages = images.length > 0 ? images.map(img => img.image ? getImageUrl(img.image) : '').filter(Boolean) : [mainImageUrl];

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DC244]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
      </div>
      
      {/* Product Details Section */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center" data-aos="fade-down">
            <h1 className="text-5xl font-medium text-[#7DC244]">
              {content?.title || 'FPD-C-Arm'}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4" data-aos="fade-right">
              <ProductImageCarousel
                images={allImages}
                altText={mainImage?.image?.altText || content?.title || 'FPD-C-Arm'}
              />
              {content?.deploymentInfo && (
                <div className="text-center">
                  <span className="inline-block bg-[#F2F9EC] text-[#7DC244] px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
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
                    <li key={feature.id} className="flex gap-3 transition-all duration-300 hover:translate-x-2" data-aos="fade-up" data-aos-delay={idx * 50}>
                      <span className="text-[#3e6da3] text-xl font-black transition-transform duration-300 hover:scale-125 flex-shrink-0 leading-tight">•</span>
                      <span className="leading-relaxed">{feature.featureText}</span>
                    </li>
                  ))}
                </ul>
              )}
              {variants.length > 0 && (
                <div className="pt-6" data-aos="fade-up">
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant) => (
                      <span key={variant.id} className="px-6 py-2 bg-[#F2F9EC] text-[#7DC244] rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
                        {variant.variantName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-6" data-aos="fade-up">
                <a 
                  href="/contact-us" 
                  className="inline-block px-8 py-3 bg-[#2879B6] text-white font-semibold rounded-md transition-all duration-300 whitespace-nowrap hover:bg-[#1f5f8f] hover:scale-105 hover:shadow-lg"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-11 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-medium text-[#7DC244] text-center mb-12" data-aos="fade-up">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'HF Fixed', img: getDefaultImageUrl('2025/02/untitled-33-1024x683.jpg'), link: '/products/hf-fixed' },
              { name: 'HF Mobile', img: getDefaultImageUrl('2025/05/HF-Mobile-New-1024x683.jpg'), link: '/products/hf-mobile' },
              { name: '1K*1K High End HF C-ARM', img: getDefaultImageUrl('2025/02/02-1-1024x683.jpg'), link: '/products/1k1k-high-end-hf-c-arm' },
              { name: 'Line Frequency X-Ray Systems', img: getDefaultImageUrl('2025/05/Line-Frequency-New-1024x683.jpg'), link: '/products/line-frequency-x-ray-systems' },
              { name: 'Digital Radiography', img: getDefaultImageUrl('2025/05/Digital-Radiography-New-1024x683.jpg'), link: '/products/digital-radiography' },
              { name: 'Dream Series-Ceiling Suspended', img: getDefaultImageUrl('2025/03/Dream_series-1024x683.jpg'), link: '/products/dream-series-ceiling-suspended' }
            ].map((product, idx) => {
              // Try to find matching product from CMS
              const cmsProduct = productCards.find(card => 
                card.name.toLowerCase() === product.name.toLowerCase() || 
                card.internalLink === product.link
              );
              
              const cardImageUrl = cmsProduct?.cardImage ? getImageUrl(cmsProduct.cardImage) : product.img;
              const bgImageUrl = cmsProduct?.backgroundImage ? getImageUrl(cmsProduct.backgroundImage) : '';
              const linkUrl = cmsProduct?.internalLink || product.link;
              
              return (
                <Link
                  key={idx}
                  to={linkUrl}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  style={bgImageUrl ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={cardImageUrl} />
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-500">{product.name}</h3>
                    <div className="w-12 h-12 bg-[#2879B6] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#1f5f8f] group-hover:shadow-lg cursor-pointer relative overflow-hidden">
                      <i className="ri-arrow-right-line text-white text-xl relative z-10 transition-transform duration-300 group-hover:translate-x-1"></i>
                      <div className="absolute inset-0 bg-[#1f5f8f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hospitals Served Section */}
      <HospitalsServedSection />

      {/* Contact Section */}
      <ContactUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
}
