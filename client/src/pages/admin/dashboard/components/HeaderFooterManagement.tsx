import { useState, useEffect } from 'react';
import { api } from '../../../../utils/api';
import Modal from '../../../../components/cms/Modal';
import FormField from '../../../../components/cms/FormField';
import DragDropList from '../../../../components/cms/DragDropList';
import ImageSelector from '../../../../components/cms/ImageSelector';
import { getImageUrl } from '../../../../utils/imageUrl';

type SectionTab = 'header' | 'footer';

interface NavigationItem {
  id: number;
  label: string;
  url: string | null;
  parentId: number | null;
  orderIndex: number;
  isActive: boolean;
  openInNewTab: boolean;
  children?: NavigationItem[];
}

interface FooterSection {
  id: number;
  title: string;
  orderIndex: number;
  links?: FooterLink[];
}

interface FooterLink {
  id: number;
  footerSectionId: number;
  label: string;
  url: string;
  iconSvg: string | null;
  iconImageId: number | null;
  orderIndex: number;
  iconImage?: {
    filePath: string;
    altText: string;
  };
}

interface FooterLogo {
  id: number;
  name: string;
  logoImageId: number | null;
  orderIndex: number;
  isActive: boolean;
  logoImage?: {
    filePath: string;
    altText: string;
  };
}

