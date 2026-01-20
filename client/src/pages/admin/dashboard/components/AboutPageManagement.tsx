import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import FormField from '../../../../components/cms/FormField';
import ImageSelector from '../../../../components/cms/ImageSelector';
import DragDropList from '../../../../components/cms/DragDropList';

type SectionTab = 'hero' | 'overview' | 'safety' | 'excellence' | 'global-reach';

interface AboutPageHighlight {
  id?: number;
  text: string;
  iconClass: string | null;
  iconId: number | null;
  icon?: { filePath: string; altText: string };
  orderIndex: number;
}

interface AboutPageOverviewParagraph {
  id?: number;
  content: string;
  orderIndex: number;
  position: string | null; // 'before' or 'after' highlights
}

interface AboutPageGlobalReachCard {
  id?: number;
  iconClass: string | null;
  iconId: number | null;
  icon?: { filePath: string; altText: string };
  content: string;
  orderIndex: number;
}

interface AboutPageContent {
  id?: number;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageId: number | null;
  overviewHeading: string | null;
  overviewContent: string | null;
  overviewImageId: number | null;
  overviewImageOverlayText: string | null;
  backgroundImageId: number | null;
  safetyHeading: string | null;
  safetyContent: string | null;
  safetyImageId: number | null;
  excellenceHeading: string | null;
  excellenceContent: string | null;
  excellenceImageId: number | null;
  globalReachHeading: string | null;
  heroImage?: { filePath: string; altText: string };
  overviewImage?: { filePath: string; altText: string };
  backgroundImage?: { filePath: string; altText: string };
  safetyImage?: { filePath: string; altText: string };
  excellenceImage?: { filePath: string; altText: string };
  highlights?: AboutPageHighlight[];
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
    backgroundImageId: null,
    safetyHeading: null,
    safetyContent: null,
    safetyImageId: null,
    excellenceHeading: null,
    excellenceContent: null,
    excellenceImageId: null
  });
  const [highlights, setHighlights] = useState<AboutPageHighlight[]>([]);
  const [editingHighlight, setEditingHighlight] = useState<AboutPageHighlight | null>(null);
  const [overviewParagraphs, setOverviewParagraphs] = useState<AboutPageOverviewParagraph[]>([]);
  const [editingParagraph, setEditingParagraph] = useState<AboutPageOverviewParagraph | null>(null);
  const [globalReachCards, setGlobalReachCards] = useState<AboutPageGlobalReachCard[]>([]);
  const [editingGlobalReachCard, setEditingGlobalReachCard] = useState<AboutPageGlobalReachCard | null>(null);

  const sectionTabs = [
    { id: 'hero' as SectionTab, label: 'Hero Section', icon: 'ri-image-line' },
    { id: 'overview' as SectionTab, label: 'Company Overview', icon: 'ri-file-text-line' },
    { id: 'safety' as SectionTab, label: 'Safety & Innovation', icon: 'ri-shield-check-line' },
    { id: 'excellence' as SectionTab, label: 'Excellence', icon: 'ri-award-line' },
    { id: 'global-reach' as SectionTab, label: 'Global Reach and Vision', icon: 'ri-global-line' }
  ];

  useEffect(() => {
    fetchContent();
    fetchHighlights();
    fetchOverviewParagraphs();
    fetchGlobalReachCards();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await api.get<AboutPageContent>('/about');
      if (response.success && response.data) {
        setContent(response.data as AboutPageContent);
        if (response.data.highlights) {
          setHighlights(response.data.highlights);
        }
        if (response.data.overviewParagraphs) {
          setOverviewParagraphs(response.data.overviewParagraphs);
        }
        if (response.data.globalReachCards) {
          setGlobalReachCards(response.data.globalReachCards);
        }
      }
    } catch (error: any) {
      console.error('Error fetching content:', error);
      alert(error.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const fetchHighlights = async () => {
    try {
      const response = await api.get<AboutPageHighlight[]>('/about/highlights');
      if (response.success && response.data) {
        setHighlights(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching highlights:', error);
    }
  };

  const fetchOverviewParagraphs = async () => {
    try {
      const response = await api.get<AboutPageOverviewParagraph[]>('/about/overview-paragraphs');
      if (response.success && response.data) {
        setOverviewParagraphs(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching overview paragraphs:', error);
    }
  };

  const handleAddParagraph = (position: 'before' | 'after') => {
    setEditingParagraph({
      content: '',
      orderIndex: overviewParagraphs.filter(p => p.position === position).length,
      position
    });
  };

  const handleSaveParagraph = async () => {
    if (!editingParagraph) return;
    
    setSaving(true);
    try {
      if (editingParagraph.id) {
        const response = await api.put(`/about/overview-paragraphs/${editingParagraph.id}`, editingParagraph);
        if (response.success) {
          await fetchOverviewParagraphs();
          setEditingParagraph(null);
          alert('Paragraph updated successfully!');
        }
      } else {
        const response = await api.post('/about/overview-paragraphs', editingParagraph);
        if (response.success) {
          await fetchOverviewParagraphs();
          setEditingParagraph(null);
          alert('Paragraph created successfully!');
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save paragraph');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteParagraph = async (id: number) => {
    if (!confirm('Are you sure you want to delete this paragraph?')) return;
    
    setSaving(true);
    try {
      const response = await api.delete(`/about/overview-paragraphs/${id}`);
      if (response.success) {
        await fetchOverviewParagraphs();
        alert('Paragraph deleted successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to delete paragraph');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderParagraphs = async (reorderedParagraphs: AboutPageOverviewParagraph[], position: 'before' | 'after') => {
    setSaving(true);
    try {
      const response = await api.put('/about/overview-paragraphs/reorder', {
        paragraphs: reorderedParagraphs.map((p, i) => ({ id: p.id, orderIndex: i }))
      });
      if (response.success) {
        setOverviewParagraphs([...overviewParagraphs.filter(p => p.position !== position), ...reorderedParagraphs]);
        alert('Paragraphs order updated successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
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

  const handleAddHighlight = () => {
    setEditingHighlight({
      text: '',
      iconClass: null,
      iconId: null,
      orderIndex: highlights.length
    });
  };

  const handleSaveHighlight = async () => {
    if (!editingHighlight) return;
    
    setSaving(true);
    try {
      if (editingHighlight.id) {
        // Update existing
        const response = await api.put(`/about/highlights/${editingHighlight.id}`, {
          ...editingHighlight,
          sectionName: 'overview'
        });
        if (response.success) {
          await fetchHighlights();
          setEditingHighlight(null);
          alert('Highlight updated successfully!');
        }
      } else {
        // Create new
        const response = await api.post('/about/highlights', {
          ...editingHighlight,
          sectionName: 'overview'
        });
        if (response.success) {
          await fetchHighlights();
          setEditingHighlight(null);
          alert('Highlight created successfully!');
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save highlight');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHighlight = async (id: number) => {
    if (!confirm('Are you sure you want to delete this highlight?')) return;
    
    setSaving(true);
    try {
      const response = await api.delete(`/about/highlights/${id}`);
      if (response.success) {
        await fetchHighlights();
        alert('Highlight deleted successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to delete highlight');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderHighlights = async (reorderedHighlights: AboutPageHighlight[]) => {
    setSaving(true);
    try {
      const response = await api.put('/about/highlights/reorder', {
        highlights: reorderedHighlights.map((h, i) => ({ id: h.id, orderIndex: i }))
      });
      if (response.success) {
        setHighlights(reorderedHighlights);
        alert('Highlights order updated successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const fetchGlobalReachCards = async () => {
    try {
      const response = await api.get<AboutPageGlobalReachCard[]>('/about/global-reach-cards');
      if (response.success && response.data) {
        setGlobalReachCards(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching global reach cards:', error);
    }
  };

  const handleAddGlobalReachCard = () => {
    setEditingGlobalReachCard({
      iconClass: null,
      iconId: null,
      content: '',
      orderIndex: globalReachCards.length
    });
  };

  const handleSaveGlobalReachCard = async () => {
    if (!editingGlobalReachCard) return;
    
    setSaving(true);
    try {
      if (editingGlobalReachCard.id) {
        const response = await api.put(`/about/global-reach-cards/${editingGlobalReachCard.id}`, editingGlobalReachCard);
        if (response.success) {
          setEditingGlobalReachCard(null);
          await fetchGlobalReachCards();
          await fetchContent(); // Also refresh main content to ensure icons are loaded
          alert('Card updated successfully!');
        }
      } else {
        const response = await api.post('/about/global-reach-cards', editingGlobalReachCard);
        if (response.success) {
          setEditingGlobalReachCard(null);
          await fetchGlobalReachCards();
          await fetchContent(); // Also refresh main content to ensure icons are loaded
          alert('Card created successfully!');
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGlobalReachCard = async (id: number) => {
    if (!confirm('Are you sure you want to delete this card?')) return;
    
    setSaving(true);
    try {
      const response = await api.delete(`/about/global-reach-cards/${id}`);
      if (response.success) {
        await fetchGlobalReachCards();
        alert('Card deleted successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to delete card');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderGlobalReachCards = async (reorderedCards: AboutPageGlobalReachCard[]) => {
    setSaving(true);
    try {
      const response = await api.put('/about/global-reach-cards/reorder', {
        cards: reorderedCards.map((c, i) => ({ id: c.id, orderIndex: i }))
      });
      if (response.success) {
        setGlobalReachCards(reorderedCards);
        alert('Cards order updated successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
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
        <h2 className="text-2xl font-medium text-gray-900">About Page Management</h2>
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
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Company Overview Section</h3>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Heading">
                      <input
                        type="text"
                        value={content.overviewHeading || ''}
                        onChange={(e) => setContent({ ...content, overviewHeading: e.target.value || null })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </FormField>

                    <div className="md:col-span-2">
                      <FormField label="Intro Content">
                        <textarea
                          value={content.overviewContent || ''}
                          onChange={(e) => setContent({ ...content, overviewContent: e.target.value || null })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="First paragraph that appears before the image row"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          This is the introductory paragraph displayed at the top of the section.
                        </p>
                      </FormField>
                    </div>

                    <div className="md:col-span-2">
                      <FormField label="Image Overlay Text">
                        <textarea
                          value={content.overviewImageOverlayText || ''}
                          onChange={(e) => setContent({ ...content, overviewImageOverlayText: e.target.value || null })}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Text displayed on top of the left image"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          This text will appear in a white box on top of the left image.
                        </p>
                      </FormField>
                    </div>

                    <div className="md:col-span-2">
                    <ImageSelector
                      value={content.overviewImageId}
                      onChange={(id) => setContent({ ...content, overviewImageId: id })}
                        label="Overview Image (Left Side)"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Image displayed on the left side of the first row.
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <ImageSelector
                        value={content.backgroundImageId}
                        onChange={(id) => setContent({ ...content, backgroundImageId: id })}
                        label="Section Background Image (PNG)"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Optional background image for the entire section with rounded top corners.
                      </p>
                    </div>
                  </div>

                  {/* Paragraphs Before Highlights */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-md font-semibold text-gray-900">Paragraphs (Before Highlights)</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Add paragraphs that appear before the bullet points in the right column
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddParagraph('before')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                      >
                        <i className="ri-add-line mr-2"></i>
                        Add Paragraph
                      </button>
                    </div>

                    <DragDropList
                      items={overviewParagraphs.filter(p => p.position === 'before' || !p.position)}
                      onReorder={(items) => handleReorderParagraphs(items, 'before')}
                      keyExtractor={(item) => item.id || `temp-${item.orderIndex}`}
                      renderItem={(paragraph) => (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 line-clamp-2">{paragraph.content}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingParagraph(paragraph)}
                              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                            {paragraph.id && (
                              <button
                                onClick={() => handleDeleteParagraph(paragraph.id!)}
                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      emptyMessage="No paragraphs yet. Click 'Add Paragraph' to create one."
                    />
                  </div>

                  {/* Highlights Management */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-md font-semibold text-gray-900">Bullet Points (Highlights)</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Add, edit, and reorder bullet points displayed in the first row
                        </p>
                      </div>
                      <button
                        onClick={handleAddHighlight}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                      >
                        <i className="ri-add-line mr-2"></i>
                        Add Highlight
                      </button>
                    </div>

                    <DragDropList
                      items={highlights}
                      onReorder={handleReorderHighlights}
                      keyExtractor={(item) => item.id || `temp-${item.orderIndex}`}
                      renderItem={(highlight, index) => (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3 flex-1">
                            {highlight.icon ? (
                              <img
                                src={getImageUrl(highlight.icon)}
                                alt={highlight.icon.altText || highlight.text}
                                className="w-6 h-6 object-contain"
                              />
                            ) : highlight.iconClass ? (
                              <i className={`${highlight.iconClass} text-[#FF6B35] text-xl`}></i>
                            ) : (
                              <i className="ri-checkbox-circle-line text-[#FF6B35] text-xl"></i>
                            )}
                            <span className="text-gray-900">{highlight.text}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingHighlight(highlight)}
                              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                            {highlight.id && (
                              <button
                                onClick={() => handleDeleteHighlight(highlight.id!)}
                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      emptyMessage="No highlights yet. Click 'Add Highlight' to create one."
                    />
                  </div>

                  {/* Paragraphs After Highlights */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-md font-semibold text-gray-900">Paragraphs (After Highlights)</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Add paragraphs that appear after the bullet points in the right column
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddParagraph('after')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                      >
                        <i className="ri-add-line mr-2"></i>
                        Add Paragraph
                      </button>
                    </div>

                    <DragDropList
                      items={overviewParagraphs.filter(p => p.position === 'after')}
                      onReorder={(items) => handleReorderParagraphs(items, 'after')}
                      keyExtractor={(item) => item.id || `temp-${item.orderIndex}`}
                      renderItem={(paragraph) => (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 line-clamp-2">{paragraph.content}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingParagraph(paragraph)}
                              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                            {paragraph.id && (
                              <button
                                onClick={() => handleDeleteParagraph(paragraph.id!)}
                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      emptyMessage="No paragraphs yet. Click 'Add Paragraph' to create one."
                    />
                  </div>

                  {/* Edit Highlight Modal */}
                  {editingHighlight && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {editingHighlight.id ? 'Edit Highlight' : 'Add Highlight'}
                            </h4>
                            <button
                              onClick={() => setEditingHighlight(null)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <i className="ri-close-line text-2xl"></i>
                            </button>
                          </div>

                          <div className="space-y-4">
                            <FormField label="Text">
                              <input
                                type="text"
                                value={editingHighlight.text}
                                onChange={(e) => setEditingHighlight({ ...editingHighlight, text: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Unmatched product reliability"
                              />
                            </FormField>

                            <FormField label="Icon (SVG Image)">
                              <ImageSelector
                                value={editingHighlight.iconId}
                                onChange={(id) => setEditingHighlight({ ...editingHighlight, iconId: id || null })}
                                label="Upload SVG Icon"
                              />
                              <p className="text-sm text-gray-500 mt-2">
                                Upload an SVG icon that will appear next to this bullet point. If not provided, a default icon will be used.
                              </p>
                            </FormField>

                            <FormField label="Icon Class (Alternative)">
                              <input
                                type="text"
                                value={editingHighlight.iconClass || ''}
                                onChange={(e) => setEditingHighlight({ ...editingHighlight, iconClass: e.target.value || null })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., ri-checkbox-circle-line"
                              />
                              <p className="text-sm text-gray-500 mt-2">
                                Alternatively, provide a RemixIcon class name (e.g., ri-checkbox-circle-line)
                              </p>
                            </FormField>

                            <div className="flex items-center gap-3 pt-4">
                              <button
                                onClick={handleSaveHighlight}
                                disabled={saving || !editingHighlight.text}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                              >
                                {saving ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                onClick={() => setEditingHighlight(null)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Edit Paragraph Modal */}
                  {editingParagraph && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {editingParagraph.id ? 'Edit Paragraph' : 'Add Paragraph'}
                            </h4>
                            <button
                              onClick={() => setEditingParagraph(null)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <i className="ri-close-line text-2xl"></i>
                            </button>
                          </div>

                          <div className="space-y-4">
                            <FormField label="Content">
                              <textarea
                                value={editingParagraph.content}
                                onChange={(e) => setEditingParagraph({ ...editingParagraph, content: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter paragraph content"
                              />
                            </FormField>

                            <FormField label="Position">
                              <select
                                value={editingParagraph.position || 'before'}
                                onChange={(e) => setEditingParagraph({ ...editingParagraph, position: e.target.value as 'before' | 'after' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="before">Before Highlights</option>
                                <option value="after">After Highlights</option>
                              </select>
                            </FormField>

                            <div className="flex items-center gap-3 pt-4">
                              <button
                                onClick={handleSaveParagraph}
                                disabled={saving || !editingParagraph.content}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                              >
                                {saving ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                onClick={() => setEditingParagraph(null)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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

              {activeSection === 'global-reach' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Global Reach and Vision Section</h3>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Heading">
                      <input
                        type="text"
                        value={content.globalReachHeading || ''}
                        onChange={(e) => setContent({ ...content, globalReachHeading: e.target.value || null })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Global Reach and Vision"
                      />
                    </FormField>
                  </div>

                  {/* Global Reach Cards Management */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-md font-semibold text-gray-900">Cards</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Add, edit, and reorder cards displayed in the Global Reach section
                        </p>
                      </div>
                      <button
                        onClick={handleAddGlobalReachCard}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                      >
                        <i className="ri-add-line mr-2"></i>
                        Add Card
                      </button>
                    </div>

                    <DragDropList
                      items={globalReachCards}
                      onReorder={handleReorderGlobalReachCards}
                      keyExtractor={(item) => item.id || `temp-${item.orderIndex}`}
                      renderItem={(card) => (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 border-gray-200">
                              {card.icon ? (
                                <img
                                  src={getImageUrl(card.icon)}
                                  alt={card.icon.altText || card.content}
                                  className="w-6 h-6 object-contain"
                                />
                              ) : card.iconClass ? (
                                <i className={`${card.iconClass} text-gray-700 text-lg`}></i>
                              ) : (
                                <i className="ri-global-line text-gray-700 text-lg"></i>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2">{card.content}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingGlobalReachCard(card)}
                              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                            {card.id && (
                              <button
                                onClick={() => handleDeleteGlobalReachCard(card.id!)}
                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      emptyMessage="No cards yet. Click 'Add Card' to create one."
                    />
                  </div>

                  {/* Edit Global Reach Card Modal */}
                  {editingGlobalReachCard && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {editingGlobalReachCard.id ? 'Edit Card' : 'Add Card'}
                            </h4>
                            <button
                              onClick={() => setEditingGlobalReachCard(null)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <i className="ri-close-line text-2xl"></i>
                            </button>
                          </div>

                          <div className="space-y-4">
                            <FormField label="Icon (SVG Image)">
                              <ImageSelector
                                value={editingGlobalReachCard.iconId}
                                onChange={(id) => setEditingGlobalReachCard({ ...editingGlobalReachCard, iconId: id || null })}
                                label="Upload SVG Icon"
                              />
                              <p className="text-sm text-gray-500 mt-2">
                                Upload an SVG icon that will appear in the orange circle for this card. If not provided, a default icon will be used.
                              </p>
                            </FormField>

                            <FormField label="Content">
                              <textarea
                                value={editingGlobalReachCard.content}
                                onChange={(e) => setEditingGlobalReachCard({ ...editingGlobalReachCard, content: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter card content"
                              />
                            </FormField>

                            <div className="flex items-center gap-3 pt-4">
                              <button
                                onClick={handleSaveGlobalReachCard}
                                disabled={saving || !editingGlobalReachCard.content}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                              >
                                {saving ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                onClick={() => setEditingGlobalReachCard(null)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
