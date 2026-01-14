import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';

interface ReusableContactSection {
  id?: number;
  heading: string | null;
  companyName: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  imageId: number | null;
  image?: {
    filePath: string;
    altText: string;
  };
  backgroundImageId: number | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

export default function ReusableContactManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ReusableContactSection>({
    heading: null,
    companyName: null,
    address: null,
    phone: null,
    email: null,
    imageId: null,
    backgroundImageId: null
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<ReusableContactSection>('/reusable-contact-section');
      if (response.success && response.data) {
        setContent(response.data as ReusableContactSection);
      }
    } catch (error: any) {
      console.error('Error fetching content:', error);
      alert(error.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put('/reusable-contact-section', content);
      if (response.success) {
        alert('Reusable Contact Section saved successfully!');
        fetchContent();
      }
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
            <h2 className="text-2xl font-bold text-gray-900">Reusable Contact Us Component</h2>
            <p className="text-sm text-gray-600 mt-1">Manage the reusable contact section used across multiple pages</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <FormField label="Heading">
              <input
                type="text"
                value={content.heading || ''}
                onChange={(e) => setContent({ ...content, heading: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Contact Us"
              />
            </FormField>

            <FormField label="Company Name">
              <input
                type="text"
                value={content.companyName || ''}
                onChange={(e) => setContent({ ...content, companyName: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ADONIS MEDICAL SYSTEMS PVT LTD"
              />
            </FormField>

            <FormField label="Address">
              <textarea
                value={content.address || ''}
                onChange={(e) => setContent({ ...content, address: e.target.value || null })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI, 160071."
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Phone">
                <input
                  type="text"
                  value={content.phone || ''}
                  onChange={(e) => setContent({ ...content, phone: e.target.value || null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="9872003273"
                />
              </FormField>

              <FormField label="Email">
                <input
                  type="email"
                  value={content.email || ''}
                  onChange={(e) => setContent({ ...content, email: e.target.value || null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="support@adonismedical.com"
                />
              </FormField>
            </div>

            <div className="border-t pt-6 space-y-6">
              <div>
                <ImageSelector
                  value={content.backgroundImageId}
                  onChange={(id) => setContent({ ...content, backgroundImageId: id })}
                  label="Background Image (PNG)"
                />
                <p className="text-sm text-gray-500 mt-2">
                  <i className="ri-information-line mr-1"></i>
                  Upload a PNG background image for the contact section.
                </p>
              </div>
              
              <div>
                <ImageSelector
                  value={content.imageId}
                  onChange={(id) => setContent({ ...content, imageId: id })}
                  label="Contact Section Image"
                />
                <p className="text-sm text-gray-500 mt-2">
                  <i className="ri-information-line mr-1"></i>
                  Upload an image to display on the right side of the contact section.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

