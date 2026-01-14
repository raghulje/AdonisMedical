import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import { useLeaders } from '../../hooks';
import { getDefaultImageUrl, getImageUrl } from '../../utils/imageUrl';

export default function ManagementPage() {
  const { leaders, loading, error } = useLeaders();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback images if no image is uploaded
  const fallbackImages = [
    getDefaultImageUrl('2024/09/Frame-299.png'),
    getDefaultImageUrl('2024/09/Frame-299-1.png'),
    getDefaultImageUrl('2025/02/manmohan-singh.png'),
    getDefaultImageUrl('2025/02/shubham-mittal.png'),
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
      </div>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${getDefaultImageUrl('2024/09/image-53-1.jpg')})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        <div className="relative z-10 text-center px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" data-aos="fade-down">Management</h1>
          <p className="text-xl md:text-2xl text-white/90" data-aos="fade-up" data-aos-delay="200">Our Leaders</p>
        </div>
      </section>

      {/* Management Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7CB342]"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center p-8 bg-red-50 rounded-lg">
              <i className="ri-error-warning-line text-4xl mb-4"></i>
              <p className="text-lg">Failed to load management team. Please try again later.</p>
            </div>
          ) : leaders.length === 0 ? (
            <div className="text-gray-500 text-center p-8">
              <p className="text-lg">No leaders found.</p>
            </div>
          ) : (
            leaders.map((leader, index) => (
              <div key={leader.id} className="mb-20 last:mb-0" data-aos="fade-up">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex-shrink-0" data-aos="zoom-in" data-aos-delay="100">
                      <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 hover:scale-110 transition-transform duration-300">
                        <img 
                          alt={leader.fullName} 
                          className="w-full h-full object-cover" 
                          src={leader.image ? getImageUrl(leader.image) : fallbackImages[index % fallbackImages.length]}
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center" data-aos="fade-left" data-aos-delay="200">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {leader.fullName.toUpperCase()}
                      </h2>
                      <p className="text-lg text-gray-700 font-medium mb-1">{leader.position}</p>
                      {leader.department && (
                        <p className="text-base text-[#7CB342] font-medium">{leader.department}</p>
                      )}
                      {leader.email && (
                        <p className="text-sm text-gray-600 mt-2">
                          <i className="ri-mail-line mr-2"></i>
                          <a href={`mailto:${leader.email}`} className="hover:text-[#7CB342] transition-colors">
                            {leader.email}
                          </a>
                        </p>
                      )}
                      {leader.linkedinUrl && (
                        <p className="text-sm text-gray-600 mt-1">
                          <i className="ri-linkedin-box-fill mr-2"></i>
                          <a 
                            href={leader.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-[#7CB342] transition-colors"
                          >
                            LinkedIn Profile
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  {leader.bio && (
                    <div 
                      className="space-y-4 text-gray-700 leading-relaxed" 
                      data-aos="fade-up" 
                      data-aos-delay="300"
                      dangerouslySetInnerHTML={{ __html: leader.bio.replace(/\n/g, '<br/>') }}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* Contact Section */}
      <ContactUsSection />
      <Footer />
    </div>
  );
}
