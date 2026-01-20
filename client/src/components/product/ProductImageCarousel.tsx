import { useState, useRef, useEffect } from 'react';

interface ProductImageCarouselProps {
  images: string[];
  altText?: string;
  className?: string;
}

export default function ProductImageCarousel({ images, altText = 'Product image', className = '' }: ProductImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Safety check: ensure images is an array
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const hasMultipleImages = safeImages.length > 1;

  // Reset index if current index is out of bounds
  useEffect(() => {
    if (currentImageIndex >= safeImages.length && safeImages.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [safeImages.length, currentImageIndex]);

  // Check if thumbnails need scrolling
  useEffect(() => {
    const checkScroll = () => {
      if (thumbnailContainerRef.current) {
        const container = thumbnailContainerRef.current;
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
      }
    };

    checkScroll();
    const container = thumbnailContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [safeImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!hasMultipleImages) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasMultipleImages, safeImages.length]);

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    // Scroll thumbnail into view
    if (thumbnailContainerRef.current) {
      const thumbnail = thumbnailContainerRef.current.children[index] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  if (safeImages.length === 0) {
    return null;
  }

  const currentImage = safeImages[currentImageIndex] || safeImages[0] || '';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image with Navigation */}
      <div className="relative bg-white rounded-lg shadow-lg p-4 md:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
          <img
            src={currentImage}
            alt={`${altText} ${currentImageIndex + 1}`}
            className="w-full h-auto transition-opacity duration-300 hover:scale-105 object-contain"
            style={{ 
              maxHeight: '600px',
              display: 'block',
              margin: '0 auto'
            }}
            loading="eager"
          />
        </div>
        
        {/* Previous/Next Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 group border border-gray-200"
              aria-label="Previous image"
              type="button"
            >
              <i className="ri-arrow-left-line text-xl md:text-2xl text-gray-700 group-hover:text-[#7DC244] transition-colors"></i>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 group border border-gray-200"
              aria-label="Next image"
              type="button"
            >
              <i className="ri-arrow-right-line text-xl md:text-2xl text-gray-700 group-hover:text-[#7DC244] transition-colors"></i>
            </button>
            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
              {currentImageIndex + 1} / {safeImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Carousel */}
      {hasMultipleImages && (
        <div className="relative">
          {/* Left Arrow for Thumbnails */}
          {showLeftArrow && (
            <button
              onClick={() => scrollThumbnails('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 border border-gray-200"
              aria-label="Scroll thumbnails left"
              type="button"
            >
              <i className="ri-arrow-left-s-line text-base md:text-lg text-gray-700"></i>
            </button>
          )}

          {/* Thumbnail Container */}
          <div
            ref={thumbnailContainerRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-8 md:px-10 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {safeImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => selectImage(idx)}
                className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer ${
                  currentImageIndex === idx 
                    ? 'shadow-md scale-105' 
                    : 'border-2 border-gray-200 hover:border-gray-300'
                }`}
                style={currentImageIndex === idx ? {
                  background: 'linear-gradient(135deg, rgba(40, 121, 182, 1) 7%, rgba(125, 194, 68, 1) 44%, rgba(238, 106, 49, 1) 100%)',
                  padding: '2px'
                } : {}}
                aria-label={`View image ${idx + 1}`}
                type="button"
              >
                <div className={`w-full h-full rounded-lg overflow-hidden ${currentImageIndex === idx ? 'bg-white' : ''}`}>
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-300" 
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Right Arrow for Thumbnails */}
          {showRightArrow && (
            <button
              onClick={() => scrollThumbnails('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 border border-gray-200"
              aria-label="Scroll thumbnails right"
              type="button"
            >
              <i className="ri-arrow-right-s-line text-base md:text-lg text-gray-700"></i>
            </button>
          )}
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

