import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

type TabType = 'content' | 'features';

interface ProductionFacilityPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  flexibilityHeading: string | null;
  flexibilityContent: string | null;
  flexibilityImageId: number | null;
  qualityHeading: string | null;
  qualityContent: string | null;
  qualityImageId: number | null;
}

interface ProductionFacilityFeature {
  id: number;
  iconClass: string | null;
  heading: string | null;
  description: string | null;
  orderIndex: number;
}

export default function ProductionFacilityPageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [pageContent, setPageContent] = useState<ProductionFacilityPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    introText: null,
    flexibilityHeading: null,
    flexibilityContent: null,
    flexibilityImageId: null,
    qualityHeading: null,
    qualityContent: null,
    qualityImageId: null
  });

  const [features, setFeatures] = useState<ProductionFacilityFeature[]>([]);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState<ProductionFacilityFeature | null>(null);

  useEffect(() => {
    if (activeTab === 'content') {
      fetchPageContent();
    } else {
      fetchFeatures();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<ProductionFacilityPageContent>('/production-facility');
      if (response.success && response.data) {
        setPageContent(response.data as ProductionFacilityPageContent);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const response = await api.get<ProductionFacilityFeature[]>('/production-facility/features');
      if (response.success && response.data) {
        setFeatures((response.data as ProductionFacilityFeature[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSaving(true);
    try {
      await api.put('/production-facility', pageContent);
      alert('Saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (reorderedFeatures: ProductionFacilityFeature[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedFeatures.length; i++) {
        await api.put(`/production-facility/features/${reorderedFeatures[i].id}`, {
          ...reorderedFeatures[i],
          orderIndex: i
        });
      }
      setFeatures(reorderedFeatures);
      alert('Order updated!');
    } catch (error: any) {
      alert(error.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFeature = async (feature: ProductionFacilityFeature) => {
    setSaving(true);
    try {
      if (feature.id && feature.id > 0) {
        await api.put(`/production-facility/features/${feature.id}`, feature);
      } else {
        await api.post('/production-facility/features', { ...feature, orderIndex: features.length });
      }
      setShowFeatureModal(false);
      setEditingFeature(null);
      fetchFeatures();
      alert('Feature saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFeature = async (id: number) => {
    if (!confirm('Delete this feature?')) return;
    setSaving(true);
    try {
      await api.delete(`/production-facility/features/${id}`);
      setFeatures(features.filter(f => f.id !== id));
      alert('Feature deleted!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900">Production Facility</h2>
        <p className="text-sm text-gray-600 mt-1">Manage page content and facility features</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            <button onClick={() => setActiveTab('content')} className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeTab === 'content' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
              Page Content
            </button>
            <button onClick={() => setActiveTab('features')} className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeTab === 'features' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
              Features
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
            </div>
          ) : activeTab === 'content' ? (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Page Content</h3>
                <button onClick={handleSavePageContent} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Hero Title"><input type="text" value={pageContent.heroTitle || ''} onChange={(e) => setPageContent({ ...pageContent, heroTitle: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
                <FormField label="Hero Subtitle"><input type="text" value={pageContent.heroSubtitle || ''} onChange={(e) => setPageContent({ ...pageContent, heroSubtitle: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
                <div className="md:col-span-2"><ImageSelector value={pageContent.heroImageId} onChange={(id) => setPageContent({ ...pageContent, heroImageId: id })} label="Hero Image" /></div>
                <div className="md:col-span-2"><FormField label="Intro Text"><textarea value={pageContent.introText || ''} onChange={(e) => setPageContent({ ...pageContent, introText: e.target.value || null })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField></div>
                <FormField label="Flexibility Heading"><input type="text" value={pageContent.flexibilityHeading || ''} onChange={(e) => setPageContent({ ...pageContent, flexibilityHeading: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
                <div className="md:col-span-2"><FormField label="Flexibility Content"><textarea value={pageContent.flexibilityContent || ''} onChange={(e) => setPageContent({ ...pageContent, flexibilityContent: e.target.value || null })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField></div>
                <div className="md:col-span-2"><ImageSelector value={pageContent.flexibilityImageId} onChange={(id) => setPageContent({ ...pageContent, flexibilityImageId: id })} label="Flexibility Image" /></div>
                <FormField label="Quality Heading"><input type="text" value={pageContent.qualityHeading || ''} onChange={(e) => setPageContent({ ...pageContent, qualityHeading: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
                <div className="md:col-span-2"><FormField label="Quality Content"><textarea value={pageContent.qualityContent || ''} onChange={(e) => setPageContent({ ...pageContent, qualityContent: e.target.value || null })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField></div>
                <div className="md:col-span-2"><ImageSelector value={pageContent.qualityImageId} onChange={(id) => setPageContent({ ...pageContent, qualityImageId: id })} label="Quality Image" /></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Facility Features</h3>
                <button onClick={() => { setEditingFeature({ id: 0, iconClass: null, heading: null, description: null, orderIndex: features.length }); setShowFeatureModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                  <i className="ri-add-line mr-2"></i>Add Feature
                </button>
              </div>
              {features.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-settings-3-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No features yet</p>
                </div>
              ) : (
                <DragDropList
                  items={features}
                  onReorder={handleReorder}
                  keyExtractor={(f) => f.id}
                  renderItem={(feature: ProductionFacilityFeature) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        {feature.iconClass && <i className={`${feature.iconClass} text-2xl text-blue-600`}></i>}
                        <div>
                          <h4 className="font-semibold text-gray-900">{feature.heading}</h4>
                          {feature.description && <p className="text-sm text-gray-600 line-clamp-1">{feature.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => { setEditingFeature(feature); setShowFeatureModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button onClick={() => handleDeleteFeature(feature.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
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

      {showFeatureModal && editingFeature && (
        <FeatureModal
          feature={editingFeature}
          onSave={handleSaveFeature}
          onClose={() => { setShowFeatureModal(false); setEditingFeature(null); }}
          saving={saving}
        />
      )}
    </div>
  );
}

function FeatureModal({ feature, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<ProductionFacilityFeature>(feature);

  return (
    <Modal isOpen={true} onClose={onClose} title={feature.id > 0 ? 'Edit Feature' : 'Add Feature'} size="md">
      <div className="space-y-6">
        <FormField label="Icon Class" hint="RemixIcon class">
          <input type="text" value={formData.iconClass || ''} onChange={(e) => setFormData({ ...formData, iconClass: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="ri-settings-3-line" />
          {formData.iconClass && <div className="mt-2 text-xs text-gray-500">Preview: <i className={formData.iconClass}></i></div>}
        </FormField>
        <FormField label="Heading">
          <input type="text" value={formData.heading || ''} onChange={(e) => setFormData({ ...formData, heading: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <FormField label="Description">
          <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value || null })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
