import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

type TabType = 'content' | 'locations';

interface OurPresencePageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  introText: string | null;
  mapImageId: number | null;
  salesServiceHeading: string | null;
  salesServiceContent: string | null;
  salesServiceImageId: number | null;
}

interface OfficeLocation {
  id: number;
  officeType: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  isActive: boolean;
}

export default function OurPresencePageManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [pageContent, setPageContent] = useState<OurPresencePageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    introText: null,
    mapImageId: null,
    salesServiceHeading: null,
    salesServiceContent: null,
    salesServiceImageId: null
  });

  const [locations, setLocations] = useState<OfficeLocation[]>([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<OfficeLocation | null>(null);

  useEffect(() => {
    if (activeTab === 'content') {
      fetchPageContent();
    } else {
      fetchLocations();
    }
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<OurPresencePageContent>('/our-presence');
      if (response.success && response.data) {
        setPageContent(response.data as OurPresencePageContent);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await api.get<OfficeLocation[]>('/our-presence/locations');
      if (response.success && response.data) {
        setLocations(response.data as OfficeLocation[]);
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
      await api.put('/our-presence', pageContent);
      alert('Saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLocation = async (loc: OfficeLocation) => {
    setSaving(true);
    try {
      if (loc.id && loc.id > 0) {
        await api.put(`/our-presence/locations/${loc.id}`, loc);
      } else {
        await api.post('/our-presence/locations', loc);
      }
      setShowLocationModal(false);
      setEditingLocation(null);
      fetchLocations();
      alert('Location saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLocation = async (id: number) => {
    if (!confirm('Delete this location?')) return;
    setSaving(true);
    try {
      await api.delete(`/our-presence/locations/${id}`);
      setLocations(locations.filter(l => l.id !== id));
      alert('Location deleted!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium text-gray-900">Our Presence</h2>
        <p className="text-sm text-gray-600 mt-1">Manage page content and office locations</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeTab === 'content' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
            >
              Page Content
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeTab === 'locations' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
            >
              Office Locations
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
                  <input type="text" value={pageContent.heroTitle || ''} onChange={(e) => setPageContent({ ...pageContent, heroTitle: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </FormField>
                <FormField label="Hero Subtitle">
                  <input type="text" value={pageContent.heroSubtitle || ''} onChange={(e) => setPageContent({ ...pageContent, heroSubtitle: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </FormField>
                <div className="md:col-span-2">
                  <ImageSelector value={pageContent.heroImageId} onChange={(id) => setPageContent({ ...pageContent, heroImageId: Number(id) })} label="Hero Image" />
                </div>
                <div className="md:col-span-2">
                  <FormField label="Intro Text">
                    <textarea value={pageContent.introText || ''} onChange={(e) => setPageContent({ ...pageContent, introText: e.target.value || null })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </FormField>
                </div>
                <div className="md:col-span-2">
                  <ImageSelector value={pageContent.mapImageId} onChange={(id) => setPageContent({ ...pageContent, mapImageId: Number(id) })} label="Map Image" />
                </div>
                <FormField label="Sales & Service Heading">
                  <input type="text" value={pageContent.salesServiceHeading || ''} onChange={(e) => setPageContent({ ...pageContent, salesServiceHeading: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </FormField>
                <div className="md:col-span-2">
                  <FormField label="Sales & Service Content" hint="Separate paragraphs with a blank line (press Enter twice)">
                    <textarea value={pageContent.salesServiceContent || ''} onChange={(e) => setPageContent({ ...pageContent, salesServiceContent: e.target.value || null })} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="First paragraph here...

Second paragraph here..." />
                  </FormField>
                </div>
                <div className="md:col-span-2">
                  <ImageSelector value={pageContent.salesServiceImageId} onChange={(id) => setPageContent({ ...pageContent, salesServiceImageId: Number(id) })} label="Sales & Service Image" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Office Locations</h3>
                <button
                  onClick={() => {
                    setEditingLocation({
                      id: 0,
                      officeType: null,
                      city: null,
                      state: null,
                      country: null,
                      address: null,
                      phone: null,
                      email: null,
                      latitude: null,
                      longitude: null,
                      isActive: true
                    });
                    setShowLocationModal(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>Add Location
                </button>
              </div>
              {locations.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-map-pin-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No locations yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {locations.map((loc) => (
                    <div key={loc.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{loc.city}, {loc.state || loc.country}</h4>
                          {loc.officeType && <p className="text-sm text-gray-600">{loc.officeType}</p>}
                          {loc.address && <p className="text-sm text-gray-600 mt-1">{loc.address}</p>}
                          <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                            {loc.phone && <span><i className="ri-phone-line mr-1"></i>{loc.phone}</span>}
                            {loc.email && <span><i className="ri-mail-line mr-1"></i>{loc.email}</span>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${loc.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {loc.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button onClick={() => { setEditingLocation(loc); setShowLocationModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                            <i className="ri-edit-line"></i>
                          </button>
                          <button onClick={() => handleDeleteLocation(loc.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showLocationModal && editingLocation && (
        <LocationModal
          location={editingLocation}
          onSave={handleSaveLocation}
          onClose={() => { setShowLocationModal(false); setEditingLocation(null); }}
          saving={saving}
        />
      )}
    </div>
  );
}

function LocationModal({ location, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<OfficeLocation>(location);

  return (
    <Modal isOpen={true} onClose={onClose} title={location.id > 0 ? 'Edit Location' : 'Add Location'} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Office Type">
            <input type="text" value={formData.officeType || ''} onChange={(e) => setFormData({ ...formData, officeType: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Headquarters" />
          </FormField>
          <FormField label="City">
            <input type="text" value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <FormField label="State">
            <input type="text" value={formData.state || ''} onChange={(e) => setFormData({ ...formData, state: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <FormField label="Country">
            <input type="text" value={formData.country || ''} onChange={(e) => setFormData({ ...formData, country: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
        </div>
        <FormField label="Address">
          <textarea value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value || null })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Phone">
            <input type="text" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <FormField label="Email">
            <input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <FormField label="Latitude">
            <input type="number" step="any" value={formData.latitude || ''} onChange={(e) => setFormData({ ...formData, latitude: e.target.value ? parseFloat(e.target.value) : null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
          <FormField label="Longitude">
            <input type="number" step="any" value={formData.longitude || ''} onChange={(e) => setFormData({ ...formData, longitude: e.target.value ? parseFloat(e.target.value) : null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </FormField>
        </div>
        <FormField label="Status">
          <select value={formData.isActive ? 'active' : 'inactive'} onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
