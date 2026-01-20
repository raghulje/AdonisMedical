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
          <div key={item.id} className="space-y-2">
            {item.url ? (
              <div className="flex items-center justify-between">
                <Link
                  to={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className={`flex-1 text-sm font-medium whitespace-nowrap transition-colors ${isItemActive ? 'text-[#7DC244]' : 'text-gray-800 hover:text-[#7DC244]'
                    }`}
                >
                  {item.label}
                </Link>
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="ml-2 text-gray-600 hover:text-[#7DC244] transition-colors"
                >
                  <i className={`ri-arrow-${isDropdownOpen ? 'up' : 'down'}-s-line`}></i>
                </button>
              </div>
            ) : (
              <button
                onClick={() => toggleDropdown(item.id)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-800 hover:text-[#7DC244] transition-colors whitespace-nowrap"
              >
                <span>{item.label}</span>
                <i className={`ri-arrow-${isDropdownOpen ? 'up' : 'down'}-s-line`}></i>
              </button>
            )}
            <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
              isDropdownOpen 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}>
              {item.children?.map((child) => (
                <Link
                  key={child.id}
                  to={child.url || '#'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  target={child.openInNewTab ? '_blank' : undefined}
                  rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="block text-sm text-gray-600 hover:text-[#7DC244] transition-colors whitespace-nowrap"
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
            className={`text-sm font-medium whitespace-nowrap transition-colors ${isItemActive ? 'text-[#7DC244]' : 'text-gray-800 hover:text-[#7DC244]'
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center">
              <img
                src={getDefaultImageUrl('2024/09/logo_adonis_4x-1.svg')}
                alt="Adonis Medical Systems"
                className="h-12 w-auto"
              />
            </Link>
            <div className="hidden lg:flex items-center space-x-3">
              <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <img
                src={getDefaultImageUrl('2024/09/logo_adonis_4x-1.svg')}
                alt="Adonis Medical Systems"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {items.map((item) => renderNavItem(item, false))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
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
            className="lg:hidden text-2xl text-gray-800 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-lg mt-2 py-4 px-6 mb-4">
            <nav className="flex flex-col space-y-4">
              {items.map((item) => renderNavItem(item, true))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link
                  to="/request-demo"
                  className="inline-flex items-center justify-center py-[0.425rem] px-[0.5rem] bg-[#F7FFF2] border-2 border-[#7DC244] text-[#7DC244] rounded-lg hover:bg-[#7DC244]/10 transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request Demo
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center py-[0.425rem] px-[0.5rem] bg-[#7DC244] border-2 border-transparent text-white rounded-lg hover:bg-[#6BC04A] transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
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
