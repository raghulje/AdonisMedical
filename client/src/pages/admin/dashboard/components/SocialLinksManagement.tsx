import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  iconClass: string | null;
  orderIndex: number;
  isActive: boolean;
}

export default function SocialLinksManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await api.get<SocialLink[]>('/social-links');
      if (response.success && response.data) {
        setLinks((response.data as SocialLink[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (reorderedLinks: SocialLink[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedLinks.length; i++) {
        await api.put(`/social-links/${reorderedLinks[i].id}`, {
          ...reorderedLinks[i],
          orderIndex: i
        });
      }
      setLinks(reorderedLinks);
      alert('Order updated!');
    } catch (error: any) {
      alert(error.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (link: SocialLink) => {
    setSaving(true);
    try {
      if (link.id && link.id > 0) {
        await api.put(`/social-links/${link.id}`, link);
      } else {
        await api.post('/social-links', { ...link, orderIndex: links.length });
      }
      setShowModal(false);
      setEditingLink(null);
      fetchLinks();
      alert('Social link saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this social link?')) return;
    setSaving(true);
    try {
      await api.delete(`/social-links/${id}`);
      setLinks(links.filter(l => l.id !== id));
      alert('Social link deleted!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Social Links</h2>
            <p className="text-sm text-gray-600 mt-1">Manage social media links</p>
          </div>
          <button onClick={() => { setEditingLink({ id: 0, platform: '', url: '', iconClass: null, orderIndex: links.length, isActive: true }); setShowModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
            <i className="ri-add-line mr-2"></i>Add Link
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
        </div>
      ) : links.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-share-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-600 mb-4">No social links yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DragDropList
            items={links}
            onReorder={handleReorder}
            keyExtractor={(l) => l.id}
            renderItem={(link: SocialLink) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  {link.iconClass && <i className={`${link.iconClass} text-2xl text-blue-600`}></i>}
                  <div>
                    <h4 className="font-semibold text-gray-900">{link.platform}</h4>
                    <p className="text-sm text-gray-600">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${link.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {link.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button onClick={() => { setEditingLink(link); setShowModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                    <i className="ri-edit-line"></i>
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      )}

      {showModal && editingLink && (
        <LinkModal link={editingLink} onSave={handleSave} onClose={() => { setShowModal(false); setEditingLink(null); }} saving={saving} />
      )}
    </div>
  );
}

function LinkModal({ link, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(link);
  return (
    <Modal isOpen={true} onClose={onClose} title={link.id > 0 ? 'Edit Social Link' : 'Add Social Link'} size="md">
      <div className="space-y-6">
        <FormField label="Platform" required>
          <input type="text" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Facebook" />
        </FormField>
        <FormField label="URL" required>
          <input type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://facebook.com/..." />
        </FormField>
        <FormField label="Icon Class" hint="RemixIcon class">
          <input type="text" value={formData.iconClass || ''} onChange={(e) => setFormData({ ...formData, iconClass: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="ri-facebook-line" />
          {formData.iconClass && <div className="mt-2 text-xs text-gray-500">Preview: <i className={formData.iconClass}></i></div>}
        </FormField>
        <FormField label="Status">
          <select value={formData.isActive ? 'active' : 'inactive'} onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.platform || !formData.url} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

