import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useClients, useClientsPage } from '../../hooks';
import { getDefaultImageUrl, getImageUrl } from '../../utils/imageUrl';

export default function ClientsPage() {
  const { clients, loading, error } = useClients();
  const { content: pageContent, loading: contentLoading } = useClientsPage();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Fallback placeholder image - only used when image fails to load (server error)
  const placeholderImage = getDefaultImageUrl('2025/03/logo01.jpg');

  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <Header />
      </div>
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${
            pageContent?.heroImage 
              ? getImageUrl(pageContent.heroImage) 
              : getDefaultImageUrl('2024/10/image-51-2-1.jpg')
          })`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <h1 className="text-5xl md:text-6xl font-medium text-white mb-4" style={{ color: '#7DC244' }} data-aos="fade-down">
            {pageContent?.heroTitle || 'Clients'}
          </h1>
          {pageContent?.heroSubtitle && (
            <p className="text-xl text-white font-light" data-aos="fade-up" data-aos-delay="100">
              {pageContent.heroSubtitle}
            </p>
          )}
        </div>
      </div>

      {/* Clients Grid Section */}
      <div className="py-11" style={{ backgroundColor: '#cccccc' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7DC244]"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center p-8 bg-red-50 rounded-lg">
              <i className="ri-error-warning-line text-4xl mb-4"></i>
              <p className="text-lg">Failed to load clients. Please try again later.</p>
            </div>
          ) : clients.filter(client => client.isActive).length === 0 ? (
            <div className="text-gray-500 text-center p-8">
              <p className="text-lg">No active clients found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {clients.filter(client => client.isActive).map((client, index) => {
                // Only show clients that have logos OR allow showing placeholder if logo fails
                const imageUrl = client.logo ? getImageUrl(client.logo) : null;
                
                return (
                  <div
                    key={client.id}
                    className="bg-white border border-gray-300 p-0 flex items-center justify-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 aspect-[3/2]"
                    data-aos="zoom-in"
                    data-aos-delay={index * 30}
                    title={client.name}
                  >
                    {client.websiteUrl ? (
                      <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={client.name}
                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                            loading={index < 10 ? 'eager' : 'lazy'}
                            onError={(e) => {
                              // Only fallback if image fails to load (server error)
                              const target = e.target as HTMLImageElement;
                              if (target.src !== placeholderImage) {
                                target.src = placeholderImage;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <i className="ri-image-line text-4xl"></i>
                          </div>
                        )}
                      </a>
                    ) : (
                      <>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={client.name}
                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                            loading={index < 10 ? 'eager' : 'lazy'}
                            onError={(e) => {
                              // Only fallback if image fails to load (server error)
                              const target = e.target as HTMLImageElement;
                              if (target.src !== placeholderImage) {
                                target.src = placeholderImage;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <i className="ri-image-line text-4xl"></i>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
