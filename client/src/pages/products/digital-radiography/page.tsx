import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { api } from '../../../utils/api';
import SEO from '../../../components/seo/SEO';
import { getSEOConfig, getProductStructuredData } from '../../../utils/seoConfig';
import ProductCard from '../../../components/product/ProductCard';

interface Highlight {
  id: number;
  subtitle: string;
  description: string;
  orderIndex: number;
}

export default function DigitalRadiographyPage() {
  const navigate = useNavigate();
  const { content, images, features, variants, loading, error } = useProduct(getProductApiSlug('digital-radiography'));
  const { cards: productCards } = useHomeProducts();
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await api.get<Highlight[]>('/products/digital-radiography/highlights');
        if (response.success && response.data) {
          setHighlights((response.data as Highlight[]).sort((a, b) => a.orderIndex - b.orderIndex));
        }
      } catch (err) {
        console.error('Error fetching highlights:', err);
      }
    };
    fetchHighlights();
  }, []);

  const mainImage = images.find(img => img.isPrimary) || images[0];
  const mainImageUrl = mainImage?.image ? getImageUrl(mainImage.image) : getDefaultImageUrl('2025/05/Digital-Radiography-New.jpg');
  const allImages = images.length > 0 ? images.map(img => img.image ? getImageUrl(img.image) : '').filter(Boolean) : [mainImageUrl];

  const productName = content?.title || 'Digital Radiography Systems';
  const productDescription = content?.description || 'Advanced digital radiography systems by Adonis Medical Systems. High-resolution imaging, fast workflow, and cutting-edge technology for modern healthcare facilities.';
  const seoConfig = getSEOConfig('/products/digital-radiography');

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DC244]"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        {...seoConfig}
        image={mainImageUrl}
        description={productDescription}
        structuredData={getProductStructuredData(productName, productDescription, mainImageUrl)}
      />
      <div className="pt-20">
        <Header />

        {/* Product Details Section */}
        <section className="py-11 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-12 text-center" data-aos="fade-down">
              <h1 className="text-5xl font-medium text-[#7DC244]">
                {content?.title || 'Digital Radiography'}
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6" data-aos="fade-right">
                <ProductImageCarousel
                  images={allImages}
                  altText={mainImage?.image?.altText || content?.title || 'Digital Radiography'}
                />
                {content?.deploymentInfo && (
                  <div className="text-center">
                    <span className="inline-block bg-[#F2F9EC] text-[#7DC244] px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      {content.deploymentInfo}
                    </span>
                  </div>
                )}

                {/* Featured Highlights */}
                {highlights.length > 0 && (
                  <div className="space-y-4 mt-6">
                    {highlights.map((highlight, idx) => (
                      <div key={highlight.id} className="flex items-start gap-3" data-aos="fade-up" data-aos-delay={idx * 100}>
                        <span className="text-[#3e6da3] text-xl font-black transition-transform duration-300 hover:scale-125 flex-shrink-0 leading-tight">•</span>
                        <div className="flex-1 space-y-2">
                          <h4 className="text-lg font-bold text-gray-800">{highlight.subtitle}</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">{highlight.description}</p>
                        </div>
                      </div>
                    ))}
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
                        <span className="text-[#3e6da3] text-xl font-black transition-transform duration-300 hover:scale-125 flex-shrink-0 leading-tight">•</span>
                        <div className="flex-1">
                          {feature.subtitle && (
                            <span className="font-bold text-gray-800 block mb-1">{feature.subtitle}</span>
                          )}
                          <span className="leading-relaxed block">{feature.featureText}</span>
                        </div>
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
                  <button
                    onClick={() => navigate('/contact-us')}
                    className="px-8 py-3 bg-[#2879B6] text-white font-semibold rounded-md hover:bg-[#1f5f8f] transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Products Section */}
        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-medium text-center mb-12 text-[#7DC244]" data-aos="fade-up">Our Products</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {productCards.length > 0 ? (
                productCards
                  .filter(card => card.name !== 'Digital Radiography')
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
                relatedProducts.map((product, idx) => (
                  <div key={idx} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                    <ProductCard
                      name={product.name}
                      image={product.image}
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
