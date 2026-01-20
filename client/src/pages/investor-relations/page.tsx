import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useInvestorRelations } from '../../hooks';

export default function InvestorRelationsPage() {
  const { content, documents, loading, documentsLoading } = useInvestorRelations();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const getImageUrl = (image: any): string => {
    if (!image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${image.filePath}`;
  };

  const getFileUrl = (file: any): string => {
    if (!file) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${file.filePath}`;
  };

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : 'https://readdy.ai/api/search-image?query=modern%20medical%20professionals%20in%20surgical%20masks%20working%20with%20advanced%20medical%20imaging%20equipment%20in%20a%20state-of-the-art%20hospital%20operating%20room%20with%20blue%20medical%20monitors%20and%20technology%20displays%20in%20the%20background%20professional%20healthcare%20environment&width=1920&height=600&seq=investorhero001&orientation=landscape';

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
        className="relative pt-32 pb-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImageUrl})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl font-medium text-[#7DC244] mb-4" data-aos="fade-down">
            {content?.heroTitle || 'Investor Relations'}
          </h1>
          {content?.heroSubtitle && (
            <p className="text-xl text-white/90" data-aos="fade-up" data-aos-delay="100">{content.heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Intro Text */}
      {content?.introText && (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.introText }} />
            </div>
          </div>
        </section>
      )}

      {/* Documents Section */}
      <section className="py-11 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {documents.length > 0 ? (
            documents.map((doc, idx) => (
              <div 
                key={doc.id}
                className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0 w-full md:w-auto">
                    <div className="flex-shrink-0 transition-transform duration-500 hover:scale-125 hover:rotate-12">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <i className="ri-file-pdf-line text-4xl text-gray-700"></i>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-[#7DC244]">
                        {doc.title}
                      </h3>
                      {doc.description && (
                        <p className="text-gray-600 text-sm mt-2">{doc.description}</p>
                      )}
                    </div>
                  </div>
                  {doc.file && (
                    <div className="w-full md:w-auto flex justify-center md:justify-end">
                      <a
                        href={getFileUrl(doc.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-3 bg-[#2879B6] text-white font-medium rounded hover:bg-[#1f5f8f] transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer"
                      >
                        Preview
                        <i className="ri-external-link-line ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            !documentsLoading && (
              <div className="text-center py-12 text-gray-500">
                <p>No documents available at this time.</p>
              </div>
            )
          )}
        </div>
      </section>
      {/* Contact Section */}
      <ContactUsSection />
      <Footer />
    </div>
  );
}
