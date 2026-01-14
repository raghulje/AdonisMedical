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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center py-12">
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      style={sectionStyle}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        {(section?.heading || section?.description) && (
          <div className="mb-12" data-aos="fade-up">
            {section.heading && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{section.heading}</h2>
            )}
            {section.description && (
              <p className="text-lg text-gray-600 max-w-4xl">{section.description}</p>
            )}
          </div>
        )}

        {/* Products Grid */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((product, index) => (
              <Link
                key={product.id}
                to={product.internalLink || '#'}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative overflow-hidden h-64">
                  {product.cardImage ? (
                    <img
                      src={getCardImageUrl(product)}
                      alt={product.cardImage.altText || product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <i className="ri-image-line text-4xl text-gray-400"></i>
                    </div>
                  )}
                </div>
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <div className="w-10 h-10 bg-[#0066CC] rounded-md flex items-center justify-center text-white hover:bg-[#0052A3] transition-all duration-300 group-hover:scale-110">
                    <i className="ri-arrow-right-line text-xl"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
