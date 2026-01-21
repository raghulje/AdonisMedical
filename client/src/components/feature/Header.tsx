import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigation, NavigationItem } from '../../hooks';
import { getDefaultImageUrl } from '../../utils/imageUrl';

const Header = () => {
  const { items, loading } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});
  const location = useLocation();
  const closeTimeouts = useRef<Record<number, NodeJS.Timeout>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string | null) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleDropdown = (itemId: number) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const openDropdown = (itemId: number) => {
    // Clear any pending close timeout
    if (closeTimeouts.current[itemId]) {
      clearTimeout(closeTimeouts.current[itemId]);
      delete closeTimeouts.current[itemId];
    }
    setOpenDropdowns(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  const closeDropdown = (itemId: number, delay: number = 200) => {
    // Clear any existing timeout
    if (closeTimeouts.current[itemId]) {
      clearTimeout(closeTimeouts.current[itemId]);
    }

    // Set a new timeout to close after delay
    closeTimeouts.current[itemId] = setTimeout(() => {
      setOpenDropdowns(prev => ({
        ...prev,
        [itemId]: false
      }));
      delete closeTimeouts.current[itemId];
    }, delay);
  };

  const cancelCloseDropdown = (itemId: number) => {
    if (closeTimeouts.current[itemId]) {
      clearTimeout(closeTimeouts.current[itemId]);
      delete closeTimeouts.current[itemId];
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(closeTimeouts.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  const renderNavItem = (item: NavigationItem, isMobile: boolean = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.url);
    const isDropdownOpen = openDropdowns[item.id] || false;

    if (isMobile) {
      if (hasChildren) {
        return (
          <div key={item.id} className="space-y-1">
            {item.url ? (
              <div className="flex items-center justify-between py-2">
                <Link
                  to={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className={`flex-1 text-base font-medium transition-colors py-2 ${isItemActive ? 'text-[#7DC244]' : 'text-gray-800 active:text-[#7DC244]'
                    }`}
                >
                  {item.label}
                </Link>
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="ml-3 flex items-center justify-center w-8 h-8 text-gray-600 hover:text-[#7DC244] active:text-[#7DC244] transition-colors rounded-md focus:outline-none"
                  aria-label={isDropdownOpen ? 'Collapse submenu' : 'Expand submenu'}
                >
                  <i className={`ri-arrow-${isDropdownOpen ? 'up' : 'down'}-s-line text-lg`}></i>
                </button>
              </div>
            ) : (
              <button
                onClick={() => toggleDropdown(item.id)}
                className="flex items-center justify-between w-full text-base font-medium text-gray-800 active:text-[#7DC244] transition-colors py-2 focus:outline-none"
                aria-label={isDropdownOpen ? 'Collapse submenu' : 'Expand submenu'}
              >
                <span>{item.label}</span>
                <i className={`ri-arrow-${isDropdownOpen ? 'up' : 'down'}-s-line text-lg`}></i>
              </button>
            )}
            <div className={`pl-3 space-y-1 overflow-hidden transition-all duration-300 ease-in-out border-l-2 border-gray-100 ${
              isDropdownOpen 
                ? 'max-h-96 opacity-100 mt-2' 
                : 'max-h-0 opacity-0'
            }`}>
              {item.children?.map((child) => (
                <Link
                  key={child.id}
                  to={child.url || '#'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  target={child.openInNewTab ? '_blank' : undefined}
                  rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="block text-sm text-gray-600 active:text-[#7DC244] transition-colors py-2 pl-3"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <Link
            key={item.id}
            to={item.url || '#'}
            onClick={() => setIsMobileMenuOpen(false)}
            target={item.openInNewTab ? '_blank' : undefined}
            rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
            className={`block text-base font-medium transition-colors py-2 ${isItemActive ? 'text-[#7DC244]' : 'text-gray-800 active:text-[#7DC244]'
              }`}
          >
            {item.label}
          </Link>
        );
      }
    }

    // Desktop rendering
    if (hasChildren) {
      return (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => openDropdown(item.id)}
          onMouseLeave={() => closeDropdown(item.id, 250)}
        >
          {item.url ? (
            <Link
              to={item.url}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
              className={`flex items-center space-x-1 text-sm font-medium transition-colors whitespace-nowrap pb-1 ${isItemActive || item.children?.some(child => isActive(child.url))
                ? 'text-[#7DC244]'
                : 'text-gray-700 hover:text-[#7DC244]'
                }`}
            >
              <span>{item.label}</span>
              <i className="ri-arrow-down-s-line text-base"></i>
            </Link>
          ) : (
            <button
              className={`flex items-center space-x-1 text-sm font-medium transition-colors whitespace-nowrap pb-1 ${isItemActive || item.children?.some(child => isActive(child.url))
                ? 'text-[#7DC244]'
                : 'text-gray-700 hover:text-[#7DC244]'
                }`}
            >
              <span>{item.label}</span>
              <i className="ri-arrow-down-s-line text-base"></i>
            </button>
          )}
          {(isItemActive || item.children?.some(child => isActive(child.url))) && (
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background: 'linear-gradient(151deg, rgba(40, 121, 182, 1) 0%, rgba(125, 194, 68, 1) 49%, rgba(238, 106, 49, 1) 100%)'
              }}
            ></div>
          )}
          <div
            className={`absolute top-full left-0 mt-3 min-w-72 bg-white shadow-xl rounded-md py-2 z-50 border border-gray-100 transition-all duration-300 ease-in-out ${
              isDropdownOpen 
                ? 'opacity-100 visible translate-y-0' 
                : 'opacity-0 invisible -translate-y-2 pointer-events-none'
            }`}
            onMouseEnter={() => cancelCloseDropdown(item.id)}
            onMouseLeave={() => closeDropdown(item.id, 250)}
          >
              {item.children?.map((child) => (
                <Link
                  key={child.id}
                  to={child.url || '#'}
                  target={child.openInNewTab ? '_blank' : undefined}
                  rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#7DC244] transition-colors"
                  title={child.label}
                >
                  <span className="block break-words">{child.label}</span>
                </Link>
              ))}
          </div>
        </div>
      );
    } else {
      return (
        <div key={item.id} className="relative">
          <Link
            to={item.url || '#'}
            target={item.openInNewTab ? '_blank' : undefined}
            rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
            className={`text-sm font-medium transition-colors whitespace-nowrap pb-1 block ${isItemActive ? 'text-[#7DC244]' : 'text-gray-700 hover:text-[#7DC244]'
              }`}
          >
            {item.label}
          </Link>
          {isItemActive && (
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background: 'linear-gradient(151deg, rgba(40, 121, 182, 1) 0%, rgba(125, 194, 68, 1) 49%, rgba(238, 106, 49, 1) 100%)'
              }}
            ></div>
          )}
        </div>
      );
    }
  };

  if (loading) {
    // Show basic header structure while loading
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 overflow-x-hidden overflow-y-hidden">
        <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between py-2.5 sm:py-3 md:py-4 min-w-0">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={getDefaultImageUrl('2024/09/logo_adonis_4x-1.svg')}
                alt="Adonis Medical Systems"
                className="h-9 sm:h-10 md:h-12 w-auto max-w-[140px] sm:max-w-none"
              />
            </Link>
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 ml-2"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
    >
      <div className="w-full lg:max-w-7xl lg:mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between py-2.5 sm:py-3 md:py-4 min-w-0">
          {/* Logo */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={getDefaultImageUrl('2024/09/logo_adonis_4x-1.svg')}
                alt="Adonis Medical Systems"
                className="h-9 sm:h-10 md:h-12 w-auto max-w-[140px] sm:max-w-none"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0" style={{ position: 'relative', zIndex: 50 }}>
            {items.map((item) => renderNavItem(item, false))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <Link
              to="/request-demo"
              className="inline-flex items-center justify-center py-[0.425rem] px-[0.5rem] bg-[#F7FFF2] border-2 border-[#7DC244] text-[#7DC244] rounded-lg hover:bg-[#7DC244]/10 transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
            >
              Request Demo
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center py-[0.425rem] px-[0.5rem] bg-[#7DC244] border-2 border-transparent text-white rounded-lg hover:bg-[#6BC04A] transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-xl sm:text-2xl text-gray-800 hover:text-[#7DC244] active:text-[#7DC244] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7DC244] focus:ring-offset-1 rounded-md flex-shrink-0 ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl border-t border-gray-200 mt-0 py-3 sm:py-4 px-3 sm:px-4 mb-0 max-h-[calc(100vh-70px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              {items.map((item) => renderNavItem(item, true))}
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                <Link
                  to="/request-demo"
                  className="inline-flex items-center justify-center py-3 px-4 bg-[#F7FFF2] border-2 border-[#7DC244] text-[#7DC244] rounded-lg hover:bg-[#7DC244]/10 active:bg-[#7DC244]/20 transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request Demo
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center py-3 px-4 bg-[#7DC244] border-2 border-transparent text-white rounded-lg hover:bg-[#6BC04A] active:bg-[#5AA03A] transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
