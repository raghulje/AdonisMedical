import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

type TabType = 'page' | 'specialties';

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageId: number | null;
  iconClass: string | null;
  orderIndex: number;
  isActive: boolean;
  image?: {
    filePath: string;
    altText: string;
  };
}

interface SpecialtiesPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
}

interface SpecialtiesPageCard {
  id: number;
  name: string;
  backgroundImageId: number | null;
  cardImageId: number | null;
  internalLink: string | null;
  orderIndex: number;
  isActive: boolean;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  cardImage?: {
    filePath: string;
    altText: string;
  };
}

export default function SpecialtiesPageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('page');
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);
  const [viewingSpecialty, setViewingSpecialty] = useState<Specialty | null>(null);

  // Page Content
  const [pageContent, setPageContent] = useState<SpecialtiesPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    introText: null
  });

  // Page Cards
  const [pageCards, setPageCards] = useState<SpecialtiesPageCard[]>([]);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState<SpecialtiesPageCard | null>(null);

  useEffect(() => {
    if (activeTab === 'page') {
      fetchPageContent();
      fetchPageCards();
    } else {
      fetchSpecialties();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<SpecialtiesPageContent>('/specialties/page/content');
      if (response.success && response.data) {
        setPageContent(response.data as SpecialtiesPageContent);
      }
    } catch (error: any) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPageCards = async () => {
    setLoading(true);
    try {
      const response = await api.get<SpecialtiesPageCard[]>('/specialties/page/cards');
      if (response.success && response.data) {
        setPageCards((response.data as SpecialtiesPageCard[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching page cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const response = await api.get<Specialty[]>('/specialties');
      if (response.success && response.data) {
        setSpecialties((response.data as Specialty[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching specialties:', error);
      alert(error.message || 'Failed to load specialties');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSaving(true);
    try {
      const response = await api.put('/specialties/page/content', pageContent);
      if (response.success) {
        alert('Page content saved successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCard = async (card: SpecialtiesPageCard) => {
    setSaving(true);
    try {
      if (card.id && card.id > 0) {
        await api.put(`/specialties/page/cards/${card.id}`, card);
      } else {
        await api.post('/specialties/page/cards', { ...card, orderIndex: pageCards.length });
      }
      setShowCardModal(false);
      setEditingCard(null);
      fetchPageCards();
      alert('Card saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCard = async (id: number) => {
    if (!confirm('Are you sure you want to delete this card?')) return;
    setSaving(true);
    try {
      await api.delete(`/specialties/page/cards/${id}`);
      setPageCards(pageCards.filter(c => c.id !== id));
      alert('Card deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderCards = async (reorderedCards: SpecialtiesPageCard[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedCards.length; i++) {
        await api.put(`/specialties/page/cards/${reorderedCards[i].id}`, {
          ...reorderedCards[i],
          orderIndex: i
        });
      }
      setPageCards(reorderedCards);
      alert('Cards order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (reorderedSpecialties: Specialty[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedSpecialties.length; i++) {
        await api.put(`/specialties/${reorderedSpecialties[i].id}`, {
          ...reorderedSpecialties[i],
          orderIndex: i
        });
      }
      setSpecialties(reorderedSpecialties);
      alert('Specialties order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSpecialty = async (specialty: Specialty) => {
    setSaving(true);
    try {
      // Generate slug from name if not provided
      if (!specialty.slug && specialty.name) {
        specialty.slug = specialty.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }

      if (specialty.id && specialty.id > 0) {
        await api.put(`/specialties/${specialty.id}`, specialty);
      } else {
        await api.post('/specialties', { ...specialty, orderIndex: specialties.length });
      }
      setShowSpecialtyModal(false);
      setEditingSpecialty(null);
      fetchSpecialties();
      alert('Specialty saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save specialty');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSpecialty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this specialty?')) return;
    setSaving(true);
    try {
      await api.delete(`/specialties/${id}`);
      setSpecialties(specialties.filter(s => s.id !== id));
      alert('Specialty deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete specialty');
    } finally {
      setSaving(false);
    }
  };

  const getImageUrl = (specialty: Specialty): string => {
    if (!specialty.image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${specialty.image.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium text-gray-900">Specialties Page Management</h2>
        <p className="text-sm text-gray-600 mt-1">Manage specialties page content and cards</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('page')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${
                activeTab === 'page'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-blue-600'
              }`}
            >
              Page Content & Cards
            </button>
            <button
              onClick={() => setActiveTab('specialties')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${
                activeTab === 'specialties'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-blue-600'
              }`}
            >
              General Specialties
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
              <p className="text-gray-600 mt-2">Loading...</p>
            </div>
          ) : activeTab === 'page' ? (
            <>
              <PageContentEditor
                content={pageContent}
                onChange={setPageContent}
                onSave={handleSavePageContent}
                saving={saving}
              />
              <div className="border-t mt-8 pt-8">
                <CardsEditor
                  cards={pageCards}
                  onAdd={() => {
                    setEditingCard({
                      id: 0,
                      name: '',
                      backgroundImageId: null,
                      cardImageId: null,
                      internalLink: null,
                      orderIndex: pageCards.length,
                      isActive: true
                    });
                    setShowCardModal(true);
                  }}
                  onEdit={(card) => {
                    setEditingCard(card);
                    setShowCardModal(true);
                  }}
                  onDelete={handleDeleteCard}
                  onReorder={handleReorderCards}
                  saving={saving}
                />
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">General Specialties</h3>
                <button
                  onClick={() => {
                    setEditingSpecialty({
                      id: 0,
                      name: '',
                      slug: '',
                      description: null,
                      imageId: null,
                      iconClass: null,
                      orderIndex: specialties.length,
                      isActive: true
                    });
                    setShowSpecialtyModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>Add Specialty
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
                  <div className="flex-1">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Drag and drop specialties to reorder them.
                    </p>
                  </div>
                </div>
              </div>

              {specialties.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-stethoscope-line text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600 mb-4">No specialties yet. Add your first specialty!</p>
                </div>
              ) : (
                <DragDropList
                  items={specialties}
                  onReorder={handleReorder}
                  keyExtractor={(specialty) => specialty.id}
                  emptyMessage="No specialties yet. Click 'Add Specialty' to get started!"
                  renderItem={(specialty: Specialty) => (
                    <div className="flex items-center space-x-4 w-full">
                      {specialty.iconClass && (
                        <i className={`${specialty.iconClass} text-3xl text-blue-600`}></i>
                      )}
                      {specialty.image && !specialty.iconClass && (
                        <img
                          src={getImageUrl(specialty)}
                          alt={specialty.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{specialty.name}</h3>
                        {specialty.description && (
                          <p className="text-sm text-gray-600 line-clamp-1">{specialty.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          specialty.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {specialty.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={() => setViewingSpecialty(specialty)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                          title="View"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                        <button
                          onClick={() => {
                            setEditingSpecialty(specialty);
                            setShowSpecialtyModal(true);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                          title="Edit"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteSpecialty(specialty.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Delete"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  )}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {showCardModal && editingCard && (
        <CardModal
          card={editingCard}
          onSave={handleSaveCard}
          onClose={() => {
            setShowCardModal(false);
            setEditingCard(null);
          }}
          saving={saving}
        />
      )}

      {showSpecialtyModal && editingSpecialty && (
        <SpecialtyModal
          specialty={editingSpecialty}
          onSave={handleSaveSpecialty}
          onClose={() => {
            setShowSpecialtyModal(false);
            setEditingSpecialty(null);
          }}
          saving={saving}
        />
      )}

      {viewingSpecialty && (
        <SpecialtyViewModal
          specialty={viewingSpecialty}
          onClose={() => setViewingSpecialty(null)}
          onEdit={() => {
            setEditingSpecialty(viewingSpecialty);
            setViewingSpecialty(null);
            setShowSpecialtyModal(true);
          }}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
}

// Page Content Editor
function PageContentEditor({ content, onChange, onSave, saving }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Hero Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Hero Title">
          <input
            type="text"
            value={content.heroTitle || ''}
            onChange={(e) => onChange({ ...content, heroTitle: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Hero Subtitle">
          <input
            type="text"
            value={content.heroSubtitle || ''}
            onChange={(e) => onChange({ ...content, heroSubtitle: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <div className="md:col-span-2">
          <ImageSelector
            value={content.heroImageId}
            onChange={(id) => onChange({ ...content, heroImageId: id })}
            label="Hero Background Image"
          />
        </div>

        <div className="md:col-span-2">
          <FormField label="Intro Text">
            <textarea
              value={content.introText || ''}
              onChange={(e) => onChange({ ...content, introText: e.target.value || null })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}

// Cards Editor
function CardsEditor({ cards, onAdd, onEdit, onDelete, onReorder, saving }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Specialties Cards</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>Add Card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <i className="ri-image-line text-4xl text-gray-400 mb-2"></i>
          <p className="text-gray-500">No cards yet. Add your first card!</p>
        </div>
      ) : (
        <DragDropList
          items={cards}
          onReorder={onReorder}
          keyExtractor={(card: SpecialtiesPageCard) => card.id}
          emptyMessage="No cards yet. Click 'Add Card' to get started!"
          renderItem={(card: SpecialtiesPageCard) => (
            <div className="flex items-center space-x-4 w-full">
              {card.cardImage && (
                <img
                  src={getCardImageUrl(card)}
                  alt={card.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{card.name}</h3>
                {card.internalLink && (
                  <p className="text-sm text-gray-600">Link: {card.internalLink}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  card.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {card.isActive ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => onEdit(card)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                  title="Edit"
                >
                  <i className="ri-edit-line"></i>
                </button>
                <button
                  onClick={() => onDelete(card.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  title="Delete"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}

function getCardImageUrl(card: SpecialtiesPageCard): string {
  if (!card.cardImage) return '';
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  return `${baseUrl}${card.cardImage.filePath}`;
}

// Card Modal
function CardModal({ card, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<SpecialtiesPageCard>(card);

  useEffect(() => {
    setFormData(card);
  }, [card]);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={card.id && card.id > 0 ? 'Edit Card' : 'Add New Card'}
      size="lg"
    >
      <div className="space-y-6">
        <FormField label="Card Name" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Radiology"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageSelector
            value={formData.backgroundImageId}
            onChange={(id) => setFormData({ ...formData, backgroundImageId: id })}
            label="Background Image"
          />

          <ImageSelector
            value={formData.cardImageId}
            onChange={(id) => setFormData({ ...formData, cardImageId: id })}
            label="Card Image"
          />
        </div>

        <FormField label="Internal Link" hint="Page URL to redirect to (e.g., /products, /about)">
          <input
            type="text"
            value={formData.internalLink || ''}
            onChange={(e) => setFormData({ ...formData, internalLink: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="/products"
          />
        </FormField>

        <FormField label="Status">
          <select
            value={formData.isActive ? 'active' : 'inactive'}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.name}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : card.id && card.id > 0 ? 'Update Card' : 'Create Card'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SpecialtyModal({ specialty, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<Specialty>(specialty);

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title={specialty.id && specialty.id > 0 ? 'Edit Specialty' : 'Add New Specialty'} 
      size="lg"
    >
      <div className="space-y-6">
        <FormField label="Specialty Name" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              const name = e.target.value;
              setFormData({ 
                ...formData, 
                name,
                slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
              });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Cardiology"
          />
        </FormField>

        <FormField label="Slug" hint="Auto-generated from name, or customize">
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="cardiology"
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter specialty description"
          />
        </FormField>

        <FormField label="Icon Class" hint="Use RemixIcon class (e.g., ri-heart-line)">
          <input
            type="text"
            value={formData.iconClass || ''}
            onChange={(e) => setFormData({ ...formData, iconClass: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="ri-heart-line"
          />
          {formData.iconClass && (
            <div className="mt-2 text-xs text-gray-500">
              Preview: <i className={formData.iconClass}></i>
            </div>
          )}
        </FormField>

        <ImageSelector
          value={formData.imageId}
          onChange={(id) => setFormData({ ...formData, imageId: id })}
          label="Specialty Image"
          aspectRatio="1/1"
        />

        <FormField label="Status">
          <select
            value={formData.isActive ? 'active' : 'inactive'}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.name || !formData.slug}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : specialty.id && specialty.id > 0 ? 'Update Specialty' : 'Create Specialty'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SpecialtyViewModal({ specialty, onClose, onEdit, getImageUrl }: any) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Specialty Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          {specialty.iconClass && (
            <i className={`${specialty.iconClass} text-5xl text-blue-600`}></i>
          )}
          {specialty.image && !specialty.iconClass && (
            <img
              src={getImageUrl(specialty)}
              alt={specialty.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          )}
          <div>
            <h3 className="text-2xl font-medium text-gray-900">{specialty.name}</h3>
            <p className="text-sm text-gray-500">Slug: {specialty.slug}</p>
          </div>
        </div>

        {specialty.description && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600">{specialty.description}</p>
          </div>
        )}

        <div>
          <span className={`inline-block px-3 py-1 text-sm rounded-full ${
            specialty.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {specialty.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <i className="ri-edit-line mr-2"></i>Edit Specialty
          </button>
        </div>
      </div>
    </Modal>
  );
}
