import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getDefaultImageUrl, getImageUrl } from '../../utils/imageUrl';
import { useOurProductsPage } from '../../hooks';

export default function OurProductsPage() {
  const { content, loading } = useOurProductsPage();

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
          <h1 className="text-5xl md:text-6xl font-medium text-white mb-4" data-aos="fade-down">
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
      <section className="py-11 bg-gradient-to-b from-[#F5F5DC] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-medium text-[#7DC244] text-center mb-12" data-aos="fade-up">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'HF Mobile', img: getDefaultImageUrl('2025/05/HF-Mobile-New.jpg'), link: '/products/hf-mobile' },
              { name: 'HF Fixed', img: getDefaultImageUrl('2025/03/04.jpg'), link: '/products/hf-fixed' },
              { name: '0.5K High End HF C-ARM', img: getDefaultImageUrl('2025/02/02-1.jpg'), link: '/products/1k1k-high-end-hf-c-arm' },
              { name: 'Line Frequency X-Ray Systems', img: getDefaultImageUrl('2025/05/Line-Frequency-New.jpg'), link: '/products/line-frequency-x-ray-systems' },
              { name: 'Digital Radiography', img: getDefaultImageUrl('2025/05/Digital-Radiography-New.jpg'), link: '/products/digital-radiography' },
              { name: 'Dream Series-Ceiling Suspended', img: getDefaultImageUrl('2025/03/Dream_series.jpg'), link: '/products/dream-series-ceiling-suspended' },
              { name: 'FPD-C-Arm', img: getDefaultImageUrl('2025/02/ADN0321-copy-2.jpg'), link: '/products/fpd-c-arm' }
            ].map((product, idx) => (
              <Link
                key={idx}
                to={product.link}
                className="bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer block"
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={product.img}
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <div className="w-10 h-10 bg-[#2879B6] text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#1f5f8f] group-hover:shadow-lg cursor-pointer relative overflow-hidden">
                    <i className="ri-arrow-right-line text-xl relative z-10 transition-transform duration-300 group-hover:translate-x-1"></i>
                    <div className="absolute inset-0 bg-[#1f5f8f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactUsSection />
      <Footer />
    </div>
  );
}

