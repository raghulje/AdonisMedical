import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

type TabType = 'content' | 'documents';

interface InvestorRelationsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
}

interface InvestorDocument {
  id: number;
  title: string;
  description: string | null;
  fileId: number | null;
  documentType: string | null;
  publishDate: string | null;
  orderIndex: number;
  isActive: boolean;
  file?: {
    filePath: string;
    fileName: string;
  };
}

export default function InvestorRelationsPageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [pageContent, setPageContent] = useState<InvestorRelationsPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    introText: null
  });

  const [documents, setDocuments] = useState<InvestorDocument[]>([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState<InvestorDocument | null>(null);

  useEffect(() => {
    if (activeTab === 'content') {
      fetchPageContent();
    } else {
      fetchDocuments();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<InvestorRelationsPageContent>('/investor-relations');
      if (response.success && response.data) {
        setPageContent(response.data as InvestorRelationsPageContent);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await api.get<InvestorDocument[]>('/investor-relations/documents');
      if (response.success && response.data) {
        setDocuments((response.data as InvestorDocument[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSaving(true);
    try {
      await api.put('/investor-relations', pageContent);
      alert('Page content saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (reorderedDocs: InvestorDocument[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedDocs.length; i++) {
        await api.put(`/investor-relations/documents/${reorderedDocs[i].id}`, {
          ...reorderedDocs[i],
          orderIndex: i
        });
      }
      setDocuments(reorderedDocs);
      alert('Documents order updated!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDocument = async (doc: InvestorDocument) => {
    setSaving(true);
    try {
      if (doc.id && doc.id > 0) {
        await api.put(`/investor-relations/documents/${doc.id}`, doc);
      } else {
        await api.post('/investor-relations/documents', { ...doc, orderIndex: documents.length });
      }
      setShowDocumentModal(false);
      setEditingDocument(null);
      fetchDocuments();
      alert('Document saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDocument = async (id: number) => {
    if (!confirm('Delete this document?')) return;
    setSaving(true);
    try {
      await api.delete(`/investor-relations/documents/${id}`);
      setDocuments(documents.filter(d => d.id !== id));
      alert('Document deleted!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium text-gray-900">Investor Relations</h2>
        <p className="text-sm text-gray-600 mt-1">Manage page content and investor documents</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${
                activeTab === 'content' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'
              }`}
            >
              Page Content
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${
                activeTab === 'documents' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'
              }`}
            >
              Documents
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
                <button
                  onClick={handleSavePageContent}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Hero Title">
                  <input
                    type="text"
                    value={pageContent.heroTitle || ''}
                    onChange={(e) => setPageContent({ ...pageContent, heroTitle: e.target.value || null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </FormField>
                <FormField label="Hero Subtitle">
                  <input
                    type="text"
                    value={pageContent.heroSubtitle || ''}
                    onChange={(e) => setPageContent({ ...pageContent, heroSubtitle: e.target.value || null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </FormField>
                <div className="md:col-span-2">
                  <ImageSelector
                    value={pageContent.heroImageId}
                    onChange={(id) => setPageContent({ ...pageContent, heroImageId: id })}
                    label="Hero Image"
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField label="Intro Text">
                    <textarea
                      value={pageContent.introText || ''}
                      onChange={(e) => setPageContent({ ...pageContent, introText: e.target.value || null })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </FormField>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Investor Documents</h3>
                <button
                  onClick={() => {
                    setEditingDocument({
                      id: 0,
                      title: '',
                      description: null,
                      fileId: null,
                      documentType: null,
                      publishDate: null,
                      orderIndex: documents.length,
                      isActive: true
                    });
                    setShowDocumentModal(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>Add Document
                </button>
              </div>
              {documents.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-file-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No documents yet</p>
                </div>
              ) : (
                <DragDropList
                  items={documents}
                  onReorder={handleReorder}
                  keyExtractor={(doc) => doc.id}
                  renderItem={(doc: InvestorDocument) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                        {doc.documentType && <p className="text-sm text-gray-600">{doc.documentType}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${doc.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {doc.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button onClick={() => { setEditingDocument(doc); setShowDocumentModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button onClick={() => handleDeleteDocument(doc.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
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

      {showDocumentModal && editingDocument && (
        <DocumentModal
          document={editingDocument}
          onSave={handleSaveDocument}
          onClose={() => { setShowDocumentModal(false); setEditingDocument(null); }}
          saving={saving}
        />
      )}
    </div>
  );
}

function DocumentModal({ document, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<InvestorDocument>(document);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}/api/v1/upload/file`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token || ''}` },
        body: formDataObj
      });
      const data = await response.json();
      if (data.success && data.mediaId) {
        setFormData({ ...formData, fileId: data.mediaId });
      }
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={document.id > 0 ? 'Edit Document' : 'Add Document'} size="lg">
      <div className="space-y-6">
        <FormField label="Title" required>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="Description">
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="Document Type">
          <select
            value={formData.documentType || ''}
            onChange={(e) => setFormData({ ...formData, documentType: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="Annual Report">Annual Report</option>
            <option value="Quarterly Report">Quarterly Report</option>
            <option value="Press Release">Press Release</option>
            <option value="Other">Other</option>
          </select>
        </FormField>
        <FormField label="Publish Date">
          <input
            type="date"
            value={formData.publishDate ? new Date(formData.publishDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="Document File">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
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
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.title}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
