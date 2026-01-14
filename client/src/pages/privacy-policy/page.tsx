import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { usePrivacyPolicy } from '../../hooks';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PrivacyPolicyPage() {
  const { content, loading } = usePrivacyPolicy();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ED957]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
      </div>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center" data-aos="fade-down">
            {content?.title || 'Privacy Policy'}
          </h1>
          {content?.subtitle && (
            <p className="text-xl text-gray-600 mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
              {content.subtitle}
            </p>
          )}
          <div className="prose prose-lg max-w-none">
            {content?.richTextContent ? (
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.richTextContent }}
                data-aos="fade-up"
              />
            ) : (
              <div className="space-y-6 text-gray-700">
                <p className="text-base leading-relaxed text-gray-500 italic">
                  Content will be managed through the CMS. Please add content using the admin dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

