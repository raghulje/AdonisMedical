import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';

interface GlobalSetting {
  id: number;
  settingKey: string;
  settingValue: string | null;
  settingType: string;
  description: string | null;
}

export default function GlobalSettingsManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<GlobalSetting[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSetting, setEditingSetting] = useState<GlobalSetting | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get<GlobalSetting[]>('/global-settings');
      if (response.success && response.data) {
        setSettings(response.data as GlobalSetting[]);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (setting: GlobalSetting) => {
    setSaving(true);
    try {
      if (setting.id && setting.id > 0) {
        await api.put(`/global-settings/${setting.id}`, setting);
      } else {
        await api.post('/global-settings', setting);
      }
      setShowModal(false);
      setEditingSetting(null);
      fetchSettings();
      alert('Setting saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this setting?')) return;
    setSaving(true);
    try {
      await api.delete(`/global-settings/${id}`);
      setSettings(settings.filter(s => s.id !== id));
      alert('Setting deleted!');
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
            <h2 className="text-2xl font-medium text-gray-900">Global Settings</h2>
            <p className="text-sm text-gray-600 mt-1">Manage site-wide settings</p>
          </div>
          <button onClick={() => { setEditingSetting({ id: 0, settingKey: '', settingValue: null, settingType: 'text', description: null }); setShowModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
            <i className="ri-add-line mr-2"></i>Add Setting
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
        </div>
      ) : settings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-settings-3-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-600 mb-4">No settings yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-3">
            {settings.map((setting) => (
              <div key={setting.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{setting.settingKey}</h4>
                    {setting.description && <p className="text-sm text-gray-600 mt-1">{setting.description}</p>}
                    <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">{setting.settingValue || '(empty)'}</p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{setting.settingType}</span>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button onClick={() => { setEditingSetting(setting); setShowModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button onClick={() => handleDelete(setting.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && editingSetting && (
        <SettingModal setting={editingSetting} onSave={handleSave} onClose={() => { setShowModal(false); setEditingSetting(null); }} saving={saving} />
      )}
    </div>
  );
}

function SettingModal({ setting, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(setting);
  return (
    <Modal isOpen={true} onClose={onClose} title={setting.id > 0 ? 'Edit Setting' : 'Add Setting'} size="md">
      <div className="space-y-6">
        <FormField label="Setting Key" required hint="Unique identifier (e.g., site_name)">
          <input type="text" value={formData.settingKey} onChange={(e) => setFormData({ ...formData, settingKey: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <FormField label="Setting Type">
          <select value={formData.settingType} onChange={(e) => setFormData({ ...formData, settingType: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="json">JSON</option>
          </select>
        </FormField>
        <FormField label="Setting Value">
          {formData.settingType === 'boolean' ? (
            <select value={formData.settingValue || 'false'} onChange={(e) => setFormData({ ...formData, settingValue: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          ) : formData.settingType === 'json' ? (
            <textarea value={formData.settingValue || ''} onChange={(e) => setFormData({ ...formData, settingValue: e.target.value || null })} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm" placeholder='{"key": "value"}' />
          ) : (
            <input type={formData.settingType === 'number' ? 'number' : 'text'} value={formData.settingValue || ''} onChange={(e) => setFormData({ ...formData, settingValue: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          )}
        </FormField>
        <FormField label="Description">
          <input type="text" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.settingKey} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

