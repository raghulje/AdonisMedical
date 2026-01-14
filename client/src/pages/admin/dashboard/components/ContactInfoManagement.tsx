import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';

interface ContactInfo {
  id?: number;
  companyName: string;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  supportEmail: string | null;
  googleMapsEmbedUrl: string | null;
}

export default function ContactInfoManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    companyName: '',
    addressLine1: null,
    addressLine2: null,
    city: null,
    state: null,
    postalCode: null,
    country: null,
    phone: null,
    email: null,
    supportEmail: null,
    googleMapsEmbedUrl: null
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    setLoading(true);
    try {
      const response = await api.get<ContactInfo>('/contact-info');
      if (response.success && response.data) {
        setContactInfo(response.data as ContactInfo);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/contact-info', contactInfo);
      alert('Contact info saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <p className="text-sm text-gray-600 mt-1">Manage company contact details</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Company Name" required>
              <input type="text" value={contactInfo.companyName} onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="Phone">
              <input type="tel" value={contactInfo.phone || ''} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="Email">
              <input type="email" value={contactInfo.email || ''} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="Support Email">
              <input type="email" value={contactInfo.supportEmail || ''} onChange={(e) => setContactInfo({ ...contactInfo, supportEmail: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="Address Line 1">
              <input type="text" value={contactInfo.addressLine1 || ''} onChange={(e) => setContactInfo({ ...contactInfo, addressLine1: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="Address Line 2">
              <input type="text" value={contactInfo.addressLine2 || ''} onChange={(e) => setContactInfo({ ...contactInfo, addressLine2: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="City">
              <input type="text" value={contactInfo.city || ''} onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="State">
              <input type="text" value={contactInfo.state || ''} onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="Postal Code">
              <input type="text" value={contactInfo.postalCode || ''} onChange={(e) => setContactInfo({ ...contactInfo, postalCode: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <FormField label="Country">
              <input type="text" value={contactInfo.country || ''} onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value || null })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Google Maps Embed URL">
                <textarea value={contactInfo.googleMapsEmbedUrl || ''} onChange={(e) => setContactInfo({ ...contactInfo, googleMapsEmbedUrl: e.target.value || null })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Paste Google Maps embed iframe code here" />
              </FormField>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

