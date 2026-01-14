import { Link } from 'react-router-dom';
import { useHomeStats, useHomeAbout } from '../../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

const AboutSection = () => {
  const { stats, loading: statsLoading, error: statsError } = useHomeStats();
  const { about, loading: aboutLoading, error: aboutError } = useHomeAbout();

  const loading = statsLoading || aboutLoading;
  const error = statsError || aboutError;

  // Background gradient image
  const backgroundImageUrl = 'https://www.adonismedical.com/wp-content/uploads/2024/09/Group-4.jpg';

  return (
    <section 
      className="py-20 relative"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 via-transparent to-beige-50/30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* About Section Container with rounded top corners and gradient background */}
        <div 
          className="rounded-t-3xl p-8 lg:p-12"
          style={{
            background: 'linear-gradient(to right, rgba(240, 253, 244, 0.9), rgba(255, 247, 237, 0.9))'
          }}
        >
          {/* Title and Subtitle */}
          {about?.title && (
            <div className="mb-4" data-aos="fade-in" data-aos-delay="50">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{about.title}</h2>
            </div>
          )}
          {about?.subtitle && (
            <div className="mb-6" data-aos="fade-in" data-aos-delay="75">
              <p className="text-xl text-gray-700">{about.subtitle}</p>
            </div>
          )}

          {/* Paragraphs */}
          {about?.paragraphs && about.paragraphs.length > 0 ? (
            <div className="mb-8 space-y-4" data-aos="fade-in" data-aos-delay="100">
              {about.paragraphs.map((paragraph, index) => (
                <p key={paragraph.id} className="text-lg text-gray-800 leading-relaxed font-sans">
                  {paragraph.content}
                </p>
              ))}
            </div>
          ) : (
            /* Fallback to intro_text if no paragraphs */
            about?.introText && (
              <div className="mb-8" data-aos="fade-in" data-aos-delay="100">
                <p className="text-lg text-gray-800 leading-relaxed font-sans">
                  {about.introText}
                </p>
              </div>
            )
          )}

          {/* Bottom - Image and Stats Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-8">
            {/* Left Side - Image */}
            <div data-aos="fade-up">
              <img
                src={about?.mainImage ? getImageUrl(about.mainImage) : getDefaultImageUrl('2024/09/Frame-97-3-1.jpg')}
                alt={about?.mainImage?.altText || 'Adonis Medical System'}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right Side - Statistics */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 items-center" data-aos="fade-up">
              {statsLoading ? (
                <div className="col-span-2 flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
                </div>
              ) : statsError ? (
                <div className="col-span-2 text-red-600 text-center p-4">
                  <p>Failed to load statistics. Please try again later.</p>
                </div>
              ) : (
                <>
                  {stats.slice(0, 4).map((stat, index) => {
                    return (
                      <div 
                        key={stat.id}
                        className="space-y-2"
                        data-aos="fade-up" 
                        data-aos-delay={100 + (index * 100)}
                      >
                        {/* Stat Item with Icon/Image, Number, and Label */}
                        <div className="flex items-start gap-3">
                          {/* Icon or Image - Orange colored, far left */}
                          <div className="text-[#FF6B35] flex-shrink-0">
                            {stat.image && stat.image.filePath ? (
                              <img 
                                src={getImageUrl(stat.image)} 
                                alt={stat.image.altText || stat.label} 
                                className="h-8 w-8 object-contain"
                              />
                            ) : (
                              <i className={`${stat.iconClass || 'ri-bar-chart-line'} text-2xl`}></i>
                            )}
                          </div>
                          {/* Number and Label - Stacked vertically */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-1">{stat.number}</h3>
                            <p className="text-base text-gray-800 font-normal leading-tight">{stat.label}</p>
                          </div>
                        </div>
                        {/* Gradient Line - Below number/label, left-aligned with text, 70-80% width */}
                        <div className="pl-11">
                          <div 
                            className="h-1 rounded-full"
                            style={{ 
                              width: '75%',
                              background: 'linear-gradient(151deg, rgba(125, 194, 68, 1) 0%, rgba(238, 106, 49, 1) 100%)'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* Bottom - More About Us Button */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="500">
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#0066CC] text-white text-sm font-medium rounded-md hover:bg-[#0052A3] transition-all duration-300 hover:shadow-lg"
            >
              More About Us
              <i className="ri-arrow-right-up-line ml-2 text-base"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


