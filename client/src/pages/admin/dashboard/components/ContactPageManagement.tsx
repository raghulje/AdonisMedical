import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';

interface ContactUsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  introText: string | null;
}

export default function ContactPageManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContactUsPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    introText: null
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<ContactUsPageContent>('/contact-us');
      if (response.success && response.data) {
        setContent(response.data as ContactUsPageContent);
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
      const response = await api.put('/contact-us', content);
      if (response.success) {
        alert('Contact page saved successfully!');
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
            <h2 className="text-2xl font-bold text-gray-900">Contact Us Page</h2>
            <p className="text-sm text-gray-600 mt-1">Manage contact page content</p>
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
            <FormField label="Hero Title">
              <input
                type="text"
                value={content.heroTitle || ''}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Contact Us"
              />
            </FormField>

            <FormField label="Hero Subtitle">
              <input
                type="text"
                value={content.heroSubtitle || ''}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Get in touch with us"
              />
            </FormField>

            {/* Intro Text field hidden for now */}
            {/* <FormField label="Intro Text">
              <textarea
                value={content.introText || ''}
                onChange={(e) => setContent({ ...content, introText: e.target.value || null })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter introduction text for the contact page"
              />
            </FormField> */}
          </div>
        </div>
      )}
    </div>
  );
}
