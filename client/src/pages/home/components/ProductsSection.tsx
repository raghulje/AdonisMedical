import { useHomeProducts } from '../../../hooks';
import { getImageUrl } from '../../../utils/imageUrl';
import ProductCard from '../../../components/product/ProductCard';

const ProductsSection = () => {
  const { section, cards, loading } = useHomeProducts();

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
          <div className="mb-12 text-center" data-aos="fade-up">
            {section.heading && (
              <h2 className="text-4xl md:text-5xl font-medium text-[#7DC244] mb-4">{section.heading}</h2>
            )}
            {section.description && (
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">{section.description}</p>
            )}
          </div>
        )}

        {/* Products Grid */}
        {cards.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8">
            {cards.map((product, index) => (
              <div key={product.id} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                <ProductCard
                  name={product.name}
                  image={product.cardImage ? getImageUrl(product.cardImage) : ''}
                  link={product.internalLink || '#'}
                  index={index}
                  backgroundImage={product.backgroundImage ? getImageUrl(product.backgroundImage) : ''}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


export default ProductsSection;
