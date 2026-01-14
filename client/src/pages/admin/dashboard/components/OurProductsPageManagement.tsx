import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';

interface OurProductsPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  heroImage?: {
    filePath: string;
    altText: string;
  };
}

export default function OurProductsPageManagement() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<OurProductsPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<OurProductsPageContent>('/our-products/content');
      if (response.success && response.data) {
        setContent(response.data as OurProductsPageContent);
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
      const response = await api.put('/our-products/content', content);
      if (response.success) {
        alert('Our Products Page Content saved successfully!');
        fetchContent();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our Products Page</h2>
            <p className="text-sm text-gray-600 mt-1">Manage the Our Products page content</p>
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
            
            <FormField label="Hero Title">
              <input
                type="text"
                value={content.heroTitle || ''}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Our Products"
              />
            </FormField>

            <FormField label="Hero Subtitle">
              <textarea
                value={content.heroSubtitle || ''}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value || null })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Explore our comprehensive range of medical imaging solutions"
              />
            </FormField>

            <div className="border-t pt-6">
              <ImageSelector
                value={content.heroImageId}
                onChange={(id) => setContent({ ...content, heroImageId: id })}
                label="Hero Background Image"
              />
              {content.heroImage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img
                    src={getImageUrl(content.heroImage)}
                    alt={content.heroImage.altText || 'Hero image'}
                    className="w-full max-w-md h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                <i className="ri-information-line mr-1"></i>
                Upload a background image for the hero section.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

