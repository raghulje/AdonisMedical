import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';
import Modal from '../../../../components/cms/Modal';
import DragDropList from '../../../../components/cms/DragDropList';

interface RequestDemoPageContent {
  id?: number;
  heroTitle: string | null;
  introText: string | null;
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  paragraphs?: RequestDemoParagraph[];
  features?: RequestDemoFeature[];
}

interface RequestDemoParagraph {
  id: number;
  content: string;
  orderIndex: number;
}

interface RequestDemoFeature {
  id: number;
  title: string;
  content: string;
  iconImageId: number | null;
  orderIndex: number;
  iconImage?: {
    filePath: string;
    altText: string;
  };
}

export default function RequestDemoPageManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<RequestDemoPageContent>({
    heroTitle: null,
    introText: null,
    backgroundImageId: null
  });
  const [paragraphs, setParagraphs] = useState<RequestDemoParagraph[]>([]);
  const [features, setFeatures] = useState<RequestDemoFeature[]>([]);
  const [showParagraphModal, setShowParagraphModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [editingParagraph, setEditingParagraph] = useState<RequestDemoParagraph | null>(null);
  const [editingFeature, setEditingFeature] = useState<RequestDemoFeature | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<RequestDemoPageContent>('/request-demo');
      if (response.success && response.data) {
        const data = response.data as RequestDemoPageContent;
        setContent({
          id: data.id,
          heroTitle: data.heroTitle,
          introText: data.introText,
          backgroundImageId: data.backgroundImageId,
          backgroundImage: data.backgroundImage
        });
        setParagraphs(data.paragraphs || []);
        setFeatures(data.features || []);
      }
    } catch (error: any) {
      console.error('Error fetching content:', error);
      alert(error.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put('/request-demo', content);
      if (response.success) {
        alert('Request Demo page saved successfully!');
        fetchContent();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveParagraph = async (paragraph: RequestDemoParagraph) => {
    setSaving(true);
    try {
      if (paragraph.id && paragraph.id > 0) {
        await api.put(`/request-demo/paragraphs/${paragraph.id}`, paragraph);
      } else {
        await api.post('/request-demo/paragraphs', { ...paragraph, orderIndex: paragraphs.length });
      }
      setShowParagraphModal(false);
      setEditingParagraph(null);
      fetchContent();
      alert('Paragraph saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteParagraph = async (id: number) => {
    if (!confirm('Are you sure you want to delete this paragraph?')) return;
    setSaving(true);
    try {
      await api.delete(`/request-demo/paragraphs/${id}`);
      setParagraphs(paragraphs.filter(p => p.id !== id));
      alert('Paragraph deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderParagraphs = async (reorderedParagraphs: RequestDemoParagraph[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedParagraphs.length; i++) {
        await api.put(`/request-demo/paragraphs/${reorderedParagraphs[i].id}`, {
          ...reorderedParagraphs[i],
          orderIndex: i
        });
      }
      setParagraphs(reorderedParagraphs);
      alert('Paragraphs order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFeature = async (feature: RequestDemoFeature) => {
    setSaving(true);
    try {
      if (feature.id && feature.id > 0) {
        await api.put(`/request-demo/features/${feature.id}`, feature);
      } else {
        await api.post('/request-demo/features', { ...feature, orderIndex: features.length });
      }
      setShowFeatureModal(false);
      setEditingFeature(null);
      fetchContent();
      alert('Feature saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFeature = async (id: number) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;
    setSaving(true);
    try {
      await api.delete(`/request-demo/features/${id}`);
      setFeatures(features.filter(f => f.id !== id));
      alert('Feature deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderFeatures = async (reorderedFeatures: RequestDemoFeature[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedFeatures.length; i++) {
        await api.put(`/request-demo/features/${reorderedFeatures[i].id}`, {
          ...reorderedFeatures[i],
          orderIndex: i
        });
      }
      setFeatures(reorderedFeatures);
      alert('Features order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Request Demo Page</h2>
            <p className="text-sm text-gray-600 mt-1">Manage request demo page content</p>
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
            <FormField label="Hero Title">
              <input
                type="text"
                value={content.heroTitle || ''}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Request a Demo"
              />
            </FormField>

            <FormField label="Intro Text">
              <textarea
                value={content.introText || ''}
                onChange={(e) => setContent({ ...content, introText: e.target.value || null })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter introduction text"
              />
            </FormField>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Image</h3>
              <ImageSelector
                value={content.backgroundImageId}
                onChange={(id) => setContent({ ...content, backgroundImageId: id })}
                label="Page Background Image"
              />
              <p className="text-sm text-gray-500 mt-2">
                <i className="ri-information-line mr-1"></i>
                Upload a background image (e.g., Frame-75-1.png). This will replace the default gradient background.
              </p>
            </div>

            {/* Paragraphs Section */}
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Paragraphs</h3>
                <button
                  onClick={() => {
                    setEditingParagraph({ id: 0, content: '', orderIndex: paragraphs.length });
                    setShowParagraphModal(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>Add Paragraph
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  <i className="ri-information-line mr-2"></i>
                  Add multiple paragraphs. Drag and drop to reorder.
                </p>
                <DragDropList
                  items={paragraphs}
                  onReorder={handleReorderParagraphs}
                  keyExtractor={(p) => p.id}
                  emptyMessage="No paragraphs yet. Click 'Add Paragraph' to get started!"
                  renderItem={(paragraph: RequestDemoParagraph) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 line-clamp-2">{paragraph.content}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingParagraph(paragraph);
                            setShowParagraphModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteParagraph(paragraph.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                <button
                  onClick={() => {
                    setEditingFeature({ id: 0, title: '', content: '', iconImageId: null, orderIndex: features.length });
                    setShowFeatureModal(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>Add Feature
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  <i className="ri-information-line mr-2"></i>
                  Add feature blocks with icon, title, and content. Drag and drop to reorder.
                </p>
                <DragDropList
                  items={features}
                  onReorder={handleReorderFeatures}
                  keyExtractor={(f) => f.id}
                  emptyMessage="No features yet. Click 'Add Feature' to get started!"
                  renderItem={(feature: RequestDemoFeature) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3 flex-1">
                        {feature.iconImage && (
                          <img 
                            src={getFeatureIconUrl(feature)} 
                            alt={feature.iconImage.altText || feature.title}
                            className="w-10 h-10 object-contain"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{feature.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingFeature(feature);
                            setShowFeatureModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteFeature(feature.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showParagraphModal && (
        <ParagraphModal
          paragraph={editingParagraph}
          onSave={handleSaveParagraph}
          onClose={() => {
            setShowParagraphModal(false);
            setEditingParagraph(null);
          }}
          saving={saving}
        />
      )}

      {showFeatureModal && (
        <FeatureModal
          feature={editingFeature}
          onSave={handleSaveFeature}
          onClose={() => {
            setShowFeatureModal(false);
            setEditingFeature(null);
          }}
          saving={saving}
        />
      )}
    </div>
  );
}

function getFeatureIconUrl(feature: RequestDemoFeature): string {
  if (!feature.iconImage) return '';
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  return `${baseUrl}${feature.iconImage.filePath}`;
}

function ParagraphModal({ paragraph, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(paragraph || { id: 0, content: '', orderIndex: 0 });

  useEffect(() => {
    setFormData(paragraph || { id: 0, content: '', orderIndex: 0 });
  }, [paragraph]);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={paragraph?.id && paragraph.id > 0 ? 'Edit Paragraph' : 'Add Paragraph'}
      size="lg"
    >
      <div className="space-y-6">
        <FormField label="Content" required>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter paragraph content"
          />
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
            disabled={saving || !formData.content}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : paragraph?.id && paragraph.id > 0 ? 'Update Paragraph' : 'Create Paragraph'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function FeatureModal({ feature, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(feature || { id: 0, title: '', content: '', iconImageId: null, orderIndex: 0 });
  const getImageUrl = (image: any): string => {
    if (!image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${image.filePath}`;
  };

  useEffect(() => {
    setFormData(feature || { id: 0, title: '', content: '', iconImageId: null, orderIndex: 0 });
  }, [feature]);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={feature?.id && feature.id > 0 ? 'Edit Feature' : 'Add Feature'}
      size="lg"
    >
      <div className="space-y-6">
        <FormField label="Title" required>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., System Variety"
          />
        </FormField>
        <FormField label="Content" required>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., We offer 15+ models ranging from portable to high-powered fixed machines..."
          />
        </FormField>
        <ImageSelector
          value={formData.iconImageId}
          onChange={(id) => setFormData({ ...formData, iconImageId: id })}
          label="Icon Image (JPG, PNG, SVG)"
        />
        {formData.iconImage && (
          <div className="mt-2">
            <img 
              src={getImageUrl(formData.iconImage)} 
              alt="Icon preview" 
              className="w-16 h-16 object-contain"
            />
          </div>
        )}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.title || !formData.content}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : feature?.id && feature.id > 0 ? 'Update Feature' : 'Create Feature'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
