import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';
import Modal from '../../../../components/cms/Modal';

interface Hospital {
  id: number;
  hospitalName: string;
  cityState: string;
  orderIndex: number;
  isActive: boolean;
}

interface SectionSettings {
  id?: number;
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export default function HospitalsServedManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SectionSettings>({ backgroundImageId: null });
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    fetchSettings();
    fetchHospitals();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get<SectionSettings>('/hospitals-served/settings');
      if (response.success && response.data) {
        setSettings(response.data as SectionSettings);
      }
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      alert(error.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await api.get<Hospital[]>('/hospitals-served/all');
      if (response.success && response.data) {
        setHospitals((response.data as Hospital[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const response = await api.put('/hospitals-served/settings', settings);
      if (response.success) {
        alert('Settings saved successfully!');
        fetchSettings();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHospital = async (hospital: Hospital) => {
    setSaving(true);
    try {
      if (hospital.id && hospital.id > 0) {
        await api.put(`/hospitals-served/${hospital.id}`, hospital);
      } else {
        await api.post('/hospitals-served', { ...hospital, orderIndex: hospitals.length });
      }
      setShowHospitalModal(false);
      setEditingHospital(null);
      fetchHospitals();
      alert('Hospital saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save hospital');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHospital = async (id: number) => {
    if (!confirm('Are you sure you want to delete this hospital?')) return;
    setSaving(true);
    try {
      await api.delete(`/hospitals-served/${id}`);
      setHospitals(hospitals.filter(h => h.id !== id));
      alert('Hospital deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const reordered = [...hospitals];
    [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
    reordered[index - 1].orderIndex = index - 1;
    reordered[index].orderIndex = index;
    setHospitals(reordered);
    await handleReorder(reordered);
  };

  const handleMoveDown = async (index: number) => {
    if (index === hospitals.length - 1) return;
    const reordered = [...hospitals];
    [reordered[index], reordered[index + 1]] = [reordered[index + 1], reordered[index]];
    reordered[index].orderIndex = index;
    reordered[index + 1].orderIndex = index + 1;
    setHospitals(reordered);
    await handleReorder(reordered);
  };

  const handleReorder = async (reordered: Hospital[]) => {
    setSaving(true);
    try {
      await api.put('/hospitals-served/reorder', { ids: reordered.map(h => h.id) });
      alert('Order updated!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
      fetchHospitals(); // Revert on error
    } finally {
      setSaving(false);
    }
  };

  const getImageUrl = (image: any): string => {
    if (!image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${image.filePath}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Hospitals Served Section</h2>
            <p className="text-sm text-gray-600 mt-1">Manage the shared Hospitals Served section that appears on all product pages</p>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-t pt-6">
              <ImageSelector
                value={settings.backgroundImageId}
                onChange={(id) => setSettings({ ...settings, backgroundImageId: id })}
                label="Section Background Image (SVG/PNG)"
              />
              {settings.backgroundImage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Current Background Image:</p>
                  <img
                    src={getImageUrl(settings.backgroundImage)}
                    alt={settings.backgroundImage.altText || 'Background image'}
                    className="w-full max-w-md h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                <i className="ri-information-line mr-1"></i>
                Upload a background SVG or PNG image for the Hospitals Served section. If not set, a default yellow background will be used.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hospitals Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hospitals</h3>
            <p className="text-sm text-gray-600 mt-1">Manage hospital cards displayed in the section</p>
          </div>
          <button
            onClick={() => {
              setEditingHospital({
                id: 0,
                hospitalName: '',
                cityState: '',
                orderIndex: hospitals.length,
                isActive: true
              });
              setShowHospitalModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Hospital
          </button>
        </div>

        <div className="space-y-3">
          {hospitals.map((hospital, index) => (
            <div key={hospital.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || saving}
                      className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <i className="ri-arrow-up-line"></i>
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === hospitals.length - 1 || saving}
                      className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <i className="ri-arrow-down-line"></i>
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{hospital.hospitalName}</p>
                    <p className="text-sm text-gray-600">{hospital.cityState}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${hospital.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {hospital.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingHospital(hospital);
                      setShowHospitalModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                    title="Edit"
                  >
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteHospital(hospital.id)}
                    disabled={saving}
                    className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                    title="Delete"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {hospitals.length === 0 && (
            <p className="text-center text-gray-500 py-8">No hospitals added yet. Click "Add Hospital" to get started.</p>
          )}
        </div>
      </div>

      {/* Hospital Modal */}
      {showHospitalModal && editingHospital && (
        <HospitalModal
          hospital={editingHospital}
          onSave={handleSaveHospital}
          onClose={() => {
            setShowHospitalModal(false);
            setEditingHospital(null);
          }}
          saving={saving}
        />
      )}
    </div>
  );
}

function HospitalModal({ hospital, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(hospital);

  return (
    <Modal isOpen={true} onClose={onClose} title={hospital.id > 0 ? 'Edit Hospital' : 'Add Hospital'} size="lg">
      <div className="space-y-6">
        <FormField label="Hospital Name" required>
          <input
            type="text"
            value={formData.hospitalName || ''}
            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Apollo Hospital"
          />
        </FormField>

        <FormField label="City, State" required>
          <input
            type="text"
            value={formData.cityState || ''}
            onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Chennai, Tamil Nadu"
          />
          <p className="text-xs text-gray-500 mt-1">Format: "City name, State name"</p>
        </FormField>

        <FormField label="Is Active">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <span className="ml-2 text-gray-700">Show this hospital on the page</span>
        </FormField>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.hospitalName || !formData.cityState}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

