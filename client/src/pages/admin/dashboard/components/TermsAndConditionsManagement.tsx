import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import RichTextEditor from '../../../../components/cms/RichTextEditor';

interface TermsParagraph {
  id: number;
  content: string;
  orderIndex: number;
}

interface TermsPageContent {
  id?: number;
  title: string | null;
  subtitle: string | null;
  richTextContent: string | null;
}

export default function TermsAndConditionsManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<TermsPageContent>({
    title: null,
    subtitle: null,
    richTextContent: null
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<TermsPageContent>('/terms-privacy/terms/content');
      if (response.success && response.data) {
        setContent(response.data as TermsPageContent);
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
      const response = await api.put('/terms-privacy/terms/content', content);
      if (response.success) {
        alert('Terms and Conditions page saved successfully!');
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
            <h2 className="text-2xl font-bold text-gray-900">Terms and Conditions</h2>
            <p className="text-sm text-gray-600 mt-1">Manage the Terms and Conditions page content</p>
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
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3">Hero Section</h3>
            
            <FormField label="Page Title">
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => setContent({ ...content, title: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Terms and Conditions"
              />
            </FormField>

            <FormField label="Subtitle">
              <textarea
                value={content.subtitle || ''}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value || null })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Please read these terms carefully before using our services"
              />
            </FormField>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
              <RichTextEditor
                value={content.richTextContent ?? ''}
                onChange={(value) => setContent({ ...content, richTextContent: value || null })}
                label="Page Content"
                placeholder="Enter the full Terms and Conditions content here. You can format text, add headings, lists, and more..."
                height="600px"
              />
              <p className="text-sm text-gray-500 mt-2">
                <i className="ri-information-line mr-1"></i>
                Use the editor above to add and format your full Terms and Conditions content. All formatting, bold text, headings, and alignment will be preserved.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