export default function HeaderFooterManagement() {
  const [activeSection, setActiveSection] = useState<SectionTab>('header');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [showNavModal, setShowNavModal] = useState(false);
  const [editingNavItem, setEditingNavItem] = useState<NavigationItem | null>(null);

  const [footerSections, setFooterSections] = useState<FooterSection[]>([]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [editingSection, setEditingSection] = useState<FooterSection | null>(null);
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  
  // Footer Logos
  const [footerLogos, setFooterLogos] = useState<FooterLogo[]>([]);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [editingLogo, setEditingLogo] = useState<FooterLogo | null>(null);
  
  // Social Links
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [editingSocial, setEditingSocial] = useState<any | null>(null);

  useEffect(() => {
    if (activeSection === 'header') {
      fetchNavItems();
    } else {
      fetchFooterSections();
      fetchFooterLogos();
      fetchSocialLinks();
    }
  }, [activeSection]);

  const fetchNavItems = async () => {
    setLoading(true);
    try {
      const response = await api.get<NavigationItem[]>('/navigation');
      if (response.success && response.data) {
        const allItems = response.data as NavigationItem[];
        // Get top-level items (no parentId)
        const topLevelItems = allItems
          .filter(item => !item.parentId)
          .sort((a, b) => a.orderIndex - b.orderIndex);
        
        // Attach children to each parent item
        const itemsWithChildren = topLevelItems.map(item => {
          const children = allItems
            .filter(child => child.parentId === item.id)
            .sort((a, b) => a.orderIndex - b.orderIndex);
          return { ...item, children: children.length > 0 ? children : undefined };
        });
        
        setNavItems(itemsWithChildren);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const fetchFooterSections = async () => {
    setLoading(true);
    try {
      const response = await api.get<FooterSection[]>('/footer/sections');
      if (response.success && response.data) {
        const sections = (response.data as FooterSection[])
          .sort((a, b) => a.orderIndex - b.orderIndex);
        setFooterSections(sections);
      }
    } catch (error: any) {
      alert(error.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const fetchFooterLogos = async () => {
    try {
      const response = await api.get<FooterLogo[]>('/footer/logos');
      if (response.success && response.data) {
        setFooterLogos((response.data as FooterLogo[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching footer logos:', error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await api.get<any[]>('/social-links');
      if (response.success && response.data) {
        setSocialLinks((response.data as any[]).sort((a, b) => a.orderIndex - b.orderIndex));
      }
    } catch (error: any) {
      console.error('Error fetching social links:', error);
    }
  };

  const handleSaveNavItem = async (item: NavigationItem) => {
    setSaving(true);
    try {
      if (item.id && item.id > 0) {
        await api.put(`/navigation/${item.id}`, item);
      } else {
        await api.post('/navigation', { ...item, orderIndex: navItems.length });
      }
      setShowNavModal(false);
      setEditingNavItem(null);
      fetchNavItems();
      alert('Navigation item saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNavItem = async (id: number) => {
    if (!confirm('Delete this navigation item?')) return;
    setSaving(true);
    try {
      await api.delete(`/navigation/${id}`);
      setNavItems(navItems.filter(n => n.id !== id));
      alert('Navigation item deleted!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFooterSection = async (section: FooterSection) => {
    setSaving(true);
    try {
      if (section.id && section.id > 0) {
        await api.put(`/footer/sections/${section.id}`, section);
      } else {
        await api.post('/footer/sections', { ...section, orderIndex: footerSections.length });
      }
      setShowSectionModal(false);
      setEditingSection(null);
      fetchFooterSections();
      alert('Footer section saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFooterSection = async (id: number) => {
    if (!confirm('Are you sure you want to delete this footer section? This will also delete all links within this section.')) return;
    setSaving(true);
    try {
      await api.delete(`/footer/sections/${id}`);
      setFooterSections(footerSections.filter(s => s.id !== id));
      alert('Footer section deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFooterLink = async (link: FooterLink) => {
    setSaving(true);
    try {
      if (link.id && link.id > 0) {
        await api.put(`/footer/links/${link.id}`, link);
      } else {
        const section = footerSections.find(s => s.id === selectedSectionId);
        await api.post('/footer/links', { ...link, footerSectionId: selectedSectionId, iconSvg: link.iconSvg || null, iconImageId: link.iconImageId || null, orderIndex: section?.links?.length || 0 });
      }
      setShowLinkModal(false);
      setEditingLink(null);
      fetchFooterSections();
      alert('Footer link saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFooterLink = async (id: number) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    setSaving(true);
    try {
      await api.delete(`/footer/links/${id}`);
      fetchFooterSections();
      alert('Footer link deleted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLogo = async (logo: FooterLogo) => {
    setSaving(true);
    try {
      if (logo.id && logo.id > 0) {
        await api.put(`/footer/logos/${logo.id}`, logo);
      } else {
        await api.post('/footer/logos', logo);
      }
      setShowLogoModal(false);
      setEditingLogo(null);
      fetchFooterLogos();
      alert('Logo saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocial = async (social: any) => {
    setSaving(true);
    try {
      if (social.id && social.id > 0) {
        await api.put(`/social-links/${social.id}`, social);
      } else {
        await api.post('/social-links', social);
      }
      setShowSocialModal(false);
      setEditingSocial(null);
      fetchSocialLinks();
      alert('Social link saved!');
    } catch (error: any) {
      alert(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-medium text-gray-900">Header & Footer Management</h2>
        <p className="text-sm text-gray-600 mt-1">Manage navigation menu and footer content</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-2">
            <button onClick={() => setActiveSection('header')} className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeSection === 'header' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
              Navigation
            </button>
            <button onClick={() => setActiveSection('footer')} className={`px-4 py-3 font-medium text-sm border-b-2 cursor-pointer ${activeSection === 'footer' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>
              Footer
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <i className="ri-loader-4-line animate-spin text-4xl text-blue-600"></i>
            </div>
          ) : activeSection === 'header' ? (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Navigation Menu</h3>
                <button onClick={() => { setEditingNavItem({ id: 0, label: '', url: null, parentId: null, orderIndex: navItems.length, isActive: true, openInNewTab: false }); setShowNavModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                  <i className="ri-add-line mr-2"></i>Add Item
                </button>
              </div>
              {navItems.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-menu-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No navigation items yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{item.label}</h4>
                            {item.children && item.children.length > 0 && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {item.children.length} sub-menu{item.children.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          {item.url && <p className="text-sm text-gray-600 mt-1">{item.url}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button 
                            onClick={() => { 
                              setEditingNavItem({ id: 0, label: '', url: null, parentId: item.id, orderIndex: item.children?.length || 0, isActive: true, openInNewTab: false }); 
                              setShowNavModal(true); 
                            }} 
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                            title="Add Sub-menu"
                          >
                            <i className="ri-add-line mr-1"></i>Sub-menu
                          </button>
                          <button onClick={() => { setEditingNavItem(item); setShowNavModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer">
                            <i className="ri-edit-line"></i>
                          </button>
                          <button onClick={() => handleDeleteNavItem(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                      {/* Show children/sub-menus */}
                      {item.children && item.children.length > 0 && (
                        <div className="ml-4 mt-3 space-y-2 border-l-2 border-gray-300 pl-4">
                          {item.children.map((child) => (
                            <div key={child.id} className="flex items-center justify-between bg-white border border-gray-200 rounded p-2">
                              <div>
                                <span className="text-sm font-medium text-gray-700">{child.label}</span>
                                {child.url && <span className="text-xs text-gray-500 ml-2">{child.url}</span>}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-0.5 text-xs rounded-full ${child.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {child.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <button onClick={() => { setEditingNavItem(child); setShowNavModal(true); }} className="p-1 text-green-600 hover:bg-green-50 rounded cursor-pointer">
                                  <i className="ri-edit-line text-sm"></i>
                                </button>
                                <button onClick={() => handleDeleteNavItem(child.id)} className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer">
                                  <i className="ri-delete-bin-line text-sm"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Logo and Social Media Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">Logo and Social Media Icons</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-gray-700">Logos</h4>
                    <button 
                      onClick={() => {
                        const existingRefex = footerLogos.find(l => l.name === 'refex');
                        const existingAdonis = footerLogos.find(l => l.name === 'adonis');
                        if (!existingRefex) {
                          setEditingLogo({ id: 0, name: 'refex', logoImageId: null, orderIndex: 0, isActive: true });
                          setShowLogoModal(true);
                        } else if (!existingAdonis) {
                          setEditingLogo({ id: 0, name: 'adonis', logoImageId: null, orderIndex: 1, isActive: true });
                          setShowLogoModal(true);
                        }
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>Add Logo
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {footerLogos.map((logo) => (
                      <div key={logo.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{logo.name} Logo</span>
                          <button 
                            onClick={() => { setEditingLogo(logo); setShowLogoModal(true); }}
                            className="p-1 text-green-600 hover:bg-green-50 rounded cursor-pointer"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                        </div>
                        {logo.logoImage && (
                          <img 
                            src={getLogoImageUrl(logo)} 
                            alt={`${logo.name} logo`}
                            className="h-12 w-auto object-contain"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-gray-700">Social Media Icons</h4>
                    <button 
                      onClick={() => {
                        setEditingSocial({ id: 0, platform: '', url: null, iconClass: null, iconId: null, orderIndex: socialLinks.length, isActive: true });
                        setShowSocialModal(true);
                      }}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>Add Social Link
                    </button>
                  </div>
                  {socialLinks.length === 0 ? (
                    <p className="text-sm text-gray-500">No social links yet</p>
                  ) : (
                    <div className="space-y-2">
                      {socialLinks.map((social) => (
                        <div key={social.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <div className="flex items-center space-x-3">
                            {social.icon && social.icon.filePath ? (
                              <img src={getImageUrl(social.icon)} alt={social.platform || 'Social'} className="w-6 h-6 object-contain" />
                            ) : social.iconClass ? (
                              <i className={`${social.iconClass} text-xl text-[#FF6B35]`}></i>
                            ) : null}
                            <div>
                              <p className="font-medium">{social.platform}</p>
                              {social.url && <p className="text-sm text-gray-600">{social.url}</p>}
                            </div>
                          </div>
                          <button 
                            onClick={() => { setEditingSocial(social); setShowSocialModal(true); }}
                            className="p-1 text-green-600 hover:bg-green-50 rounded cursor-pointer"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Sections */}
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
                    <div className="flex-1">
                      <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> Create sections like "Quick Links", "Our Products", and "Contact Information". For Contact Information, upload icon images (JPG, PNG, SVG) for Phone, Email, and Location.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Footer Sections</h3>
                  <button onClick={() => { setEditingSection({ id: 0, title: '', orderIndex: footerSections.length }); setShowSectionModal(true); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                    <i className="ri-add-line mr-2"></i>Add Section
                  </button>
                </div>
                {footerSections.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <i className="ri-layout-bottom-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">No footer sections yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {footerSections.map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{section.title}</h4>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => { setSelectedSectionId(section.id); setEditingLink({ id: 0, footerSectionId: section.id, label: '', url: '', iconImageId: null, orderIndex: section.links?.length || 0 }); setShowLinkModal(true); }} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer text-sm">
                            <i className="ri-add-line mr-1"></i>Add Link
                          </button>
                          <button onClick={() => { setEditingSection(section); setShowSectionModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer" title="Edit Section">
                            <i className="ri-edit-line"></i>
                          </button>
                          <button onClick={() => handleDeleteFooterSection(section.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer" title="Delete Section">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                      {section.links && section.links.length > 0 && (
                        <div className="space-y-2">
                          {section.links.map((link) => (
                            <div key={link.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center space-x-2 flex-1">
                                {link.iconImage && (
                                  <img 
                                    src={getLinkIconImageUrl(link)} 
                                    alt={link.label}
                                    className="w-5 h-5 object-contain"
                                  />
                                )}
                                {!link.iconImage && link.iconSvg && (
                                  <div className="w-5 h-5 flex items-center justify-center text-[#FF6B35]" dangerouslySetInnerHTML={{ __html: link.iconSvg }} />
                                )}
                                <span className="text-sm text-gray-700">{link.label} - {link.url}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <button onClick={() => { setEditingLink(link); setShowLinkModal(true); }} className="p-1 text-green-600 hover:bg-green-50 rounded cursor-pointer" title="Edit Link">
                                  <i className="ri-edit-line text-sm"></i>
                                </button>
                                <button onClick={() => handleDeleteFooterLink(link.id)} className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer" title="Delete Link">
                                  <i className="ri-delete-bin-line text-sm"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showNavModal && editingNavItem && (
        <NavItemModal item={editingNavItem} onSave={handleSaveNavItem} onClose={() => { setShowNavModal(false); setEditingNavItem(null); }} saving={saving} />
      )}

      {showSectionModal && editingSection && (
        <SectionModal section={editingSection} onSave={handleSaveFooterSection} onClose={() => { setShowSectionModal(false); setEditingSection(null); }} saving={saving} />
      )}

      {showLinkModal && editingLink && (
        <LinkModal link={editingLink} onSave={handleSaveFooterLink} onClose={() => { setShowLinkModal(false); setEditingLink(null); }} saving={saving} />
      )}

      {showLogoModal && editingLogo && (
        <LogoModal logo={editingLogo} onSave={handleSaveLogo} onClose={() => { setShowLogoModal(false); setEditingLogo(null); }} saving={saving} />
      )}

      {showSocialModal && editingSocial && (
        <SocialModal social={editingSocial} onSave={handleSaveSocial} onClose={() => { setShowSocialModal(false); setEditingSocial(null); }} saving={saving} />
      )}
    </div>
  );
}

function getLogoImageUrl(logo: FooterLogo): string {
  if (!logo.logoImage) return '';
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  return `${baseUrl}${logo.logoImage.filePath}`;
}

function getLinkIconImageUrl(link: FooterLink): string {
  if (!link.iconImage) return '';
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
  return `${baseUrl}${link.iconImage.filePath}`;
}

function LogoModal({ logo, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(logo);
  
  return (
    <Modal isOpen={true} onClose={onClose} title={logo.id > 0 ? 'Edit Logo' : 'Add Logo'} size="md">
      <div className="space-y-6">
        <FormField label="Logo Name" required>
          <select
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={logo.id > 0}
          >
            <option value="refex">Refex</option>
            <option value="adonis">Adonis</option>
          </select>
        </FormField>
        <ImageSelector
          value={formData.logoImageId}
          onChange={(id) => setFormData({ ...formData, logoImageId: id })}
          label="Logo Image"
        />
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.name} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

function SocialModal({ social, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(social);
  
  return (
    <Modal isOpen={true} onClose={onClose} title={social.id > 0 ? 'Edit Social Link' : 'Add Social Link'} size="md">
      <div className="space-y-6">
        <FormField label="Platform" required>
          <input
            type="text"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Facebook, Twitter, Instagram, LinkedIn"
          />
        </FormField>
        <FormField label="URL">
          <input
            type="text"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://facebook.com/..."
          />
        </FormField>
        <FormField label="Icon (SVG Upload)" hint="Upload SVG icon for this social link">
          <ImageSelector
            value={formData.iconId || null}
            onChange={(id) => setFormData({ ...formData, iconId: id || null })}
            label=""
          />
        </FormField>
        <FormField label="Icon Class (Optional)" hint="RemixIcon class as fallback">
          <input
            type="text"
            value={formData.iconClass || ''}
            onChange={(e) => setFormData({ ...formData, iconClass: e.target.value || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="ri-facebook-fill"
          />
        </FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.platform} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

function NavItemModal({ item, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(item);
  const isSubMenu = item.parentId !== null && item.parentId !== undefined;
  
  return (
    <Modal isOpen={true} onClose={onClose} title={item.id > 0 ? (isSubMenu ? 'Edit Sub-menu Item' : 'Edit Navigation Item') : (isSubMenu ? 'Add Sub-menu Item' : 'Add Navigation Item')} size="md">
      <div className="space-y-6">
        {isSubMenu && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <i className="ri-information-line mr-2"></i>
              This will be added as a sub-menu item under its parent.
            </p>
          </div>
        )}
        <FormField label="Label" required>
          <input 
            type="text" 
            value={formData.label} 
            onChange={(e) => setFormData({ ...formData, label: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            placeholder="e.g., Home, About Us, Products"
          />
        </FormField>
        <FormField label="URL">
          <input 
            type="text" 
            value={formData.url || ''} 
            onChange={(e) => setFormData({ ...formData, url: e.target.value || null })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            placeholder="/about or /products (optional for parent with sub-menus)"
          />
          {!isSubMenu && (
            <p className="text-xs text-gray-500 mt-1">
              <i className="ri-information-line mr-1"></i>
              Parent items can have both a URL and sub-menus. Leave empty if this is only a dropdown parent.
            </p>
          )}
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Status">
            <select value={formData.isActive ? 'active' : 'inactive'} onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </FormField>
          <FormField label="Open in New Tab">
            <select value={formData.openInNewTab ? 'yes' : 'no'} onChange={(e) => setFormData({ ...formData, openInNewTab: e.target.value === 'yes' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </FormField>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.label} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

function SectionModal({ section, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState(section);
  return (
    <Modal isOpen={true} onClose={onClose} title={section.id > 0 ? 'Edit Footer Section' : 'Add Footer Section'} size="md">
      <div className="space-y-6">
        <FormField label="Section Title" required><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></FormField>
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.title} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}

function LinkModal({ link, onSave, onClose, saving }: any) {
  const [formData, setFormData] = useState({ ...link, iconSvg: link.iconSvg || '', iconImageId: link.iconImageId || null });
  const getImageUrl = (image: any): string => {
    if (!image) return '';
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3002';
    return `${baseUrl}${image.filePath}`;
  };
  
  return (
    <Modal isOpen={true} onClose={onClose} title={link.id > 0 ? 'Edit Footer Link' : 'Add Footer Link'} size="lg">
      <div className="space-y-6">
        <FormField label="Link Label (Title)" required>
          <input 
            type="text" 
            value={formData.label} 
            onChange={(e) => setFormData({ ...formData, label: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            placeholder="e.g., Phone, Email, Location"
          />
        </FormField>
        <FormField label="Data (URL or Content)" required>
          <input 
            type="text" 
            value={formData.url} 
            onChange={(e) => setFormData({ ...formData, url: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            placeholder="tel:+1234567890, mailto:email@example.com, or /about"
          />
          <p className="text-xs text-gray-500 mt-1">
            <i className="ri-information-line mr-1"></i>
            For Contact Info: Use tel: for phone, mailto: for email, or plain text for address
          </p>
        </FormField>
        
        <div className="border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Icon (Choose one method)</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon Image Upload (JPG, PNG, SVG)</label>
              <ImageSelector
                value={formData.iconImageId}
                onChange={(id) => setFormData({ ...formData, iconImageId: id, iconSvg: null })}
                label=""
              />
              {formData.iconImage && (
                <div className="mt-2">
                  <img 
                    src={getImageUrl(formData.iconImage)} 
                    alt="Icon preview" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              )}
            </div>
            
            <div className="text-center text-sm text-gray-500">OR</div>
            
            <FormField label="SVG Icon Code (Alternative)">
              <textarea 
                value={formData.iconSvg || ''} 
                onChange={(e) => setFormData({ ...formData, iconSvg: e.target.value || null, iconImageId: null })} 
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder='Paste SVG code here, e.g., <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M..."/></svg>'
              />
              {formData.iconSvg && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Preview:</p>
                  <div className="w-8 h-8 text-[#FF6B35]" dangerouslySetInnerHTML={{ __html: formData.iconSvg }} />
                </div>
              )}
            </FormField>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button onClick={() => onSave(formData)} disabled={saving || !formData.label || !formData.url} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Modal>
  );
}
