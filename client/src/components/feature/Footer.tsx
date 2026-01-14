import { Link } from 'react-router-dom';
import { useFooter, useSocialLinks, useFooterLogos } from '../../hooks';
import { getDefaultImageUrl, getImageUrl } from '../../utils/imageUrl';

const Footer = () => {
  const { sections, loading: footerLoading } = useFooter();
  const { links: socialLinks, loading: socialLoading } = useSocialLinks();
  const { logos, loading: logosLoading } = useFooterLogos();

  const isLoading = footerLoading || socialLoading || logosLoading;

  if (isLoading) {
    return (
      <footer className="bg-[#F5F5F5] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-32"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  // Helper function to render links
  const renderLink = (linkUrl: string, label: string) => {
    // Check if it's an external URL
    if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('//')) {
      return (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors"
        >
          {label}
        </a>
      );
    }
    // Internal route
    return (
      <Link to={linkUrl} className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors">
        {label}
      </Link>
    );
  };

  // Get icon class for social platform
  const getSocialIcon = (platform: string, iconClass: string | null) => {
    if (iconClass) return iconClass;
    
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('facebook')) return 'ri-facebook-fill';
    if (platformLower.includes('twitter') || platformLower.includes('x.com')) return 'ri-twitter-fill';
    if (platformLower.includes('linkedin')) return 'ri-linkedin-fill';
    if (platformLower.includes('instagram')) return 'ri-instagram-line';
    if (platformLower.includes('youtube')) return 'ri-youtube-fill';
    return 'ri-link';
  };

  return (
    <footer className="bg-[#F5F5F5] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Social */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              {logos.length > 0 ? (
                logos.map((logo) => (
                  <Link key={logo.id} to="/">
                    {logo.logoImage ? (
                      <img
                        src={getImageUrl(logo.logoImage)}
                        alt={logo.logoImage.altText || `${logo.name} logo`}
                        className="h-12 w-auto"
                      />
                    ) : (
                      <img
                        src={getDefaultImageUrl('2024/09/logo_adonis_4x-1-1.svg')}
                        alt={`${logo.name} logo`}
                        className="h-12 w-auto"
                      />
                    )}
                  </Link>
                ))
              ) : (
                <Link to="/">
                  <img
                    src={getDefaultImageUrl('2024/09/logo_adonis_4x-1-1.svg')}
                    alt="Adonis Medical Systems"
                    className="h-12 w-auto"
                  />
                </Link>
              )}
            </div>
            {socialLinks.length > 0 && (
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center text-white hover:bg-[#e55a2a] transition-colors"
                    aria-label={social.platform}
                  >
                    <i className={`${getSocialIcon(social.platform, social.iconClass)} text-lg`}></i>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map((section) => {
            const isContactSection = section.title.toLowerCase() === 'contact information';
            
            return (
              <div key={section.id}>
                <h5 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h5>
                {section.links && section.links.length > 0 && (
                  <>
                    {isContactSection ? (
                      // Contact Information section with icons
                      <div className="space-y-4">
                        {section.links.map((link) => (
                          <div key={link.id} className="flex items-start space-x-3">
                            {link.iconImage ? (
                              <img 
                                src={getImageUrl(link.iconImage)} 
                                alt={link.iconImage.altText || link.label}
                                className="w-8 h-8 mt-1 flex-shrink-0 object-contain"
                              />
                            ) : link.iconSvg ? (
                              <div className="text-[#FF6B35] text-2xl mt-1 flex-shrink-0" dangerouslySetInnerHTML={{ __html: link.iconSvg }} />
                            ) : null}
                            <div className="flex-1">
                              <h6 className="text-sm font-semibold text-gray-900 mb-1">{link.label}</h6>
                              {link.url ? (
                                link.url.startsWith('tel:') || link.url.startsWith('mailto:') ? (
                                  <a
                                    href={link.url}
                                    className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors break-all"
                                  >
                                    {link.url.replace(/^(tel:|mailto:)/, '')}
                                  </a>
                                ) : link.url.startsWith('http://') || link.url.startsWith('https://') ? (
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors break-all"
                                  >
                                    {link.url}
                                  </a>
                                ) : (
                                  <p className="text-sm text-gray-600 whitespace-pre-line">{link.url}</p>
                                )
                              ) : (
                                <p className="text-sm text-gray-400">Not available</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Regular footer links as a list
                      <ul className="space-y-2">
                        {section.links.map((link) => (
                          <li key={link.id} className="flex items-center space-x-2">
                            {link.iconSvg && (
                              <div className="text-[#FF6B35] flex-shrink-0" dangerouslySetInnerHTML={{ __html: link.iconSvg }} />
                            )}
                            <div className="flex-1">
                              {renderLink(link.url, link.label)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6">
          <p className="text-sm text-gray-600 text-center">
            © Worldwide Copyright Reserved. ADONIS MEDICAL SYSTEMS PVT LTD
          </p>
        </div>
      </div>

      {/* Readdy Link */}
      {/* <div className="text-center mt-4">
        <a
          href="https://readdy.ai/?ref=logo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-[#FF6B35] transition-colors"
        >
          Powered by Readdy
        </a>
      </div> */}
    </footer>
  );
};

export default Footer;
