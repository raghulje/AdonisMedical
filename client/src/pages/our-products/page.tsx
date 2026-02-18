import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getDefaultImageUrl, getImageUrl } from '../../utils/imageUrl';
import { useOurProductsPage } from '../../hooks';
import SEO from '../../components/seo/SEO';
import { getSEOConfig } from '../../utils/seoConfig';
import ProductCard from '../../components/product/ProductCard';

export default function OurProductsPage() {
  const { content, items, loading } = useOurProductsPage();
  const seoConfig = getSEOConfig('/our-products');

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : getDefaultImageUrl('2024/09/hospital-hallway-with-people-walking-down-it-1-1.jpg');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DC244]"></div>
      </div>
    );
  }

  return (
    <>
      <SEO {...seoConfig} />
      <div className="min-h-screen bg-white">
        <div className="pt-20">
          <Header />
        </div>

        {/* Hero Section */}
        <section
          className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/25"></div>
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-medium text-[#7DC244] mb-4" data-aos="fade-down">
              {content?.heroTitle || 'Our Products'}
            </h1>
            {content?.heroSubtitle && (
              <p className="text-xl md:text-2xl text-white/90" data-aos="fade-up" data-aos-delay="100">
                {content.heroSubtitle}
              </p>
            )}
          </div>
        </section>

        {/* Our Products Section */}
        <section
          className="py-11"
          style={{
            backgroundImage: content?.sectionBackgroundImage ? `url(${getImageUrl(content.sectionBackgroundImage)})` : 'linear-gradient(to bottom, #F5F5DC, white)',
            backgroundSize: content?.sectionBackgroundImage ? 'cover' : 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-medium text-[#7DC244] text-center mb-12" data-aos="fade-up">Our Products</h2>
            {content?.sectionIntro && (
              <p className="text-lg text-gray-700 max-w-5xl mx-auto mb-10 text-center" data-aos="fade-up" data-aos-delay="50">
                {content.sectionIntro}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-8">
              {items.length > 0 ? (
                items.map((product, idx) => (
                  <div key={product.id} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                    <ProductCard
                      name={product.name}
                      image={product.productImage ? getImageUrl(product.productImage) : ''}
                      link={product.internalLink || '#'}
                      index={idx}
                      backgroundImage={product.backgroundImage ? getImageUrl(product.backgroundImage) : ''}
                    />
                  </div>
                ))
              ) : (
                // Fallback to default products if no CMS data
                [
                  { name: 'HF Mobile', img: getDefaultImageUrl('2025/05/HF-Mobile-New.jpg'), link: '/products/hf-mobile' },
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


        {/* Contact Section */}
        <ContactUsSection />
        <Footer />
      </div>
    </>
  );
}

