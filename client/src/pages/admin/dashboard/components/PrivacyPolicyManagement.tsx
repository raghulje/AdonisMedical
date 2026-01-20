import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import WordLikeEditor from '../../../../components/cms/WordLikeEditor';

interface PrivacyParagraph {
  id: number;
  content: string;
  orderIndex: number;
}

interface PrivacyPageContent {
  id?: number;
  title: string | null;
  subtitle: string | null;
  richTextContent: string | null;
}

export default function PrivacyPolicyManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PrivacyPageContent>({
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
      const response = await api.get<PrivacyPageContent>('/terms-privacy/privacy/content');
      if (response.success && response.data) {
        setContent(response.data as PrivacyPageContent);
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
      const response = await api.put('/terms-privacy/privacy/content', content);
      if (response.success) {
        alert('Privacy Policy page saved successfully!');
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
            <h2 className="text-2xl font-medium text-gray-900">Privacy Policy</h2>
            <p className="text-sm text-gray-600 mt-1">Manage the Privacy Policy page content</p>
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
                placeholder="Privacy Policy"
              />
            </FormField>

            <FormField label="Subtitle">
              <textarea
                value={content.subtitle || ''}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value || null })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your privacy is important to us. Learn how we protect your information."
              />
            </FormField>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
              <WordLikeEditor
                value={content.richTextContent ?? ''}
                onChange={(value) => setContent({ ...content, richTextContent: value || null })}
                label="Page Content"
                placeholder="Enter the full Privacy Policy content here. Format text just like in Microsoft Word..."
                height="600px"
              />
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-800 mb-2">
                  <i className="ri-checkbox-circle-line mr-1"></i>
                  <strong>Word-like Editor Active!</strong>
                </p>
                <ul className="text-sm text-green-700 list-disc list-inside space-y-1">
                  <li><strong>Just like Microsoft Word:</strong> Select text and use toolbar buttons or keyboard shortcuts</li>
                  <li><strong>Bold:</strong> Select text → Click <strong>B</strong> button or press <kbd className="px-1 py-0.5 bg-white rounded text-xs border">Ctrl+B</kbd></li>
                  <li><strong>Italic:</strong> Select text → Click <em>I</em> button or press <kbd className="px-1 py-0.5 bg-white rounded text-xs border">Ctrl+I</kbd></li>
                  <li><strong>Underline:</strong> Select text → Click <u>U</u> button or press <kbd className="px-1 py-0.5 bg-white rounded text-xs border">Ctrl+U</kbd></li>
                  <li><strong>Colors:</strong> Select text → Click the color buttons in the toolbar</li>
                  <li><strong>Paste from Word:</strong> Copy from Word and paste - all formatting will be preserved!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

