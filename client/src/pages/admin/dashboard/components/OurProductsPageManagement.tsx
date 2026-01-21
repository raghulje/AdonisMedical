import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';
import Modal from '../../../../components/cms/Modal';

interface OurProductsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  sectionIntro?: string | null;
  heroImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
  sectionBackgroundImageId: number | null;
  sectionBackgroundImage?: {
    filePath: string;
    altText: string;
  };
}

interface OurProductsItem {
  id: number;
  name: string;
  productImageId: number | null;
  backgroundImageId: number | null;
  internalLink: string | null;
  orderIndex: number;
  isActive: boolean;
  productImage?: {
    filePath: string;
    altText: string;
  };
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export default function OurProductsPageManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<OurProductsPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    sectionIntro: null,
    heroImageId: null,
    sectionBackgroundImageId: null
  });
  const [productsItems, setProductsItems] = useState<OurProductsItem[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<OurProductsItem | null>(null);

  useEffect(() => {
    fetchContent();
    fetchProductsItems();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<OurProductsPageContent>('/our-products/content');
      if (response.success && response.data) {
        setContent(response.data as OurProductsPageContent);
      }
    } catch (error: any) {
      console.error('Error fetching content:', error);
      alert(error.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsItems = async () => {
    try {
      const response = await api.get<OurProductsItem[]>('/our-products/items');
      if (response.success && response.data) {
        setProductsItems((response.data as OurProductsItem[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching products items:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put('/our-products/content', content);
      if (response.success) {
        alert('Our Products Page Content saved successfully!');
        fetchContent();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProduct = async (product: OurProductsItem) => {
    setSaving(true);
    try {
      if (product.id && product.id > 0) {
        await api.put(`/our-products/items/${product.id}`, product);
      } else {
        await api.post('/our-products/items', { ...product, orderIndex: productsItems.length });
      }
      setShowProductModal(false);
      setEditingProduct(null);
      fetchProductsItems();
      alert('Product saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setSaving(true);
    try {
      await api.delete(`/our-products/items/${id}`);
      setProductsItems(productsItems.filter(p => p.id !== id));
      alert('Product deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderProducts = async (reorderedProducts: OurProductsItem[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedProducts.length; i++) {
        await api.put(`/our-products/items/${reorderedProducts[i].id}`, {
          ...reorderedProducts[i],
          orderIndex: i
        });
      }
      setProductsItems(reorderedProducts);
      alert('Products order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const items = [...productsItems];
    [items[index], items[index - 1]] = [items[index - 1], items[index]];
    setProductsItems(items);
    handleReorderProducts(items);
  };

  const handleMoveDown = async (index: number) => {
    if (index === productsItems.length - 1) return;
    const items = [...productsItems];
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    setProductsItems(items);
    handleReorderProducts(items);
  };

  const getImageUrl = (image: any): string => {
    if (!image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${image.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Our Products Page</h2>
            <p className="text-sm text-gray-600 mt-1">Manage the Our Products page content</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">Hero Section</h3>
            
            <FormField label="Hero Title">
              <input
                type="text"
                value={content.heroTitle || ''}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Our Products"
              />
            </FormField>

            <FormField label="Hero Subtitle">
              <textarea
                value={content.heroSubtitle || ''}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value || null })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Explore our comprehensive range of medical imaging solutions"
              />
            </FormField>

            <FormField label="Section Intro Text" hint="Shown above the products grid on the Our Products page">
              <textarea
                value={content.sectionIntro || ''}
                onChange={(e) => setContent({ ...content, sectionIntro: e.target.value || null })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="We offer a full suite of X-Ray Systems, ranging from portable & fixed X-Ray machines..."
              />
            </FormField>

            <div className="border-t pt-6">
              <ImageSelector
                value={content.heroImageId}
                onChange={(id) => setContent({ ...content, heroImageId: id })}
                label="Hero Background Image"
              />
              {content.heroImage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img
                    src={getImageUrl(content.heroImage)}
                    alt={content.heroImage.altText || 'Hero image'}
                    className="w-full max-w-md h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                <i className="ri-information-line mr-1"></i>
                Upload a background image for the hero section.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Products Section</h3>
            <p className="text-sm text-gray-600 mt-1">Manage products displayed on the Our Products page</p>
          </div>
          <button
            onClick={() => {
              setEditingProduct({
                id: 0,
                name: '',
                productImageId: null,
                backgroundImageId: null,
                internalLink: '',
                orderIndex: productsItems.length,
                isActive: true
              });
              setShowProductModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Product
          </button>
        </div>

        <div className="border-t pt-6 mb-6">
          <ImageSelector
            value={content.sectionBackgroundImageId}
            onChange={(id) => setContent({ ...content, sectionBackgroundImageId: id })}
            label="Section Background PNG"
          />
          {content.sectionBackgroundImage && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Current Background Image:</p>
              <img
                src={getImageUrl(content.sectionBackgroundImage)}
                alt={content.sectionBackgroundImage.altText || 'Section background'}
                className="w-full max-w-md h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <p className="text-sm text-gray-500 mt-2">
            <i className="ri-information-line mr-1"></i>
            Upload a background PNG for the products section.
          </p>
        </div>

        <div className="space-y-3">
          {productsItems.map((product, index) => (
            <div key={product.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <i className="ri-arrow-up-line text-xl"></i>
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === productsItems.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <i className="ri-arrow-down-line text-xl"></i>
                    </button>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.internalLink || 'No link'}</p>
                  </div>
                  {product.productImage && (
                    <img
                      src={getImageUrl(product.productImage)}
                      alt={product.productImage.altText || product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowProductModal(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productsItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="ri-inbox-line text-4xl mb-2"></i>
            <p>No products added yet. Click "Add Product" to get started.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && editingProduct && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          saving={saving}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onSave, onClose, saving, getImageUrl }: any) {
  const [formData, setFormData] = useState(product);

  return (
    <Modal isOpen={true} onClose={onClose} title={product.id > 0 ? 'Edit Product' : 'Add Product'} size="lg">
      <div className="space-y-6">
        <FormField label="Product Name" required>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., HF Mobile"
          />
        </FormField>

        <FormField label="Internal Link" required>
          <input
            type="text"
            value={formData.internalLink || ''}
            onChange={(e) => setFormData({ ...formData, internalLink: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., /products/hf-mobile"
          />
          <p className="text-xs text-gray-500 mt-1">Link to the internal product page</p>
        </FormField>

        <div className="border-t pt-4">
          <ImageSelector
            value={formData.productImageId}
            onChange={(id) => setFormData({ ...formData, productImageId: id })}
            label="Product Image"
          />
          {formData.productImage && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Current Product Image:</p>
              <img
                src={getImageUrl(formData.productImage)}
                alt={formData.productImage.altText || 'Product image'}
                className="w-full max-w-md h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <ImageSelector
            value={formData.backgroundImageId}
            onChange={(id) => setFormData({ ...formData, backgroundImageId: id })}
            label="Background PNG (Optional)"
          />
          {formData.backgroundImage && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Current Background Image:</p>
              <img
                src={getImageUrl(formData.backgroundImage)}
                alt={formData.backgroundImage.altText || 'Background image'}
                className="w-full max-w-md h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">Optional: Background PNG for the product card</p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.name || !formData.internalLink}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

