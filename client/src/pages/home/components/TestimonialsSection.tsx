import { useState, useEffect, useRef } from 'react';
import { useTestimonials } from '../../../hooks';
import { getImageUrl, getDefaultImageUrl } from '../../../utils/imageUrl';

const TestimonialsSection = () => {
  const { testimonials, loading, error } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(2);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate card width based on viewport (1 card on mobile, 2 on desktop)
  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth < 768 ? 1 : 2);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Filter and validate testimonials
  const validTestimonials = testimonials.filter(
    (t) => t && t.testimonialText && t.clientName && t.isActive !== false
  );

  // Duplicate testimonials for infinite loop (show 3 sets for seamless looping)
  const duplicatedTestimonials = validTestimonials.length > 0
    ? [...validTestimonials, ...validTestimonials, ...validTestimonials]
    : [];

  const cardWidthPercent = cardsPerView > 0 ? 100 / cardsPerView : 100; // 100% on mobile (1 card), 50% on desktop (2 cards)
  const itemWidthPercent = duplicatedTestimonials.length > 0 ? 100 / duplicatedTestimonials.length : 100;

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (loading || error || validTestimonials.length === 0 || isPaused || cardsPerView === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, validTestimonials.length - cardsPerView);
        const nextIndex = prev + 1;
        // Reset to start when we reach the end (accounting for cards per view)
        if (nextIndex > duplicatedTestimonials.length - cardsPerView) {
          // If we are deep into the duplicates, reset to a safe equivalent index in the first set? 
          // Simplest loop: just keep going and handle reset seamlessly if we implemented detailed logic.
          // For now, let's keep the simple logic but adjust limit.
          // Actually, the previous logic was:
          // if (nextIndex > maxIndex) return 0;
          // But we have duplicates now.

          // If we just cycle through all duplicates:
          return (prev + 1) % duplicatedTestimonials.length;
        }
        return nextIndex;
      });
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [validTestimonials.length, duplicatedTestimonials.length, loading, error, isPaused, cardsPerView]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      if (duplicatedTestimonials.length === 0) return 0;
      return prev === 0 ? duplicatedTestimonials.length - 1 : prev - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (duplicatedTestimonials.length === 0) return 0;
      return (prev + 1) % duplicatedTestimonials.length;
    });
  };

  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-red-600 text-center p-4">
            <p>Failed to load testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (validTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 relative" data-aos="fade-up">
          <p className="text-[#7DC244] font-medium mb-2 uppercase text-sm">Testimonial</p>
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">Client Stories & Experiences</h2>

          {/* Navigation Arrows */}
          {validTestimonials.length > cardsPerView && (
            <div className="absolute top-0 right-0 flex gap-2">
              <button
                onClick={goToPrevious}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="w-10 h-10 rounded-full border-2 border-[#2879B6] bg-white hover:bg-[#2879B6] text-[#2879B6] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                aria-label="Previous testimonials"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <button
                onClick={goToNext}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="w-10 h-10 rounded-full border-2 border-[#2879B6] bg-white hover:bg-[#2879B6] text-[#2879B6] hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                aria-label="Next testimonials"
              >
                <i className="ri-arrow-right-line text-xl"></i>
              </button>
            </div>
          )}
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="overflow-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidthPercent}%)`,
              width: `${(duplicatedTestimonials.length * 100) / cardsPerView}%` // Total width based on cards per view
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 px-2 md:px-4"
                style={{ width: `${itemWidthPercent}%` }} // Each card width based on track percentage
              >
                <div className="bg-[#FF6B35] p-3 rounded-lg text-white h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="mb-6">
                    <i className="ri-double-quotes-l text-5xl text-white/50"></i>
                  </div>

                  <p className="text-white leading-relaxed mb-6 text-sm md:text-base italic">
                    "{testimonial?.testimonialText || ''}"
                  </p>

                  <div className="border-t border-white/30 pt-6 mt-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden relative border-2 border-white/30">
                        {testimonial?.clientImage?.filePath ? (
                          <img
                            src={getImageUrl(testimonial.clientImage)}
                            alt={testimonial?.clientName || 'Client'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initial if image fails
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-white/30 flex items-center justify-center">
                                    <span class="text-white font-bold text-lg">
                                      ${(testimonial?.clientName || 'C').charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-white/30 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {(testimonial?.clientName || 'C').charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-bold text-white mb-1">{testimonial?.clientName || 'Client'}</h3>
                        {testimonial?.clientPosition && testimonial?.clientCompany ? (
                          <p className="text-xs md:text-sm text-white/90">
                            {testimonial.clientPosition}, {testimonial.clientCompany}
                          </p>
                        ) : testimonial?.clientCompany ? (
                          <p className="text-xs md:text-sm text-white/90">{testimonial.clientCompany}</p>
                        ) : testimonial?.clientPosition ? (
                          <p className="text-xs md:text-sm text-white/90">{testimonial.clientPosition}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
