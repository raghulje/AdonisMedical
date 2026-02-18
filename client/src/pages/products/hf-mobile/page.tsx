import { useEffect } from 'react';
import Header from '../../../components/feature/Header';
import Footer from '../../../components/feature/Footer';
import ContactUsSection from '../../../components/reusable/ContactUsSection';
import TestimonialsSection from '../../home/components/TestimonialsSection';
import ProductImageCarousel from '../../../components/product/ProductImageCarousel';
import HospitalsServedSection from '../../../components/product/HospitalsServedSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProduct, useHomeProducts } from '../../../hooks';
import { getProductApiSlug } from '../../../utils/productSlugs';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';
import { Link } from 'react-router-dom';
import SEO from '../../../components/seo/SEO';
import { getSEOConfig, getProductStructuredData } from '../../../utils/seoConfig';
import ProductCard from '../../../components/product/ProductCard';

export default function HFMobilePage() {
  const { content, images, features, variants, loading, error } = useProduct(getProductApiSlug('hf-mobile'));
  const { cards: productCards } = useHomeProducts();

  // Get primary image or first image
  const mainImage = images.find(img => img.isPrimary) || images[0];
  const mainImageUrl = mainImage?.image ? getImageUrl(mainImage.image) : getDefaultImageUrl('2025/05/HF-Mobile-New.jpg');
  const allImages = images.length > 0 ? images.map(img => img.image ? getImageUrl(img.image) : '').filter(Boolean) : [mainImageUrl];

  const productName = content?.title || 'HF Mobile X-Ray System';
  const productDescription = content?.description || 'Versatile, portable medical imaging solution designed for hospitals and clinics. High-frequency technology with exceptional image quality and mobility.';
  const seoConfig = getSEOConfig('/products/hf-mobile');
  const productImage = mainImageUrl;

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DC244]"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        {...seoConfig}
        image={productImage}
        description={productDescription}
        structuredData={getProductStructuredData(productName, productDescription, productImage)}
      />
      <div className="pt-20">
        <Header />

        {/* Product Details Section */}
        <section className="py-11 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Title */}
            <div className="mb-12 text-center" data-aos="fade-down">
              <h1 className="text-5xl font-medium text-[#7DC244]">
                {content?.title || 'HF Mobile'}
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6" data-aos="fade-right">
                <ProductImageCarousel
                  images={allImages}
                  altText={mainImage?.image?.altText || content?.title || 'HF Mobile Product'}
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
                  <p className="text-gray-700 text-lg leading-relaxed">
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

        {/* Additional Images Gallery */}
        {images.length > 1 && (
          <section className="py-11 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <h2 className="text-3xl font-medium text-gray-800 text-center mb-12" data-aos="fade-up">
                Product Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, idx) => (
                  <div key={img.id} className="bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100" data-aos="zoom-in" data-aos-delay={idx * 100}>
                    <img
                      src={img.image ? getImageUrl(img.image) : mainImageUrl}
                      alt={img.image?.altText || `${content?.title || 'Product'} Image ${idx + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Our Products Section */}
        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-medium text-[#7DC244] text-center mb-12" data-aos="fade-up">Our Products</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {productCards.length > 0 ? (
                productCards
                  .filter(card => card.name !== 'HF Mobile')
                  .map((product, idx) => (
                    <div key={product.id} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                      <ProductCard
                        name={product.name}
                        image={product.cardImage ? getImageUrl(product.cardImage) : ''}
                        link={product.internalLink || '#'}
                        index={idx}
                        backgroundImage={product.backgroundImage ? getImageUrl(product.backgroundImage) : ''}
                      />
                    </div>
                  ))
              ) : (
                [
                  { name: 'HF Fixed', img: getDefaultImageUrl('2025/03/04.jpg'), link: '/products/hf-fixed' },
                  { name: '0.5K High End HF C-ARM', img: getDefaultImageUrl('2025/02/02-1.jpg'), link: '/products/1k1k-high-end-hf-c-arm' },
                  { name: 'Line Frequency X-Ray Systems', img: getDefaultImageUrl('2025/05/Line-Frequency-New.jpg'), link: '/products/line-frequency-x-ray-systems' },
                  { name: 'Digital Radiography', img: getDefaultImageUrl('2025/05/Digital-Radiography-New.jpg'), link: '/products/digital-radiography' },
                  { name: 'Dream Series-Ceiling Suspended', img: getDefaultImageUrl('2025/03/Dream_series.jpg'), link: '/products/dream-series-ceiling-suspended' },
                  { name: 'FPD-C-Arm', img: getDefaultImageUrl('2025/02/ADN0321-copy-2.jpg'), link: '/products/fpd-c-arm' }
                ].map((product, idx) => (
                  <div key={idx} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                    <ProductCard
                      name={product.name}
                      image={product.img}
                      link={product.link}
                      index={idx}
                    />
                  </div>
                ))
              )}
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
    </>
  );
}
