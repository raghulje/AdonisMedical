import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';

type SectionTab = 'hero' | 'overview' | 'safety' | 'excellence';

interface AboutPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  overviewHeading: string | null;
  overviewContent: string | null;
  overviewImageId: number | null;
  safetyHeading: string | null;
  safetyContent: string | null;
  safetyImageId: number | null;
  excellenceHeading: string | null;
  excellenceContent: string | null;
  excellenceImageId: number | null;
  heroImage?: { filePath: string; altText: string };
  overviewImage?: { filePath: string; altText: string };
  safetyImage?: { filePath: string; altText: string };
  excellenceImage?: { filePath: string; altText: string };
}

export default function AboutPageManagement() {
  const [activeSection, setActiveSection] = useState<SectionTab>('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<AboutPageContent>({
    heroTitle: null,
    heroSubtitle: null,
    heroImageId: null,
    overviewHeading: null,
    overviewContent: null,
    overviewImageId: null,
    safetyHeading: null,
    safetyContent: null,
    safetyImageId: null,
    excellenceHeading: null,
    excellenceContent: null,
    excellenceImageId: null
  });

  const sectionTabs = [
    { id: 'hero' as SectionTab, label: 'Hero Section', icon: 'ri-image-line' },
    { id: 'overview' as SectionTab, label: 'Company Overview', icon: 'ri-file-text-line' },
    { id: 'safety' as SectionTab, label: 'Safety & Innovation', icon: 'ri-shield-check-line' },
    { id: 'excellence' as SectionTab, label: 'Excellence', icon: 'ri-award-line' }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<AboutPageContent>('/about');
      if (response.success && response.data) {
        setContent(response.data as AboutPageContent);
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
      const response = await api.put('/about', content);
      if (response.success) {
        alert('About page saved successfully!');
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
        <h2 className="text-2xl font-bold text-gray-900">About Page Management</h2>
        <p className="text-sm text-gray-600 mt-1">Manage all sections of the about page</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-300 border-b-2 cursor-pointer ${
                  activeSection === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
              <p className="text-gray-600 mt-2">Loading...</p>
            </div>
          ) : (
            <>
              {activeSection === 'hero' && (
                <SectionEditor
                  title="Hero Section"
                  fields={[
                    {
                      label: 'Hero Title',
                      value: content.heroTitle || '',
                      onChange: (val) => setContent({ ...content, heroTitle: val || null }),
                      type: 'text'
                    },
                    {
                      label: 'Hero Subtitle',
                      value: content.heroSubtitle || '',
                      onChange: (val) => setContent({ ...content, heroSubtitle: val || null }),
                      type: 'textarea'
                    }
                  ]}
                  imageSelector={
                    <ImageSelector
                      value={content.heroImageId}
                      onChange={(id) => setContent({ ...content, heroImageId: id })}
                      label="Hero Image"
                    />
                  }
                  previewImage={content.heroImage ? getImageUrl(content.heroImage) : null}
                  onSave={handleSave}
                  saving={saving}
                />
              )}

              {activeSection === 'overview' && (
                <SectionEditor
                  title="Company Overview Section"
                  fields={[
                    {
                      label: 'Heading',
                      value: content.overviewHeading || '',
                      onChange: (val) => setContent({ ...content, overviewHeading: val || null }),
                      type: 'text'
                    },
                    {
                      label: 'Content',
                      value: content.overviewContent || '',
                      onChange: (val) => setContent({ ...content, overviewContent: val || null }),
                      type: 'textarea',
                      rows: 6
                    }
                  ]}
                  imageSelector={
                    <ImageSelector
                      value={content.overviewImageId}
                      onChange={(id) => setContent({ ...content, overviewImageId: id })}
                      label="Overview Image"
                    />
                  }
                  previewImage={content.overviewImage ? getImageUrl(content.overviewImage) : null}
                  onSave={handleSave}
                  saving={saving}
                />
              )}

              {activeSection === 'safety' && (
                <SectionEditor
                  title="Safety & Innovation Section"
                  fields={[
                    {
                      label: 'Heading',
                      value: content.safetyHeading || '',
                      onChange: (val) => setContent({ ...content, safetyHeading: val || null }),
                      type: 'text'
                    },
                    {
                      label: 'Content',
                      value: content.safetyContent || '',
                      onChange: (val) => setContent({ ...content, safetyContent: val || null }),
                      type: 'textarea',
                      rows: 6
                    }
                  ]}
                  imageSelector={
                    <ImageSelector
                      value={content.safetyImageId}
                      onChange={(id) => setContent({ ...content, safetyImageId: id })}
                      label="Safety Image"
                    />
                  }
                  previewImage={content.safetyImage ? getImageUrl(content.safetyImage) : null}
                  onSave={handleSave}
                  saving={saving}
                />
              )}

              {activeSection === 'excellence' && (
                <SectionEditor
                  title="Excellence Section"
                  fields={[
                    {
                      label: 'Heading',
                      value: content.excellenceHeading || '',
                      onChange: (val) => setContent({ ...content, excellenceHeading: val || null }),
                      type: 'text'
                    },
                    {
                      label: 'Content',
                      value: content.excellenceContent || '',
                      onChange: (val) => setContent({ ...content, excellenceContent: val || null }),
                      type: 'textarea',
                      rows: 6
                    }
                  ]}
                  imageSelector={
                    <ImageSelector
                      value={content.excellenceImageId}
                      onChange={(id) => setContent({ ...content, excellenceImageId: id })}
                      label="Excellence Image"
                    />
                  }
                  previewImage={content.excellenceImage ? getImageUrl(content.excellenceImage) : null}
                  onSave={handleSave}
                  saving={saving}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionEditor({ title, fields, imageSelector, previewImage, onSave, saving }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field: any, index: number) => (
          <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
            <FormField label={field.label}>
              {field.type === 'textarea' ? (
                <textarea
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  rows={field.rows || 4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              )}
            </FormField>
          </div>
        ))}

        <div className="md:col-span-2">
          {imageSelector}
        </div>

        {previewImage && (
          <div className="md:col-span-2">
            <FormField label="Preview">
              <img src={previewImage} alt="Preview" className="w-full rounded-lg max-h-64 object-cover" />
            </FormField>
          </div>
        )}
      </div>
    </div>
  );
}
