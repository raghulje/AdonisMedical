import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';
import DragDropList from '../../../../components/cms/DragDropList';
import Modal from '../../../../components/cms/Modal';

interface FaqsPage {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  backgroundImageId: number | null;
  sectionBackgroundImageId: number | null;
  titleColor: string;
  subtitleColor: string;
  overlayOpacity: number;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  sectionBackgroundImage?: {
    filePath: string;
    altText: string;
  };
}

interface FaqsItem {
  id: number;
  question: string;
  answer: string;
  imageId: number | null;
  orderIndex: number;
  isActive: boolean;
  image?: {
    filePath: string;
    altText: string;
  };
}

export default function FaqsManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState<FaqsPage>({
    heroTitle: null,
    heroSubtitle: null,
    backgroundImageId: null,
    sectionBackgroundImageId: null,
    titleColor: '#FFFFFF',
    subtitleColor: '#FFFFFF',
    overlayOpacity: 40
  });
  const [items, setItems] = useState<FaqsItem[]>([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqsItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pageRes, itemsRes] = await Promise.all([
        api.get<FaqsPage>('/faqs/page', {
          params: { include: 'backgroundImage,sectionBackgroundImage' }
        }),
        api.get<FaqsItem[]>('/faqs/items')
      ]);

      if (pageRes.success && pageRes.data) {
        setPage(pageRes.data);
      }

      if (itemsRes.success && itemsRes.data) {
        setItems(itemsRes.data.sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      alert(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async () => {
    setSaving(true);
    try {
      const response = await api.put('/faqs/page', page);
      if (response.success) {
        alert('FAQs page saved successfully!');
        fetchData();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveItem = async (itemData: Partial<FaqsItem>) => {
    try {
      if (editingItem) {
        await api.put(`/faqs/items/${editingItem.id}`, itemData);
      } else {
        await api.post('/faqs/items', {
          ...itemData,
          orderIndex: items.length,
          isActive: true
        });
      }
      fetchData();
      setShowItemModal(false);
      setEditingItem(null);
    } catch (error: any) {
      alert(error.message || 'Failed to save FAQ item');
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return;
    try {
      await api.delete(`/faqs/items/${id}`);
      fetchData();
    } catch (error: any) {
      alert(error.message || 'Failed to delete FAQ item');
    }
  };

  const handleReorderItems = async (reorderedItems: FaqsItem[]) => {
    try {
      const itemsToUpdate = reorderedItems.map((item, index) => ({
        id: item.id,
        orderIndex: index
      }));
      await api.post('/faqs/items/reorder', { items: itemsToUpdate });
      setItems(reorderedItems);
    } catch (error: any) {
      alert(error.message || 'Failed to reorder FAQs');
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">FAQs Page Management</h2>

        {/* Hero Section */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
          <div className="space-y-4">
            <FormField label="Hero Title">
              <input
                type="text"
                value={page.heroTitle || ''}
                onChange={(e) => setPage({ ...page, heroTitle: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter hero title"
              />
            </FormField>

            <FormField label="Hero Subtitle">
              <textarea
                value={page.heroSubtitle || ''}
                onChange={(e) => setPage({ ...page, heroSubtitle: e.target.value || null })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter hero subtitle"
              />
            </FormField>

            <ImageSelector
              value={page.backgroundImageId}
              onChange={(id) => setPage({ ...page, backgroundImageId: id as number | null })}
              label="Hero Background Image"
              currentImage={page.backgroundImage ? {
                filePath: page.backgroundImage.filePath,
                fileName: page.backgroundImage.altText
              } : null}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField label="Title Color">
                <input
                  type="color"
                  value={page.titleColor}
                  onChange={(e) => setPage({ ...page, titleColor: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </FormField>

              <FormField label="Subtitle Color">
                <input
                  type="color"
                  value={page.subtitleColor}
                  onChange={(e) => setPage({ ...page, subtitleColor: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </FormField>

              <FormField label="Overlay Opacity (%)">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={page.overlayOpacity}
                  onChange={(e) => setPage({ ...page, overlayOpacity: parseInt(e.target.value) || 40 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </FormField>
            </div>

            <button
              onClick={handleSavePage}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save Hero Section'}
            </button>
          </div>
        </div>

        {/* FAQs Section Background */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">FAQs Section Background</h3>
          <div className="space-y-4">
            <ImageSelector
              value={page.sectionBackgroundImageId}
              onChange={(id) => setPage({ ...page, sectionBackgroundImageId: id as number | null })}
              label="Section Background Image (PNG)"
              currentImage={page.sectionBackgroundImage ? {
                filePath: page.sectionBackgroundImage.filePath,
                fileName: page.sectionBackgroundImage.altText
              } : null}
            />
            <p className="text-sm text-gray-500">
              <i className="ri-information-line mr-1"></i>
              Upload a background PNG image for the FAQs section (the section with image and questions).
            </p>
            <button
              onClick={handleSavePage}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save Section Background'}
            </button>
          </div>
        </div>

        {/* FAQs Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">FAQs Items</h3>
            <button
              onClick={() => {
                setEditingItem(null);
                setShowItemModal(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Add FAQ Item
            </button>
          </div>

          {items.length > 0 ? (
            <DragDropList
              items={items}
              onReorder={handleReorderItems}
              renderItem={(item) => (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-[#FF6B35] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {String(item.orderIndex + 1).padStart(2, '0')}
                      </div>
                      <h4 className="font-semibold text-gray-900">{item.question}</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-11 line-clamp-2">{item.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setShowItemModal(true);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              )}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No FAQs items yet. Click "Add FAQ Item" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Item Modal */}
      {showItemModal && (
        <FaqItemModal
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => {
            setShowItemModal(false);
            setEditingItem(null);
          }}
          saving={saving}
        />
      )}
    </div>
  );
}

function FaqItemModal({ item, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState({
    question: item?.question || '',
    answer: item?.answer || '',
    imageId: item?.imageId || null
  });

  return (
    <Modal isOpen={true} onClose={onClose} title={item ? 'Edit FAQ Item' : 'Add FAQ Item'} size="lg">
      <div className="space-y-6">
        <FormField label="Question" required>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter question"
          />
        </FormField>

        <FormField label="Answer" required>
          <textarea
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter answer"
          />
        </FormField>

        <ImageSelector
          value={formData.imageId}
          onChange={(id) => setFormData({ ...formData, imageId: id as number | null })}
          label="FAQ Image (Displayed on left side)"
          currentImage={item?.image ? {
            filePath: item.image.filePath,
            fileName: item.image.altText
          } : null}
        />
        <p className="text-sm text-gray-500">
          <i className="ri-information-line mr-1"></i>
          This image will be displayed on the left side of the FAQs section. The first FAQ item's image will be used.
        </p>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.question || !formData.answer}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

