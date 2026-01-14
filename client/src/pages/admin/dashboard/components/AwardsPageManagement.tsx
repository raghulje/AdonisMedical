import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';
import ContentCard from '../../../../components/cms/ContentCard';
import { getImageUrl } from '../../../../utils/imageUrl';

interface Award {
  id: number;
  title: string;
  description: string;
  imageId: number | null;
  awardDate: string | null;
  orderIndex: number;
  isActive: boolean;
  image?: {
    filePath: string;
    altText: string;
  };
}

interface AwardsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  heroImage?: {
    id: number;
    filePath: string;
    altText: string;
  };
}

export default function AwardsPageManagement() {
  const [activeTab, setActiveTab] = useState<'content' | 'awards'>('content');
  const [awards, setAwards] = useState<Award[]>([]);
  const [content, setContent] = useState<AwardsPageContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [viewingAward, setViewingAward] = useState<Award | null>(null);

  useEffect(() => {
    if (activeTab === 'content') {
      fetchPageContent();
    } else {
      fetchAwards();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<AwardsPageContent>('/awards/page-content');
      if (response.success && response.data) {
        setContent(response.data as AwardsPageContent);
      } else {
        // If content doesn't exist yet, use defaults
        setContent({
          heroTitle: null,
          heroSubtitle: null,
          heroImageId: null,
          introText: null
        });
      }
    } catch (error: any) {
      // If it's a "not found" error, that's okay - use defaults
      if (error.message && error.message.includes('not found')) {
        setContent({
          heroTitle: null,
          heroSubtitle: null,
          heroImageId: null,
          introText: null
        });
      } else {
        console.error('Error fetching page content:', error);
        alert(error.message || 'Failed to load page content');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAwards = async () => {
    setLoading(true);
    try {
      // Fetch all awards for CMS, regardless of isActive status
      const response = await api.get<Award[]>('/awards');
      if (response.success && response.data) {
        setAwards((response.data as Award[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching awards:', error);
      alert(error.message || 'Failed to load awards');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const payload = {
        heroTitle: content.heroTitle || null,
        heroSubtitle: content.heroSubtitle || null,
        heroImageId: content.heroImageId || null,
        introText: content.introText || null
      };
      
      const response = await api.put('/awards/page-content', payload);
      if (response.success) {
        alert('Page content saved successfully!');
        fetchPageContent(); // Refresh to get updated data with associations
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save page content');
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (reorderedAwards: Award[]) => {
    setSaving(true);
    try {
      // Update orderIndex for each award
      for (let i = 0; i < reorderedAwards.length; i++) {
        await api.put(`/awards/${reorderedAwards[i].id}`, {
          ...reorderedAwards[i],
          orderIndex: i
        });
      }
      setAwards(reorderedAwards);
      alert('Awards order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAward = async (award: Award) => {
    setSaving(true);
    try {
      if (award.id && award.id > 0) {
        await api.put(`/awards/${award.id}`, award);
      } else {
        await api.post('/awards', { ...award, orderIndex: awards.length });
      }
      setShowAwardModal(false);
      setEditingAward(null);
      fetchAwards();
      alert('Award saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save award');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAward = async (id: number) => {
    if (!confirm('Are you sure you want to delete this award?')) return;
    setSaving(true);
    try {
      await api.delete(`/awards/${id}`);
      setAwards(awards.filter(a => a.id !== id));
      alert('Award deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete award');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Awards Management</h2>
            <p className="text-sm text-gray-600 mt-1">Manage awards page content and awards list</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="ri-file-text-line mr-2"></i>Page Content
            </button>
            <button
              onClick={() => setActiveTab('awards')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'awards'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="ri-award-line mr-2"></i>Awards List
            </button>
          </nav>
        </div>
      </div>

      {/* Page Content Tab */}
      {activeTab === 'content' && (
        <PageContentEditor
          content={content}
          setContent={setContent}
          onSave={handleSavePageContent}
          saving={saving}
          loading={loading}
        />
      )}

      {/* Awards List Tab */}
      {activeTab === 'awards' && (
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Awards List</h3>
                <p className="text-sm text-gray-600 mt-1">Manage individual awards and certifications</p>
              </div>
              <button
                onClick={() => {
                  setEditingAward({
                    id: 0,
                    title: '',
                    description: '',
                    imageId: null,
                    awardDate: null,
                    orderIndex: awards.length,
                    isActive: true
                  });
                  setShowAwardModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>Add Award
              </button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
              <div className="flex-1">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Drag and drop awards to reorder them. The order shown here will appear on the website. Only award images are shown on the frontend (no titles).
                </p>
              </div>
            </div>
          </div>

          {/* Awards List */}
          {loading ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
              <p className="text-gray-600 mt-2">Loading awards...</p>
            </div>
          ) : awards.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <i className="ri-award-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 mb-4">No awards yet. Add your first award!</p>
              <button
                onClick={() => {
                  setEditingAward({
                    id: 0,
                    title: '',
                    description: '',
                    imageId: null,
                    awardDate: null,
                    orderIndex: 0,
                    isActive: true
                  });
                  setShowAwardModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>Add Award
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <DragDropList
                items={awards}
                onReorder={handleReorder}
                keyExtractor={(award) => award.id}
                emptyMessage="No awards yet. Click 'Add Award' to get started!"
                renderItem={(award: Award) => (
                  <div className="flex items-center space-x-4 w-full">
                    {award.image && (
                      <img
                        src={getImageUrl(award.image)}
                        alt={award.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{award.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{award.description}</p>
                      {award.awardDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          <i className="ri-calendar-line mr-1"></i>
                          {new Date(award.awardDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        award.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {award.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => setViewingAward(award)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="View"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          setEditingAward(award);
                          setShowAwardModal(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                        title="Edit"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteAward(award.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
          )}
        </div>
      )}

      {/* Award Modal (Create/Edit) */}
      {showAwardModal && editingAward && (
        <AwardModal
          award={editingAward}
          onSave={handleSaveAward}
          onClose={() => {
            setShowAwardModal(false);
            setEditingAward(null);
          }}
          saving={saving}
        />
      )}

      {/* Award View Modal */}
      {viewingAward && (
        <AwardViewModal
          award={viewingAward}
          onClose={() => setViewingAward(null)}
          onEdit={() => {
            setEditingAward(viewingAward);
            setViewingAward(null);
            setShowAwardModal(true);
          }}
          getImageUrl={getImageUrl}
        />
      )}
    </div>
  );
}

// Page Content Editor Component
function PageContentEditor({
  content,
  setContent,
  onSave,
  saving,
  loading
}: {
  content: AwardsPageContent | null;
  setContent: (content: AwardsPageContent | null) => void;
  onSave: () => void;
  saving: boolean;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
        <p className="text-gray-600 mt-2">Loading page content...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-600">No page content found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Hero Section</h3>
      
      <div className="space-y-6">
        <FormField label="Hero Title">
          <input
            type="text"
            value={content.heroTitle || ''}
            onChange={(e) => setContent({ ...content, heroTitle: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hero title (e.g., Awards & Recognition)"
          />
        </FormField>

        <FormField label="Hero Subtitle">
          <textarea
            value={content.heroSubtitle || ''}
            onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value || null })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hero subtitle (optional)"
          />
        </FormField>

        <ImageSelector
          value={content.heroImageId}
          onChange={(id) => setContent({ ...content, heroImageId: id || null })}
          label="Hero Background Image"
          aspectRatio="16/9"
          currentImage={content.heroImage}
        />

        <FormField label="Intro Text">
          <textarea
            value={content.introText || ''}
            onChange={(e) => setContent({ ...content, introText: e.target.value || null })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter introduction text (optional)"
          />
        </FormField>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Page Content'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Award Modal (Create/Edit)
function AwardModal({ award, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<Award>(award);

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title={award.id && award.id > 0 ? 'Edit Award' : 'Add New Award'} 
      size="lg"
    >
      <div className="space-y-6">
        <FormField label="Award Title" required>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter award title"
          />
        </FormField>

        <FormField label="Description" required>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter award description"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Award Date">
            <input
              type="date"
              value={formData.awardDate ? new Date(formData.awardDate).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, awardDate: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
        </div>

        <ImageSelector
          value={formData.imageId}
          onChange={(id) => setFormData({ ...formData, imageId: id })}
          label="Award Image"
          aspectRatio="1/1"
        />

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.title || !formData.description}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : award.id && award.id > 0 ? 'Update Award' : 'Create Award'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Award View Modal
function AwardViewModal({ award, onClose, onEdit, getImageUrl }: any) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Award Details" size="lg">
      <div className="space-y-6">
        {award.image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={getImageUrl(award.image)}
              alt={award.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{award.title}</h3>
          <p className="text-gray-600 mb-4">{award.description}</p>
          
          {award.awardDate && (
            <p className="text-sm text-gray-500">
              <i className="ri-calendar-line mr-2"></i>
              Awarded on: {new Date(award.awardDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}

          <div className="mt-4">
            <span className={`inline-block px-3 py-1 text-sm rounded-full ${
              award.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {award.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
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
            <i className="ri-edit-line mr-2"></i>Edit Award
          </button>
        </div>
      </div>
    </Modal>
  );
}
