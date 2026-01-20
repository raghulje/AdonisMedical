import { useState, useEffect } from 'react';
import { api } from '../../../../../utils/api';
import Modal from '../../../../../components/cms/Modal';
import FormField from '../../../../../components/cms/FormField';
import DragDropList from '../../../../../components/cms/DragDropList';
import ImageSelector from '../../../../../components/cms/ImageSelector';

type TabType = 'content' | 'images' | 'features' | 'variants';

interface HfCArm1kPageContent {
  id?: number;
  title: string | null;
  mainImageId: number | null;
  deploymentInfo: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
}

interface HfCArm1kImage {
  id: number;
  imageId: number;
  orderIndex: number;
  isPrimary: boolean;
  image?: { filePath: string; altText: string; };
}

interface HfCArm1kFeature {
  id: number;
  featureText: string;
  orderIndex: number;
}

interface HfCArm1kVariant {
  id: number;
  variantName: string;
  orderIndex: number;
  isActive: boolean;
}

export default function HfCArm1kPageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pageContent, setPageContent] = useState<HfCArm1kPageContent>({ title: null, mainImageId: null, deploymentInfo: null, shortDescription: null, fullDescription: null });
  const [images, setImages] = useState<HfCArm1kImage[]>([]);
  const [features, setFeatures] = useState<HfCArm1kFeature[]>([]);
  const [variants, setVariants] = useState<HfCArm1kVariant[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [editingImage, setEditingImage] = useState<HfCArm1kImage | null>(null);
  const [editingFeature, setEditingFeature] = useState<HfCArm1kFeature | null>(null);
  const [editingVariant, setEditingVariant] = useState<HfCArm1kVariant | null>(null);

  useEffect(() => {
    if (activeTab === 'content') fetchPageContent();
    else if (activeTab === 'images') fetchImages();
    else if (activeTab === 'features') fetchFeatures();
    else fetchVariants();
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<HfCArm1kPageContent>('/products/hf-c-arm-1k');
      if (response.success && response.data) setPageContent(response.data as HfCArm1kPageContent);
    } catch (error: any) { alert(error.message || 'Failed to load'); } finally { setLoading(false); }
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await api.get<HfCArm1kImage[]>('/products/hf-c-arm-1k/images');
      if (response.success && response.data) setImages((response.data as HfCArm1kImage[]).sort((a, b) => a.orderIndex - b.orderIndex));
    } catch (error: any) { alert(error.message || 'Failed to load'); } finally { setLoading(false); }
  };

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const response = await api.get<HfCArm1kFeature[]>('/products/hf-c-arm-1k/features');
      if (response.success && response.data) setFeatures((response.data as HfCArm1kFeature[]).sort((a, b) => a.orderIndex - b.orderIndex));
    } catch (error: any) { alert(error.message || 'Failed to load'); } finally { setLoading(false); }
  };

  const fetchVariants = async () => {
    setLoading(true);
    try {
      const response = await api.get<HfCArm1kVariant[]>('/products/hf-c-arm-1k/variants');
      if (response.success && response.data) setVariants((response.data as HfCArm1kVariant[]).sort((a, b) => a.orderIndex - b.orderIndex));
    } catch (error: any) { alert(error.message || 'Failed to load'); } finally { setLoading(false); }
  };

  const handleSavePageContent = async () => {
    setSaving(true);
    try {
      await api.put('/products/hf-c-arm-1k', pageContent);
      alert('Page content saved!');
    } catch (error: any) { alert(error.message || 'Failed to save'); } finally { setSaving(false); }
  };

  const handleReorderImages = async (reordered: HfCArm1kImage[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reordered.length; i++) {
        await api.put(`/products/hf-c-arm-1k/images/${reordered[i].id}`, { ...reordered[i], orderIndex: i });
      }
      setImages(reordered);
      alert('Images order updated!');
    } catch (error: any) { alert(error.message || 'Failed to update'); } finally { setSaving(false); }
  };

  const handleSaveImage = async (image: HfCArm1kImage) => {
    setSaving(true);
    try {
      if (image.id && image.id > 0) await api.put(`/products/hf-c-arm-1k/images/${image.id}`, image);
      else await api.post('/products/hf-c-arm-1k/images', { ...image, orderIndex: images.length });
      setShowImageModal(false);
      setEditingImage(null);
      fetchImages();
      alert('Image saved!');
    } catch (error: any) { alert(error.message || 'Failed to save'); } finally { setSaving(false); }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    setSaving(true);
    try {
      await api.delete(`/products/hf-c-arm-1k/images/${id}`);
      setImages(images.filter(i => i.id !== id));
      alert('Image deleted!');
    } catch (error: any) { alert(error.message || 'Failed to delete'); } finally { setSaving(false); }
  };

  const handleReorderFeatures = async (reordered: HfCArm1kFeature[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reordered.length; i++) {
        await api.put(`/products/hf-c-arm-1k/features/${reordered[i].id}`, { ...reordered[i], orderIndex: i });
      }
      setFeatures(reordered);
      alert('Features order updated!');
    } catch (error: any) { alert(error.message || 'Failed to update'); } finally { setSaving(false); }
  };

  const handleSaveFeature = async (feature: HfCArm1kFeature) => {
    setSaving(true);
    try {
      if (feature.id && feature.id > 0) await api.put(`/products/hf-c-arm-1k/features/${feature.id}`, feature);
      else await api.post('/products/hf-c-arm-1k/features', { ...feature, orderIndex: features.length });
      setShowFeatureModal(false);
      setEditingFeature(null);
      fetchFeatures();
      alert('Feature saved!');
    } catch (error: any) { alert(error.message || 'Failed to save'); } finally { setSaving(false); }
  };

  const handleDeleteFeature = async (id: number) => {
    if (!confirm('Delete this feature?')) return;
    setSaving(true);
    try {
      await api.delete(`/products/hf-c-arm-1k/features/${id}`);
      setFeatures(features.filter(f => f.id !== id));
      alert('Feature deleted!');
    } catch (error: any) { alert(error.message || 'Failed to delete'); } finally { setSaving(false); }
  };

  const handleReorderVariants = async (reordered: HfCArm1kVariant[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reordered.length; i++) {
        await api.put(`/products/hf-c-arm-1k/variants/${reordered[i].id}`, { ...reordered[i], orderIndex: i });
      }
      setVariants(reordered);
      alert('Variants order updated!');
    } catch (error: any) { alert(error.message || 'Failed to update'); } finally { setSaving(false); }
  };

  const handleSaveVariant = async (variant: HfCArm1kVariant) => {
    setSaving(true);
    try {
      if (variant.id && variant.id > 0) await api.put(`/products/hf-c-arm-1k/variants/${variant.id}`, variant);
      else await api.post('/products/hf-c-arm-1k/variants', { ...variant, orderIndex: variants.length });
      setShowVariantModal(false);
      setEditingVariant(null);
      fetchVariants();
      alert('Variant saved!');
    } catch (error: any) { alert(error.message || 'Failed to save'); } finally { setSaving(false); }
  };

  const handleDeleteVariant = async (id: number) => {
    if (!confirm('Delete this variant?')) return;
    setSaving(true);
    try {
      await api.delete(`/products/hf-c-arm-1k/variants/${id}`);
      setVariants(variants.filter(v => v.id !== id));
      alert('Variant deleted!');
    } catch (error: any) { alert(error.message || 'Failed to delete'); } finally { setSaving(false); }
  };

  const getImageUrl = (image: any): string => {
    if (!image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${image.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium text-gray-900">1K*1K High End HF C-ARM Product Page</h2>
        <p className="text-sm text-gray-600 mt-1">Manage product content, images, features, and variants</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            {[{ id: 'content' as TabType, label: 'Content', icon: 'ri-file-text-line' }, { id: 'images' as TabType, label: 'Images', icon: 'ri-image-line' }, { id: 'features' as TabType, label: 'Features', icon: 'ri-star-line' }, { id: 'variants' as TabType, label: 'Variants', icon: 'ri-list-check' }].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer flex items-center space-x-2 ${activeTab === tab.id ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
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
                <button onClick={handleSavePageContent} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Product Title"><input type="text" value={pageContent.title || ''} onChange={(e) => setPageContent({ ...pageContent, title: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
                <FormField label="Deployment Info"><input type="text" value={pageContent.deploymentInfo || ''} onChange={(e) => setPageContent({ ...pageContent, deploymentInfo: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
                <div className="md:col-span-2"><ImageSelector value={pageContent.mainImageId} onChange={(id) => setPageContent({ ...pageContent, mainImageId: id })} label="Main Product Image" /></div>
                <div className="md:col-span-2"><FormField label="Short Description"><textarea value={pageContent.shortDescription || ''} onChange={(e) => setPageContent({ ...pageContent, shortDescription: e.target.value || null })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField></div>
                <div className="md:col-span-2"><FormField label="Full Description"><textarea value={pageContent.fullDescription || ''} onChange={(e) => setPageContent({ ...pageContent, fullDescription: e.target.value || null })} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField></div>
              </div>
            </div>
          ) : activeTab === 'images' ? (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Product Images</h3>
                <button onClick={() => { setEditingImage({ id: 0, imageId: 0, orderIndex: images.length, isPrimary: false }); setShowImageModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"><i className="ri-add-line mr-2"></i>Add Image</button>
              </div>
              {images.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-image-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No images yet</p>
                </div>
              ) : (
                <DragDropList items={images} onReorder={handleReorderImages} keyExtractor={(img) => img.id} renderItem={(img: HfCArm1kImage) => (
                  <div className="flex items-center space-x-4 w-full">
                    {img.image && <img src={getImageUrl(img.image)} alt="Product" className="w-20 h-20 object-cover rounded-lg" />}
                    <div className="flex-1">{img.isPrimary && <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-1 inline-block">Primary</span>}</div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => { setEditingImage(img); setShowImageModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"><i className="ri-edit-line"></i></button>
                      <button onClick={() => handleDeleteImage(img.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><i className="ri-delete-bin-line"></i></button>
                    </div>
                  </div>
                )} />
              )}
            </div>
          ) : activeTab === 'features' ? (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Product Features</h3>
                <button onClick={() => { setEditingFeature({ id: 0, featureText: '', orderIndex: features.length }); setShowFeatureModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"><i className="ri-add-line mr-2"></i>Add Feature</button>
              </div>
              {features.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-star-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No features yet</p>
                </div>
              ) : (
                <DragDropList items={features} onReorder={handleReorderFeatures} keyExtractor={(f) => f.id} renderItem={(feature: HfCArm1kFeature) => (
                  <div className="flex items-center justify-between w-full">
                    <p className="text-gray-700">{feature.featureText}</p>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => { setEditingFeature(feature); setShowFeatureModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"><i className="ri-edit-line"></i></button>
                      <button onClick={() => handleDeleteFeature(feature.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><i className="ri-delete-bin-line"></i></button>
                    </div>
                  </div>
                )} />
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Product Variants</h3>
                <button onClick={() => { setEditingVariant({ id: 0, variantName: '', orderIndex: variants.length, isActive: true }); setShowVariantModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"><i className="ri-add-line mr-2"></i>Add Variant</button>
              </div>
              {variants.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-list-check text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No variants yet</p>
                </div>
              ) : (
                <DragDropList items={variants} onReorder={handleReorderVariants} keyExtractor={(v) => v.id} renderItem={(variant: HfCArm1kVariant) => (
                  <div className="flex items-center justify-between w-full">
                    <div><h4 className="font-semibold text-gray-900">{variant.variantName}</h4></div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${variant.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{variant.isActive ? 'Active' : 'Inactive'}</span>
                      <button onClick={() => { setEditingVariant(variant); setShowVariantModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"><i className="ri-edit-line"></i></button>
                      <button onClick={() => handleDeleteVariant(variant.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><i className="ri-delete-bin-line"></i></button>
                    </div>
                  </div>
                )} />
              )}
            </div>
          )}
        </div>
      </div>
      {showImageModal && editingImage && <ImageModal image={editingImage} onSave={handleSaveImage} onClose={() => { setShowImageModal(false); setEditingImage(null); }} saving={saving} />}
      {showFeatureModal && editingFeature && <FeatureModal feature={editingFeature} onSave={handleSaveFeature} onClose={() => { setShowFeatureModal(false); setEditingFeature(null); }} saving={saving} />}
      {showVariantModal && editingVariant && <VariantModal variant={editingVariant} onSave={handleSaveVariant} onClose={() => { setShowVariantModal(false); setEditingVariant(null); }} saving={saving} />}
    </div>
  );
}

function ImageModal({ image, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(image);
  return (
    <Modal isOpen={true} onClose={onClose} title={image.id > 0 ? 'Edit Image' : 'Add Image'} size="md">
      <div className="space-y-6">
        <ImageSelector value={formData.imageId} onChange={(id) => setFormData({ ...formData, imageId: id })} label="Product Image" required />
        <FormField label="Set as Primary Image">
          <select value={formData.isPrimary ? 'yes' : 'no'} onChange={(e) => setFormData({ ...formData, isPrimary: e.target.value === 'yes' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.imageId} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

function FeatureModal({ feature, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(feature);
  return (
    <Modal isOpen={true} onClose={onClose} title={feature.id > 0 ? 'Edit Feature' : 'Add Feature'} size="md">
      <div className="space-y-6">
        <FormField label="Feature Text" required>
          <textarea value={formData.featureText} onChange={(e) => setFormData({ ...formData, featureText: e.target.value })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.featureText} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

function VariantModal({ variant, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(variant);
  return (
    <Modal isOpen={true} onClose={onClose} title={variant.id > 0 ? 'Edit Variant' : 'Add Variant'} size="md">
      <div className="space-y-6">
        <FormField label="Variant Name" required>
          <input type="text" value={formData.variantName} onChange={(e) => setFormData({ ...formData, variantName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <FormField label="Status">
          <select value={formData.isActive ? 'active' : 'inactive'} onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.variantName} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

