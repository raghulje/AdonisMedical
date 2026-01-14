import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';
import { getImageUrl } from '../../../../utils/imageUrl';

type TabType = 'content' | 'clients';

interface ClientsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  heroImage?: { filePath: string };
}

interface Client {
  id: number;
  name: string;
  logoId: number | null;
  websiteUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  logo?: {
    filePath: string;
    altText: string;
    fileName: string;
  };
}

export default function ClientsPageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);

  // Page Content
  const [pageContent, setPageContent] = useState<ClientsPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    introText: null
  });

  useEffect(() => {
    if (activeTab === 'content') {
      fetchPageContent();
    } else {
      fetchClients();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<ClientsPageContent>('/clients/page-content');
      if (response.success && response.data) {
        const data = response.data as ClientsPageContent;
        setPageContent({
          id: data.id || undefined,
          heroTitle: data.heroTitle || null,
          heroSubtitle: data.heroSubtitle || null,
          heroImageId: data.heroImageId || null,
          introText: data.introText || null,
          heroImage: data.heroImage
        });
      }
    } catch (error: any) {
      console.error('Error fetching page content:', error);
      // Don't show alert for "not found" - it's okay if content doesn't exist yet
      if (!error.message?.includes('not found')) {
        alert(error.message || 'Failed to load page content');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await api.get<Client[]>('/clients');
      if (response.success && response.data) {
        setClients((response.data as Client[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching clients:', error);
      alert(error.message || 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePageContent = async () => {
    setSaving(true);
    try {
      // Only send the fields that should be updated
      const payload = {
        heroTitle: pageContent.heroTitle || null,
        heroSubtitle: pageContent.heroSubtitle || null,
        heroImageId: pageContent.heroImageId || null,
        introText: pageContent.introText || null
      };
      
      const response = await api.put('/clients/page-content', payload);
      if (response.success) {
        alert('Page content saved successfully!');
        fetchPageContent(); // Refresh to get updated data with associations
      } else {
        throw new Error(response.message || 'Failed to save page content');
      }
    } catch (error: any) {
      console.error('Error saving page content:', error);
      alert(error.message || 'Failed to save page content');
    } finally {
      setSaving(false);
    }
  };

  // Extract client name from logo filename or use existing name
  const getClientDisplayName = (client: Client): string => {
    // If name exists and is not generic, use it
    if (client.name && !client.name.match(/^Client\s+\d+$/i)) {
      return client.name;
    }
    
    // Try to extract from logo altText
    if (client.logo?.altText) {
      return client.logo.altText;
    }
    
    // Try to extract from logo filename (remove extension and clean up)
    if (client.logo?.fileName) {
      const name = client.logo.fileName
        .replace(/\.[^/.]+$/, '') // Remove extension
        .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
        .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
      if (name && name !== 'Logo') {
        return name;
      }
    }
    
    // Fallback to original name
    return client.name || 'Unnamed Client';
  };

  const handleReorder = async (reorderedClients: Client[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedClients.length; i++) {
        await api.put(`/clients/${reorderedClients[i].id}`, {
          ...reorderedClients[i],
          orderIndex: i
        });
      }
      setClients(reorderedClients);
      alert('Clients order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveClient = async (client: Client) => {
    setSaving(true);
    try {
      if (client.id && client.id > 0) {
        const response = await api.put(`/clients/${client.id}`, client);
        if (!response.success) {
          throw new Error(response.message || 'Failed to update client');
        }
      } else {
        const response = await api.post('/clients', { ...client, orderIndex: clients.length });
        if (!response.success) {
          throw new Error(response.message || 'Failed to create client');
        }
      }
      setShowClientModal(false);
      setEditingClient(null);
      fetchClients();
      alert('Client saved successfully!');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to save client';
      if (errorMessage.includes('not found')) {
        alert('This client no longer exists. Please refresh the page and try again.');
        fetchClients(); // Refresh the list
      } else {
        alert(errorMessage);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    setSaving(true);
    try {
      const response = await api.delete(`/clients/${id}`);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete client');
      }
      setClients(clients.filter(c => c.id !== id));
      alert('Client deleted successfully!');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete client';
      if (errorMessage.includes('not found')) {
        alert('This client no longer exists. The list will be refreshed.');
        fetchClients(); // Refresh the list
      } else {
        alert(errorMessage);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clients Page Management</h2>
            <p className="text-sm text-gray-600 mt-1">Manage clients page content and client list</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="ri-file-text-line mr-2"></i>Page Content
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'clients'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="ri-group-line mr-2"></i>Clients List
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'content' ? (
        <PageContentEditor
          content={pageContent}
          onChange={setPageContent}
          onSave={handleSavePageContent}
          saving={saving}
        />
      ) : (
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Clients</h3>
                <p className="text-sm text-gray-600 mt-1">Manage client logos and information</p>
              </div>
              <button
                onClick={() => {
                  setEditingClient({
                    id: 0,
                    name: '',
                    logoId: null,
                    websiteUrl: '',
                    orderIndex: clients.length,
                    isActive: true
                  });
                  setShowClientModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>Add Client
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
              <div className="flex-1">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Drag and drop clients to reorder them. The order will appear on your clients page.
                </p>
              </div>
            </div>
          </div>

              {loading ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
              <p className="text-gray-600 mt-2">Loading clients...</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <i className="ri-user-heart-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 mb-4">No clients yet. Add your first client!</p>
              <button
                onClick={() => {
                  setEditingClient({
                    id: 0,
                    name: '',
                    logoId: null,
                    websiteUrl: '',
                    orderIndex: 0,
                    isActive: true
                  });
                  setShowClientModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>Add Client
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <DragDropList
                items={clients}
                onReorder={handleReorder}
                keyExtractor={(client) => client.id}
                emptyMessage="No clients yet. Click 'Add Client' to get started!"
                renderItem={(client: Client) => (
                  <div className="flex items-center space-x-4 w-full">
                    {client.logo && (
                      <img
                        src={getImageUrl(client.logo)}
                        alt={getClientDisplayName(client)}
                        className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{getClientDisplayName(client)}</h3>
                      {client.websiteUrl && (
                        <a
                          href={client.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          <i className="ri-external-link-line mr-1"></i>
                          {client.websiteUrl}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        client.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {client.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => setViewingClient(client)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                        title="View"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          setEditingClient(client);
                          setShowClientModal(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                        title="Edit"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
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

      {showClientModal && editingClient && (
        <ClientModal
          client={editingClient}
          onSave={handleSaveClient}
          onClose={() => {
            setShowClientModal(false);
            setEditingClient(null);
          }}
          saving={saving}
        />
      )}

      {viewingClient && (
        <ClientViewModal
          client={viewingClient}
          onClose={() => setViewingClient(null)}
          onEdit={() => {
            setEditingClient(viewingClient);
            setViewingClient(null);
            setShowClientModal(true);
          }}
          getImageUrl={(logo: any) => getImageUrl(logo)}
          getClientDisplayName={getClientDisplayName}
        />
      )}
    </div>
  );
}

function PageContentEditor({ content, onChange, onSave, saving }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Hero Section</h3>
      
      <div className="space-y-6">
        <FormField label="Hero Title">
          <input
            type="text"
            value={content.heroTitle || ''}
            onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Clients"
          />
        </FormField>

        <FormField label="Hero Subtitle">
          <textarea
            value={content.heroSubtitle || ''}
            onChange={(e) => onChange({ ...content, heroSubtitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Unlock Your Potential"
          />
        </FormField>

        <ImageSelector
          value={content.heroImageId}
          onChange={(id) => onChange({ ...content, heroImageId: id })}
          label="Hero Background Image"
          aspectRatio="16/9"
          currentImage={content.heroImage}
        />

        <FormField label="Intro Text" hint="Optional text below hero section">
          <textarea
            value={content.introText || ''}
            onChange={(e) => onChange({ ...content, introText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Add introduction text here..."
          />
        </FormField>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ClientModal({ client, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<Client>(client);

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title={client.id && client.id > 0 ? 'Edit Client' : 'Add New Client'} 
      size="lg"
    >
      <div className="space-y-6">
        <FormField label="Client Name" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter client name"
          />
        </FormField>

        <FormField label="Website URL" hint="Optional - Include https://">
          <input
            type="url"
            value={formData.websiteUrl || ''}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </FormField>

        <ImageSelector
          value={formData.logoId}
          onChange={(id) => setFormData({ ...formData, logoId: id })}
          label="Client Logo"
          aspectRatio="3/2"
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
            disabled={saving || !formData.name}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : client.id && client.id > 0 ? 'Update Client' : 'Create Client'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function ClientViewModal({ client, onClose, onEdit, getImageUrl, getClientDisplayName }: any) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Client Details" size="lg">
      <div className="space-y-6">
        {client.logo && (
          <div className="flex justify-center">
            <img
              src={getImageUrl(client.logo)}
              alt={getClientDisplayName(client)}
              className="max-w-xs max-h-48 object-contain bg-gray-50 rounded-lg p-4"
            />
          </div>
        )}

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">{getClientDisplayName(client)}</h3>
          
          {client.websiteUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <a
                href={client.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <i className="ri-external-link-line mr-2"></i>
                {client.websiteUrl}
              </a>
            </div>
          )}

          <div>
            <span className={`inline-block px-3 py-1 text-sm rounded-full ${
              client.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {client.isActive ? 'Active' : 'Inactive'}
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
            <i className="ri-edit-line mr-2"></i>Edit Client
          </button>
        </div>
      </div>
    </Modal>
  );
}
