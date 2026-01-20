import { useHomeProducts } from '../../../hooks';
import { getImageUrl } from '../../../utils/imageUrl';
import { Link } from 'react-router-dom';

const ProductsSection = () => {
  const { section, cards, loading } = useHomeProducts();

  const getCardImageUrl = (card: any): string => {
    if (card.cardImage) {
      return getImageUrl(card.cardImage);
    }
    return '';
  };

  if (loading) {
    return (
      <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center py-8">
            <i className="ri-loader-4-line animate-spin text-4xl text-gray-400"></i>
          </div>
        </div>
      </section>
    );
  }

  // Get background image URL if available
  const backgroundImageUrl = section?.backgroundImage ? getImageUrl(section.backgroundImage) : null;
  const sectionStyle = backgroundImageUrl 
    ? { 
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <section 
      className="py-14 bg-gradient-to-b from-gray-50 to-white"
      style={sectionStyle}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        {(section?.heading || section?.description) && (
          <div className="mb-12" data-aos="fade-up">
            {section.heading && (
              <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">{section.heading}</h2>
            )}
            {section.description && (
              <p className="text-lg text-gray-600 max-w-4xl">{section.description}</p>
            )}
          </div>
        )}

        {/* Products Grid - Matching Specialties Card Design */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((product, index) => {
              const cardImageUrl = product.cardImage ? getImageUrl(product.cardImage) : '';
              const bgImageUrl = product.backgroundImage ? getImageUrl(product.backgroundImage) : '';
              const linkUrl = product.internalLink || '#';
              
              return (
                <Link
                  key={product.id}
                  to={linkUrl}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={bgImageUrl ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  <div className="relative h-64 overflow-hidden">
                    {cardImageUrl ? (
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={cardImageUrl}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <i className="ri-image-line text-4xl text-gray-400"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-[#2879B6]">{product.name}</h3>
                    <div className="w-12 h-12 bg-[#2879B6] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[#1f5f8f] group-hover:shadow-lg cursor-pointer relative overflow-hidden">
                      <i className="ri-arrow-right-line text-white text-xl relative z-10 transition-transform duration-300 group-hover:translate-x-1"></i>
                      <div className="absolute inset-0 bg-[#1f5f8f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
