import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';

type SectionTab = 'hero' | 'about' | 'stats' | 'products' | 'quality' | 'specialties' | 'testimonials' | 'contact';

interface HeroSection {
  id?: number;
  title: string;
  subtitle: string;
  backgroundImageId: number | null;
  titleColor: string;
  subtitleColor: string;
  overlayOpacity: number;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
}

interface AboutParagraph {
  id: number;
  content: string;
  orderIndex: number;
}

interface AboutSection {
  id?: number;
  title: string | null;
  subtitle: string | null;
  introText: string | null;
  backgroundImageId: number | null;
  mainImageId: number | null;
  ctaText: string | null;
  ctaUrl: string | null;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  mainImage?: {
    filePath: string;
    altText: string;
  };
  paragraphs?: AboutParagraph[];
}

interface Stat {
  id: number;
  iconClass: string;
  imageId: number | null;
  number: string;
  label: string;
  orderIndex: number;
  image?: {
    filePath: string;
    altText: string;
  };
}

interface QualitySection {
  id?: number;
  title: string;
  content: string;
  imageId: number | null;
  image?: {
    filePath: string;
    altText: string;
  };
}

interface ProductsSection {
  id?: number;
  heading: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

interface ProductsCard {
  id: number;
  name: string;
  backgroundImageId: number | null;
  cardImageId: number | null;
  internalLink: string | null;
  orderIndex: number;
  isActive: boolean;
  backgroundImage?: {
    filePath: string;
    altText: string;
  };
  cardImage?: {
    filePath: string;
    altText: string;
  };
}

interface SpecialtiesSection {
  id?: number;
  heading: string;
  description: string;
  imageId: number | null;
  ctaText: string;
  ctaUrl: string;
  image?: {
    filePath: string;
    altText: string;
  };
}

interface TestimonialsSection {
  id?: number;
  subtitle: string;
  heading: string;
}

interface ContactSection {
  id?: number;
  heading: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  imageId: number | null;
  image?: {
    filePath: string;
    altText: string;
  };
}

export default function HomePageManagement() {
  const [activeSection, setActiveSection] = useState<SectionTab>('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Hero Section
  const [heroData, setHeroData] = useState<HeroSection>({
    title: '',
    subtitle: '',
    backgroundImageId: null,
    titleColor: '#FFFFFF',
    subtitleColor: '#FFFFFF',
    overlayOpacity: 40
  });

  // About Section
  const [aboutData, setAboutData] = useState<AboutSection>({
    title: null,
    subtitle: null,
    introText: null,
    backgroundImageId: null,
    mainImageId: null,
    ctaText: null,
    ctaUrl: null
  });
  const [aboutParagraphs, setAboutParagraphs] = useState<AboutParagraph[]>([]);
  const [showParagraphModal, setShowParagraphModal] = useState(false);
  const [editingParagraph, setEditingParagraph] = useState<AboutParagraph | null>(null);

  // Stats
  const [stats, setStats] = useState<Stat[]>([]);
  const [showStatModal, setShowStatModal] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);

  // Quality Section
  const [qualityData, setQualityData] = useState<QualitySection>({
    title: '',
    content: '',
    imageId: null
  });

  // Products Section
  const [productsData, setProductsData] = useState<ProductsSection>({
    heading: '',
    description: '',
    ctaText: '',
    ctaUrl: ''
  });
  const [productsCards, setProductsCards] = useState<ProductsCard[]>([]);
  const [showProductCardModal, setShowProductCardModal] = useState(false);
  const [editingProductCard, setEditingProductCard] = useState<ProductsCard | null>(null);

  // Specialties Section
  const [specialtiesData, setSpecialtiesData] = useState<SpecialtiesSection>({
    heading: '',
    description: '',
    imageId: null,
    ctaText: '',
    ctaUrl: ''
  });

  // Testimonials Section
  const [testimonialsData, setTestimonialsData] = useState<TestimonialsSection>({
    subtitle: '',
    heading: ''
  });

  // Contact Section
  const [contactData, setContactData] = useState<ContactSection>({
    heading: '',
    companyName: '',
    address: '',
    phone: '',
    email: '',
    imageId: null
  });

  const sectionTabs = [
    { id: 'hero' as SectionTab, label: 'Hero Section', icon: 'ri-image-line' },
    { id: 'about' as SectionTab, label: 'About Section', icon: 'ri-information-line' },
    { id: 'stats' as SectionTab, label: 'Statistics', icon: 'ri-bar-chart-line' },
    { id: 'products' as SectionTab, label: 'Products Section', icon: 'ri-shopping-bag-line' },
    { id: 'quality' as SectionTab, label: 'Quality Section', icon: 'ri-shield-check-line' },
    { id: 'specialties' as SectionTab, label: 'Specialties Section', icon: 'ri-medicine-bottle-line' },
    { id: 'testimonials' as SectionTab, label: 'Testimonials Section', icon: 'ri-quote-text-line' },
    { id: 'contact' as SectionTab, label: 'Contact Section', icon: 'ri-phone-line' }
  ];

  // Fetch data on mount and section change
  useEffect(() => {
    fetchSectionData();
  }, [activeSection]);

  const fetchSectionData = async () => {
    setLoading(true);
    try {
      switch (activeSection) {
        case 'hero':
          const heroRes = await api.get<HeroSection>('/home-hero-section');
          if (heroRes.success && heroRes.data) {
            setHeroData(heroRes.data as HeroSection);
          }
          break;
        case 'about':
          const aboutRes = await api.get<AboutSection>('/home-about-section');
          if (aboutRes.success && aboutRes.data) {
            const data = aboutRes.data as AboutSection;
            setAboutData({
              id: data.id,
              title: data.title || null,
              subtitle: data.subtitle || null,
              introText: data.introText || null,
              backgroundImageId: data.backgroundImageId || null,
              mainImageId: data.mainImageId || null,
              ctaText: data.ctaText || null,
              ctaUrl: data.ctaUrl || null,
              backgroundImage: data.backgroundImage,
              mainImage: data.mainImage
            });
            setAboutParagraphs(data.paragraphs || []);
          } else {
            // Initialize with empty values if no data exists
            setAboutData({
              title: null,
              subtitle: null,
              introText: null,
              backgroundImageId: null,
              mainImageId: null,
              ctaText: null,
              ctaUrl: null
            });
            setAboutParagraphs([]);
          }
          break;
        case 'stats':
          const statsRes = await api.get<Stat[]>('/home-stats');
          if (statsRes.success && statsRes.data) {
            setStats((statsRes.data as Stat[]).sort((a, b) => a.orderIndex - b.orderIndex));
          }
          break;
        case 'products':
          const productsRes = await api.get<ProductsSection>('/home-products-section');
          if (productsRes.success && productsRes.data) {
            setProductsData(productsRes.data as ProductsSection);
          } else {
            setProductsData({
              heading: '',
              description: '',
              ctaText: '',
              ctaUrl: ''
            });
          }
          const productsCardsRes = await api.get<ProductsCard[]>('/home-products-cards');
          if (productsCardsRes.success && productsCardsRes.data) {
            setProductsCards((productsCardsRes.data as ProductsCard[]).sort((a, b) => a.orderIndex - b.orderIndex));
          } else {
            setProductsCards([]);
          }
          break;
        case 'quality':
          const qualityRes = await api.get<any>('/home-quality-section');
          if (qualityRes.success && qualityRes.data) {
            const data = qualityRes.data;
            // Map backend fields to frontend interface
            setQualityData({
              id: data.id,
              title: data.heading || data.title || '',
              content: data.description || data.content || '',
              imageId: data.backgroundImageId || data.imageId || null,
              image: data.backgroundImage || data.image,
            });
          }
          break;
        case 'specialties':
          const specialtiesRes = await api.get<SpecialtiesSection>('/home-specialties-section');
          if (specialtiesRes.success && specialtiesRes.data) {
            setSpecialtiesData(specialtiesRes.data as SpecialtiesSection);
          }
          break;
        case 'testimonials':
          const testimonialsRes = await api.get<TestimonialsSection>('/home-testimonials-section');
          if (testimonialsRes.success && testimonialsRes.data) {
            setTestimonialsData(testimonialsRes.data as TestimonialsSection);
          }
          break;
        case 'contact':
          const contactRes = await api.get<ContactSection>('/home-contact-section');
          if (contactRes.success && contactRes.data) {
            setContactData(contactRes.data as ContactSection);
          }
          break;
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      alert(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async () => {
    setSaving(true);
    try {
      const response = await api.put('/home-hero-section', heroData);
      if (response.success) {
        alert('Hero section saved successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    try {
      const response = await api.put('/home-about-section', { ...aboutData, paragraphs: aboutParagraphs });
      if (response.success) {
        alert('About section saved successfully!');
        // Refresh the data
        const aboutRes = await api.get<AboutSection>('/home-about-section');
        if (aboutRes.success && aboutRes.data) {
          const data = aboutRes.data as AboutSection;
          setAboutData({
            id: data.id,
            title: data.title || null,
            subtitle: data.subtitle || null,
            introText: data.introText || null,
            backgroundImageId: data.backgroundImageId || null,
            mainImageId: data.mainImageId || null,
            ctaText: data.ctaText || null,
            ctaUrl: data.ctaUrl || null,
            backgroundImage: data.backgroundImage,
            mainImage: data.mainImage
          });
          setAboutParagraphs(data.paragraphs || []);
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveParagraph = async (paragraph: AboutParagraph) => {
    setSaving(true);
    try {
      if (paragraph.id) {
        await api.put(`/home-about-paragraphs/${paragraph.id}`, paragraph);
      } else {
        await api.post('/home-about-paragraphs', { ...paragraph, orderIndex: aboutParagraphs.length });
      }
      setShowParagraphModal(false);
      setEditingParagraph(null);
      fetchSectionData();
      alert('Paragraph saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteParagraph = async (id: number) => {
    if (!confirm('Are you sure you want to delete this paragraph?')) return;
    setSaving(true);
    try {
      await api.delete(`/home-about-paragraphs/${id}`);
      setAboutParagraphs(aboutParagraphs.filter(p => p.id !== id));
      alert('Paragraph deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderParagraphs = async (reorderedParagraphs: AboutParagraph[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedParagraphs.length; i++) {
        await api.put(`/home-about-paragraphs/${reorderedParagraphs[i].id}`, {
          ...reorderedParagraphs[i],
          orderIndex: i
        });
      }
      setAboutParagraphs(reorderedParagraphs);
      alert('Paragraphs order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStats = async (reorderedStats: Stat[]) => {
    setSaving(true);
    try {
      // Update orderIndex for each stat
      for (let i = 0; i < reorderedStats.length; i++) {
        await api.put(`/home-stats/${reorderedStats[i].id}`, {
          ...reorderedStats[i],
          orderIndex: i
        });
      }
      setStats(reorderedStats);
      alert('Statistics order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStat = async (stat: Stat) => {
    setSaving(true);
    try {
      if (stat.id) {
        await api.put(`/home-stats/${stat.id}`, stat);
      } else {
        await api.post('/home-stats', { ...stat, orderIndex: stats.length });
      }
      setShowStatModal(false);
      setEditingStat(null);
      fetchSectionData();
      alert('Stat saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStat = async (id: number) => {
    if (!confirm('Are you sure you want to delete this statistic?')) return;
    setSaving(true);
    try {
      await api.delete(`/home-stats/${id}`);
      setStats(stats.filter(s => s.id !== id));
      alert('Stat deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveQuality = async () => {
    setSaving(true);
    try {
      // Map frontend fields to backend fields
      const payload = {
        heading: qualityData.title || null,
        description: qualityData.content || null,
        backgroundImageId: qualityData.imageId || null,
      };
      const response = await api.put('/home-quality-section', payload);
      if (response.success) {
        alert('Quality section saved successfully!');
        // Refresh the data
        const qualityRes = await api.get<QualitySection>('/home-quality-section');
        if (qualityRes.success && qualityRes.data) {
          const data = qualityRes.data as any;
          setQualityData({
            id: data.id,
            title: data.heading || data.title || '',
            content: data.description || data.content || '',
            imageId: data.backgroundImageId || data.imageId || null,
            image: data.backgroundImage || data.image,
          });
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProducts = async () => {
    setSaving(true);
    try {
      const response = await api.put('/home-products-section', productsData);
      if (response.success) {
        alert('Products section saved successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProductCard = async (card: ProductsCard) => {
    setSaving(true);
    try {
      if (card.id && card.id > 0) {
        await api.put(`/home-products-cards/${card.id}`, card);
      } else {
        await api.post('/home-products-cards', { ...card, orderIndex: productsCards.length });
      }
      setShowProductCardModal(false);
      setEditingProductCard(null);
      const productsCardsRes = await api.get<ProductsCard[]>('/home-products-cards');
      if (productsCardsRes.success && productsCardsRes.data) {
        setProductsCards((productsCardsRes.data as ProductsCard[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
      alert('Product card saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProductCard = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product card?')) return;
    setSaving(true);
    try {
      await api.delete(`/home-products-cards/${id}`);
      setProductsCards(productsCards.filter(c => c.id !== id));
      alert('Product card deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleReorderProductCards = async (reorderedCards: ProductsCard[]) => {
    setSaving(true);
    try {
      for (let i = 0; i < reorderedCards.length; i++) {
        await api.put(`/home-products-cards/${reorderedCards[i].id}`, {
          ...reorderedCards[i],
          orderIndex: i
        });
      }
      setProductsCards(reorderedCards);
      alert('Product cards order updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSpecialties = async () => {
    setSaving(true);
    try {
      const response = await api.put('/home-specialties-section', specialtiesData);
      if (response.success) {
        alert('Specialties section saved successfully!');
        // Refresh the data
        const specialtiesRes = await api.get<any>('/home-specialties-section');
        if (specialtiesRes.success && specialtiesRes.data) {
          const data = specialtiesRes.data;
          setSpecialtiesData({
            id: data.id,
            heading: data.heading || '',
            description: data.description || '',
            imageId: data.imageId || null,
            image: data.image,
            ctaText: data.ctaText || '',
            ctaUrl: data.ctaUrl || '',
          });
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTestimonials = async () => {
    setSaving(true);
    try {
      const response = await api.put('/home-testimonials-section', testimonialsData);
      if (response.success) {
        alert('Testimonials section saved successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setSaving(true);
    try {
      const response = await api.put('/home-contact-section', contactData);
      if (response.success) {
        alert('Contact section saved successfully!');
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
      {/* Page Title */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium text-gray-900">Home Page Management</h2>
        <p className="text-sm text-gray-600 mt-1">Manage all sections of your home page</p>
      </div>

      {/* Section Tabs */}
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

        {/* Section Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
              <p className="text-gray-600 mt-2">Loading...</p>
            </div>
          ) : (
            <>
              {activeSection === 'hero' && (
                <HeroSectionEditor
                  data={heroData}
                  onChange={setHeroData}
                  onSave={handleSaveHero}
                  saving={saving}
                  getImageUrl={getImageUrl}
                />
              )}
              {activeSection === 'about' && (
                <AboutSectionEditor
                  data={aboutData}
                  onChange={setAboutData}
                  onSave={handleSaveAbout}
                  saving={saving}
                  getImageUrl={getImageUrl}
                  paragraphs={aboutParagraphs}
                  onAddParagraph={() => {
                    setEditingParagraph({
                      id: 0,
                      content: '',
                      orderIndex: aboutParagraphs.length
                    });
                    setShowParagraphModal(true);
                  }}
                  onEditParagraph={(p) => {
                    setEditingParagraph(p);
                    setShowParagraphModal(true);
                  }}
                  onDeleteParagraph={handleDeleteParagraph}
                  onReorderParagraphs={handleReorderParagraphs}
                />
              )}
              {activeSection === 'stats' && (
                <StatsSectionEditor
                  stats={stats}
                  onReorder={handleSaveStats}
                  onEdit={(stat) => {
                    setEditingStat(stat);
                    setShowStatModal(true);
                  }}
                  onDelete={handleDeleteStat}
                  onAdd={() => {
                    setEditingStat({
                      id: 0,
                      iconClass: '',
                      imageId: null,
                      number: '',
                      label: '',
                      orderIndex: stats.length
                    });
                    setShowStatModal(true);
                  }}
                  getImageUrl={getImageUrl}
                />
              )}
              {activeSection === 'products' && (
                <ProductsSectionEditor
                  data={productsData}
                  onChange={setProductsData}
                  onSave={handleSaveProducts}
                  saving={saving}
                  cards={productsCards}
                  onAddCard={() => {
                    setEditingProductCard({
                      id: 0,
                      name: '',
                      backgroundImageId: null,
                      cardImageId: null,
                      internalLink: null,
                      orderIndex: productsCards.length,
                      isActive: true
                    });
                    setShowProductCardModal(true);
                  }}
                  onEditCard={(card) => {
                    setEditingProductCard(card);
                    setShowProductCardModal(true);
                  }}
                  onDeleteCard={handleDeleteProductCard}
                  onReorderCards={handleReorderProductCards}
                  getImageUrl={getImageUrl}
                />
              )}
              {activeSection === 'quality' && (
                <QualitySectionEditor
                  data={qualityData}
                  onChange={setQualityData}
                  onSave={handleSaveQuality}
                  saving={saving}
                  getImageUrl={getImageUrl}
                />
              )}
              {activeSection === 'specialties' && (
                <SpecialtiesSectionEditor
                  data={specialtiesData}
                  onChange={setSpecialtiesData}
                  onSave={handleSaveSpecialties}
                  saving={saving}
                  getImageUrl={getImageUrl}
                />
              )}
              {activeSection === 'testimonials' && (
                <TestimonialsSectionEditor
                  data={testimonialsData}
                  onChange={setTestimonialsData}
                  onSave={handleSaveTestimonials}
                  saving={saving}
                />
              )}
              {activeSection === 'contact' && (
                <ContactSectionEditor
                  data={contactData}
                  onChange={setContactData}
                  onSave={handleSaveContact}
                  saving={saving}
                  getImageUrl={getImageUrl}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Stat Modal */}
      {showStatModal && editingStat && (
        <StatModal
          stat={editingStat}
          onSave={handleSaveStat}
          onClose={() => {
            setShowStatModal(false);
            setEditingStat(null);
          }}
          saving={saving}
          getImageUrl={getImageUrl}
        />
      )}

      {/* Paragraph Modal */}
      {showParagraphModal && editingParagraph && (
        <ParagraphModal
          paragraph={editingParagraph}
          onSave={handleSaveParagraph}
          onClose={() => {
            setShowParagraphModal(false);
            setEditingParagraph(null);
          }}
          saving={saving}
        />
      )}

      {/* Product Card Modal */}
      {showProductCardModal && editingProductCard && (
        <ProductCardModal
          card={editingProductCard}
          onSave={handleSaveProductCard}
          onClose={() => {
            setShowProductCardModal(false);
            setEditingProductCard(null);
          }}
          saving={saving}
        />
      )}
    </div>
  );
}

// Hero Section Editor
function HeroSectionEditor({ data, onChange, onSave, saving, getImageUrl }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Title">
          <input
            type="text"
            value={data.title ?? ''}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hero title (optional)"
          />
        </FormField>

        <FormField label="Subtitle">
          <input
            type="text"
            value={data.subtitle ?? ''}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subtitle"
          />
        </FormField>

        <ImageSelector
          value={data.backgroundImageId}
          onChange={(id) => onChange({ ...data, backgroundImageId: id })}
          label="Background Image"
        />

        <FormField label="Title Color">
          <input
            type="color"
            value={data.titleColor ?? '#FFFFFF'}
            onChange={(e) => onChange({ ...data, titleColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
        </FormField>

        <FormField label="Subtitle Color">
          <input
            type="color"
            value={data.subtitleColor ?? '#FFFFFF'}
            onChange={(e) => onChange({ ...data, subtitleColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
        </FormField>

        <FormField label="Overlay Opacity" hint="0-100">
          <input
            type="number"
            min="0"
            max="100"
            value={data.overlayOpacity ?? 40}
            onChange={(e) => onChange({ ...data, overlayOpacity: parseInt(e.target.value) || 40 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
      </div>

      {/* Preview */}
      {data.backgroundImage && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
          <div className="relative rounded-lg overflow-hidden" style={{ height: '300px' }}>
            <img
              src={getImageUrl(data.backgroundImage)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex items-center justify-center text-center px-8"
              style={{
                backgroundColor: `rgba(0,0,0,${data.overlayOpacity / 100})`
              }}
            >
              <div>
                <h1 style={{ color: data.titleColor }} className="text-3xl font-medium mb-2">
                  {data.title}
                </h1>
                <p style={{ color: data.subtitleColor }} className="text-lg">
                  {data.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// About Section Editor
function AboutSectionEditor({ 
  data, 
  onChange, 
  onSave, 
  saving, 
  getImageUrl,
  paragraphs = [],
  onAddParagraph,
  onEditParagraph,
  onDeleteParagraph,
  onReorderParagraphs
}: any) {
  // Safety checks
  const safeData = data || {};
  const safeParagraphs = Array.isArray(paragraphs) ? paragraphs : [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">About Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField label="Title">
            <input
              type="text"
              value={safeData.title || ''}
              onChange={(e) => onChange({ ...safeData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Section Title (optional)"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Subtitle">
            <input
              type="text"
              value={safeData.subtitle || ''}
              onChange={(e) => onChange({ ...safeData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Section Subtitle (optional)"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Intro Text (Fallback if no paragraphs)">
            <textarea
              value={safeData.introText || ''}
              onChange={(e) => onChange({ ...safeData, introText: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter intro text (used if no paragraphs are added)"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <ImageSelector
            value={safeData.backgroundImageId || null}
            onChange={(id) => onChange({ ...safeData, backgroundImageId: id })}
            label="Section Background Image (PNG)"
          />
          <p className="text-sm text-gray-500 mt-2">
            Background image for the section with rounded top corners. Recommended: PNG format.
          </p>
        </div>

        <div className="md:col-span-2">
          <ImageSelector
            value={safeData.mainImageId || null}
            onChange={(id) => onChange({ ...safeData, mainImageId: id })}
            label="Section Image"
          />
        </div>

        <FormField label="CTA Text">
          <input
            type="text"
              value={safeData.ctaText || ''}
              onChange={(e) => onChange({ ...safeData, ctaText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="More About Us"
          />
        </FormField>

        <FormField label="CTA URL">
          <input
            type="text"
              value={safeData.ctaUrl || ''}
              onChange={(e) => onChange({ ...safeData, ctaUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="/about"
          />
        </FormField>
      </div>

      {/* Paragraphs Section */}
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-gray-900">Paragraphs</h4>
          <button
            onClick={() => onAddParagraph && onAddParagraph()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Paragraph
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            <i className="ri-information-line mr-2"></i>
            Add multiple paragraphs. Drag and drop to reorder. If paragraphs are added, they will be displayed instead of the intro text.
          </p>

          <DragDropList
            items={safeParagraphs}
            onReorder={onReorderParagraphs || (() => {})}
            keyExtractor={(p: any) => p.id}
            emptyMessage="No paragraphs yet. Click 'Add Paragraph' to get started!"
            renderItem={(paragraph: any) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 line-clamp-2">{paragraph.content}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onEditParagraph && onEditParagraph(paragraph)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => onDeleteParagraph && onDeleteParagraph(paragraph.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

// Paragraph Modal
function ParagraphModal({ paragraph, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(paragraph || { id: 0, content: '', orderIndex: 0 });
  
  // Update formData when paragraph prop changes
  useEffect(() => {
    if (paragraph) {
      setFormData(paragraph);
    }
  }, [paragraph]);

  return (
    <Modal isOpen={true} onClose={onClose} title={paragraph?.id ? 'Edit Paragraph' : 'Add Paragraph'} size="md">
      <div className="space-y-4">
        <FormField label="Content" required>
          <textarea
            value={formData?.content || ''}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter paragraph content"
          />
        </FormField>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData?.content}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Stats Section Editor
function StatsSectionEditor({ stats, onReorder, onEdit, onDelete, onAdd, getImageUrl }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
        >
          <i className="ri-add-line mr-2"></i>Add Statistic
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-4">
          <i className="ri-information-line mr-2"></i>
          Drag and drop items to reorder them. Changes are saved automatically.
        </p>

        <DragDropList
          items={stats}
          onReorder={onReorder}
          keyExtractor={(stat: Stat) => stat.id}
          emptyMessage="No statistics yet. Click 'Add Statistic' to get started!"
          renderItem={(stat: Stat) => (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                {stat.image && stat.image.filePath ? (
                  <img 
                    src={getImageUrl(stat.image)} 
                    alt={stat.image.altText || stat.label} 
                    className="h-10 w-10 object-contain"
                  />
                ) : stat.iconClass ? (
                  <i className={`${stat.iconClass} text-2xl text-blue-600`}></i>
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                    <i className="ri-image-line text-gray-400"></i>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{stat.number}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(stat)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                >
                  <i className="ri-edit-line"></i>
                </button>
                <button
                  onClick={() => onDelete(stat.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

// Quality Section Editor
function QualitySectionEditor({ data, onChange, onSave, saving, getImageUrl }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Quality Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Title" required>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Content" required>
            <textarea
              value={data.content || ''}
              onChange={(e) => onChange({ ...data, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <ImageSelector
            value={data.imageId}
            onChange={(id) => onChange({ ...data, imageId: id })}
            label="Background Image"
          />
          <p className="text-sm text-gray-500 mt-2">
            Background image for the quality section.
          </p>
        </div>
      </div>
    </div>
  );
}

// Products Section Editor
function ProductsSectionEditor({ data = {}, onChange, onSave, saving, cards = [], onAddCard, onEditCard, onDeleteCard, onReorderCards, getImageUrl }: any) {
  const getCardImageUrl = (card: any): string => {
    if (!card || !card.cardImage) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${card.cardImage.filePath}`;
  };

  const safeCards = Array.isArray(cards) ? cards : [];
  const safeData = data || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Products Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField label="Heading">
            <input
              type="text"
              value={safeData.heading || ''}
              onChange={(e) => onChange && onChange({ ...safeData, heading: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Our Products"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Description">
            <textarea
              value={safeData.description || ''}
              onChange={(e) => onChange && onChange({ ...safeData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter products section description"
            />
          </FormField>
        </div>

        <FormField label="CTA Text">
          <input
            type="text"
            value={safeData.ctaText || ''}
            onChange={(e) => onChange && onChange({ ...safeData, ctaText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="View All Products"
          />
        </FormField>

        <FormField label="CTA URL">
          <input
            type="text"
            value={safeData.ctaUrl || ''}
            onChange={(e) => onChange && onChange({ ...safeData, ctaUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="/products"
          />
        </FormField>
      </div>

        {/* Products Cards Section */}
      <div className="border-t pt-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Products Cards</h3>
          <button
            onClick={onAddCard}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>Add Card
          </button>
        </div>

        {safeCards.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <i className="ri-image-line text-4xl text-gray-400 mb-2"></i>
            <p className="text-gray-500">No cards yet. Add your first product card!</p>
          </div>
        ) : (
          <DragDropList
            items={safeCards}
            onReorder={onReorderCards || (() => {})}
            onReorder={onReorderCards}
            keyExtractor={(card: any) => card.id}
            emptyMessage="No cards yet. Click 'Add Card' to get started!"
            renderItem={(card: any) => (
              <div className="flex items-center space-x-4 w-full">
                {card.cardImage && (
                  <img
                    src={getCardImageUrl(card)}
                    alt={card.name || 'Card image'}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{card.name || 'Unnamed Card'}</h3>
                  {card.internalLink && (
                    <p className="text-sm text-gray-600">Link: {card.internalLink}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    card.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {card.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => onEditCard && onEditCard(card)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                    title="Edit"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => onDeleteCard && onDeleteCard(card.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}

// Specialties Section Editor
function SpecialtiesSectionEditor({ data, onChange, onSave, saving, getImageUrl }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Specialties Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField label="Heading">
            <input
              type="text"
              value={data.heading || ''}
              onChange={(e) => onChange({ ...data, heading: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Our Specialties"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Description">
            <textarea
              value={data.description || ''}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter specialties section description"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <ImageSelector
            value={data.imageId}
            onChange={(id) => onChange({ ...data, imageId: id })}
            label="Section Image (Left Side)"
          />
          <p className="text-sm text-gray-500 mt-2">
            Large vertical image displayed on the left side of the specialties section.
          </p>
        </div>

        <FormField label="CTA Text">
          <input
            type="text"
            value={data.ctaText || ''}
            onChange={(e) => onChange({ ...data, ctaText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Explore Products"
          />
        </FormField>

        <FormField label="CTA URL">
          <input
            type="text"
            value={data.ctaUrl || ''}
            onChange={(e) => onChange({ ...data, ctaUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="/products"
          />
        </FormField>
      </div>
    </div>
  );
}

// Testimonials Section Editor
function TestimonialsSectionEditor({ data, onChange, onSave, saving }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Testimonials Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Subtitle">
          <input
            type="text"
            value={data.subtitle || ''}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Testimonial"
          />
        </FormField>

        <FormField label="Heading">
          <input
            type="text"
            value={data.heading || ''}
            onChange={(e) => onChange({ ...data, heading: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Client Stories & Experiences"
          />
        </FormField>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          <i className="ri-information-line mr-2"></i>
          Note: Testimonials content is managed separately. This section only controls the header.
        </p>
      </div>
    </div>
  );
}

// Contact Section Editor
function ContactSectionEditor({ data, onChange, onSave, saving, getImageUrl }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Contact Section</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField label="Heading">
            <input
              type="text"
              value={data.heading || ''}
              onChange={(e) => onChange({ ...data, heading: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Contact Us"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Company Name">
            <input
              type="text"
              value={data.companyName || ''}
              onChange={(e) => onChange({ ...data, companyName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ADONIS MEDICAL SYSTEMS PVT LTD"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Address">
            <textarea
              value={data.address || ''}
              onChange={(e) => onChange({ ...data, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="E-70, PHASE- VIII, INDUSTRIAL AREA, MOHALI, 160071."
            />
          </FormField>
        </div>

        <FormField label="Phone">
          <input
            type="text"
            value={data.phone || ''}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="9872003273"
          />
        </FormField>

        <FormField label="Email">
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="support@adonismedical.com"
          />
        </FormField>

        <div className="md:col-span-2">
          <ImageSelector
            value={data.imageId}
            onChange={(id) => onChange({ ...data, imageId: id })}
            label="Section Image"
          />
        </div>
      </div>
    </div>
  );
}

// Stat Modal
function StatModal({ stat, onSave, onClose, saving, getImageUrl }: any) {
  const [formData, setFormData] = useState(stat);

  // Validation: Either iconClass or imageId must be provided
  const isValid = formData.number && formData.label && (formData.iconClass || formData.imageId);

  return (
    <Modal isOpen={true} onClose={onClose} title={stat.id ? 'Edit Statistic' : 'Add Statistic'} size="md">
      <div className="space-y-4">
        <FormField label="Icon Class" hint="Use RemixIcon class names (e.g., ri-user-line) or upload an image below">
          <input
            type="text"
            value={formData.iconClass || ''}
            onChange={(e) => setFormData({ ...formData, iconClass: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="ri-number-1"
          />
          {formData.iconClass && (
            <div className="mt-2 text-xs text-gray-500">
              Preview: <i className={formData.iconClass}></i>
            </div>
          )}
        </FormField>

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">OR</p>
          <ImageSelector
            value={formData.imageId || null}
            onChange={(id) => setFormData({ ...formData, imageId: id })}
            label="Upload Icon Image (JPG, PNG, SVG, etc.)"
          />
          {formData.image && formData.image.filePath && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Current Image:</p>
              <img 
                src={getImageUrl(formData.image)} 
                alt={formData.image.altText || 'Stat icon'} 
                className="h-12 w-12 object-contain border border-gray-200 rounded"
              />
            </div>
          )}
        </div>

        <FormField label="Number/Value" required>
          <input
            type="text"
            value={formData.number || ''}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="100+"
          />
        </FormField>

        <FormField label="Label" required>
          <input
            type="text"
            value={formData.label || ''}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Happy Clients"
          />
        </FormField>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-gray-600">
            <i className="ri-information-line mr-1"></i>
            You can use either an icon class or upload an image. If both are provided, the image will take priority.
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !isValid}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Product Card Modal
function ProductCardModal({ card, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState<ProductsCard>(card);

  useEffect(() => {
    setFormData(card);
  }, [card]);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={card.id && card.id > 0 ? 'Edit Product Card' : 'Add New Product Card'}
      size="lg"
    >
      <div className="space-y-6">
        <FormField label="Card Name" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="HF Mobile"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageSelector
            value={formData.backgroundImageId}
            onChange={(id) => setFormData({ ...formData, backgroundImageId: id })}
            label="Background Image"
          />

          <ImageSelector
            value={formData.cardImageId}
            onChange={(id) => setFormData({ ...formData, cardImageId: id })}
            label="Card Image"
          />
        </div>

        <FormField label="Internal Link" hint="Page URL to redirect to (e.g., /products/hf-mobile)">
          <input
            type="text"
            value={formData.internalLink || ''}
            onChange={(e) => setFormData({ ...formData, internalLink: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="/products/hf-mobile"
          />
        </FormField>

        <FormField label="Status">
          <select
            value={formData.isActive ? 'active' : 'inactive'}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={saving || !formData.name}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : card.id && card.id > 0 ? 'Update Card' : 'Create Card'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
