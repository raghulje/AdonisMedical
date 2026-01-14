import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

type TabType = 'content' | 'certifications';

interface QualityAssurancePageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  mainHeading: string | null;
  mainContent: string | null;
  mainImageId: number | null;
}

interface Certification {
  id: number;
  name: string;
  abbreviation: string | null;
  logoId: number | null;
  description: string | null;
  orderIndex: number;
  isActive: boolean;
  logo?: {
    filePath: string;
    altText: string;
  };
}

export default function QualityAssurancePageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [pageContent, setPageContent] = useState<QualityAssurancePageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    introText: null,
    mainHeading: null,
    mainContent: null,
    mainImageId: null
  });

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (activeTab === 'content') {
      fetchPageContent();
    } else {
      fetchCertifications();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<QualityAssurancePageContent>('/quality-assurance');
      if (response.success && response.data) {
        setPageContent(response.data as QualityAssurancePageContent);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const response = await api.get<Certification[]>('/quality-assurance/certifications');
      if (response.success && response.data) {
        setCertifications((response.data as Certification[]).sort((a, b) => a.orderIndex - b.orderIndex));
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
      await api.put('/quality-assurance', pageContent);
      alert('Saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (reorderedCerts: Certification[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedCerts.length; i++) {
        await api.put(`/quality-assurance/certifications/${reorderedCerts[i].id}`, {
          ...reorderedCerts[i],
          orderIndex: i
        });
      }
      setCertifications(reorderedCerts);
      alert('Order updated!');
    } catch (error: any) {
      alert(error.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCert = async (cert: Certification) => {
    setSaving(true);
    try {
      if (cert.id && cert.id > 0) {
        await api.put(`/quality-assurance/certifications/${cert.id}`, cert);
      } else {
        await api.post('/quality-assurance/certifications', { ...cert, orderIndex: certifications.length });
      }
      setShowCertModal(false);
      setEditingCert(null);
      fetchCertifications();
      alert('Certification saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCert = async (id: number) => {
    if (!confirm('Delete this certification?')) return;
    setSaving(true);
    try {
      await api.delete(`/quality-assurance/certifications/${id}`);
      setCertifications(certifications.filter(c => c.id !== id));
      alert('Certification deleted!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const getImageUrl = (cert: Certification): string => {
    if (!cert.logo) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${cert.logo.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900">Quality Assurance</h2>
        <p className="text-sm text-gray-600 mt-1">Manage page content and certifications</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            <button onClick={() => setActiveTab('content')} className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeTab === 'content' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
              Page Content
            </button>
            <button onClick={() => setActiveTab('certifications')} className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeTab === 'certifications' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
              Certifications
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
                <FormField label="Main Heading"><input type="text" value={pageContent.mainHeading || ''} onChange={(e) => setPageContent({ ...pageContent, mainHeading: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
                <div className="md:col-span-2"><FormField label="Main Content"><textarea value={pageContent.mainContent || ''} onChange={(e) => setPageContent({ ...pageContent, mainContent: e.target.value || null })} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField></div>
                <div className="md:col-span-2"><ImageSelector value={pageContent.mainImageId} onChange={(id) => setPageContent({ ...pageContent, mainImageId: id })} label="Main Image" /></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Certifications</h3>
                <button onClick={() => { setEditingCert({ id: 0, name: '', abbreviation: null, logoId: null, description: null, orderIndex: certifications.length, isActive: true }); setShowCertModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                  <i className="ri-add-line mr-2"></i>Add Certification
                </button>
              </div>
              {certifications.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-shield-check-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No certifications yet</p>
                </div>
              ) : (
                <DragDropList
                  items={certifications}
                  onReorder={handleReorder}
                  keyExtractor={(c) => c.id}
                  renderItem={(cert: Certification) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        {cert.logo && <img src={getImageUrl(cert)} alt={cert.name} className="w-12 h-12 object-contain" />}
                        <div>
                          <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                          {cert.abbreviation && <p className="text-sm text-gray-600">{cert.abbreviation}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${cert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {cert.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button onClick={() => { setEditingCert(cert); setShowCertModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button onClick={() => handleDeleteCert(cert.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
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

      {showCertModal && editingCert && (
        <CertModal
          cert={editingCert}
          onSave={handleSaveCert}
          onClose={() => { setShowCertModal(false); setEditingCert(null); }}
          saving={saving}
        />
      )}
    </div>
  );
}

function CertModal({ cert, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<Certification>(cert);

  return (
    <Modal isOpen={true} onClose={onClose} title={cert.id > 0 ? 'Edit Certification' : 'Add Certification'} size="lg">
      <div className="space-y-6">
        <FormField label="Certification Name" required>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <FormField label="Abbreviation">
          <input type="text" value={formData.abbreviation || ''} onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="ISO 13485" />
        </FormField>
        <FormField label="Description">
          <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value || null })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <ImageSelector value={formData.logoId} onChange={(id) => setFormData({ ...formData, logoId: id })} label="Certification Logo" aspectRatio="1/1" />
        <FormField label="Status">
          <select value={formData.isActive ? 'active' : 'inactive'} onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.name} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
