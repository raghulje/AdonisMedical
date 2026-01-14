import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactUsSection from '../../components/reusable/ContactUsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCareers } from '../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../utils/imageUrl';

export default function CareersPage() {
  const { content, jobs, loading, jobsLoading } = useCareers();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const heroImageUrl = content?.heroImage ? getImageUrl(content.heroImage) : getDefaultImageUrl('2024/10/image-51-2-1.jpg');
  const introImageUrl = content?.introImage ? getImageUrl(content.introImage) : getDefaultImageUrl('elementor/thumbs/carrer-img-r2avejplb0pkwcgxj99aock57lyrri8v03bloxlctc.jpeg');
  const lifeAtAdonisBackgroundImageUrl = content?.lifeAtAdonisBackgroundImage ? getImageUrl(content.lifeAtAdonisBackgroundImage) : null;
  const lifeAtAdonisImageUrl = content?.lifeAtAdonisImage ? getImageUrl(content.lifeAtAdonisImage) : getDefaultImageUrl('2025/03/team-collage02.png');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9ACD32]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <Header />
      </div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-start bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-[#9ACD32] mb-4" data-aos="fade-down">
            {content?.heroTitle || 'Careers'}
          </h1>
          {content?.heroSubtitle && (
            <p className="text-xl text-white" data-aos="fade-up" data-aos-delay="100">{content.heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full h-[400px]" data-aos="fade-right">
              <img 
                alt={content?.introImage?.altText || 'Career'} 
                className="w-full h-full object-cover rounded-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl" 
                src={introImageUrl}
              />
            </div>
            <div className="space-y-6" data-aos="fade-left" data-aos-delay="100">
              {content?.introText && (
                <div className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.introText }} />
              )}
              <a 
                href="#openings" 
                className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-6 py-3 rounded hover:bg-[#0052A3] transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer"
              >
                <span>View All Openings</span>
                <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      {jobs.length > 0 && (
        <section id="openings" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#9ACD32] mb-12" data-aos="fade-down">Current Openings</h2>
            <div className="space-y-6">
              {jobs.map((job, idx) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {job.department && <span className="flex items-center gap-2"><i className="ri-building-line"></i> {job.department}</span>}
                        {job.location && <span className="flex items-center gap-2"><i className="ri-map-pin-line"></i> {job.location}</span>}
                        {job.employmentType && <span className="flex items-center gap-2"><i className="ri-briefcase-line"></i> {job.employmentType}</span>}
                        {job.postedDate && <span className="flex items-center gap-2"><i className="ri-calendar-line"></i> {new Date(job.postedDate).toLocaleDateString()}</span>}
                      </div>
                      {job.description && (
                        <div className="mt-4 text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: job.description.substring(0, 200) + '...' }} />
                      )}
                    </div>
                    <div className="flex gap-3">
                      <a 
                        href={`/contact-us?subject=Job Application: ${job.title}`}
                        className="px-6 py-2 bg-[#0066CC] text-white rounded-md hover:bg-[#0052A3] transition-all duration-300 whitespace-nowrap cursor-pointer"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Life at Adonis Medical Section */}
      {content?.lifeAtAdonisTitle && (
        <section 
          className="py-20 relative"
          style={{
            backgroundImage: lifeAtAdonisBackgroundImageUrl ? `url(${lifeAtAdonisBackgroundImageUrl})` : undefined,
            backgroundColor: lifeAtAdonisBackgroundImageUrl ? undefined : '#F5F5F5',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {lifeAtAdonisBackgroundImageUrl && (
            <div className="absolute inset-0 bg-black/20"></div>
          )}
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#9ACD32] mb-12" data-aos="fade-down">
              {content.lifeAtAdonisTitle}
            </h2>
            {content.lifeAtAdonisContent && (
              <div className="text-center mb-8" data-aos="fade-up">
                <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: content.lifeAtAdonisContent }} />
              </div>
            )}
            <div className="w-full" data-aos="zoom-in" data-aos-delay="100">
              <img 
                alt={content.lifeAtAdonisImage?.altText || 'Life at Adonis Medical'} 
                className="w-full h-auto rounded-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl" 
                src={lifeAtAdonisImageUrl}
              />
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <ContactUsSection />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <a href="/request-demo" className="py-4 text-center bg-white hover:bg-gray-50 transition-all duration-300 active:scale-95 cursor-pointer">
            <span className="text-gray-800 font-medium whitespace-nowrap">Request Demo</span>
          </a>
          <a href="/contact-us" className="py-4 text-center bg-[#9ACD32] hover:bg-[#8BC020] transition-all duration-300 active:scale-95 cursor-pointer">
            <span className="text-white font-medium whitespace-nowrap">Contact Us</span>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
