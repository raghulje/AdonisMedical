import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../../../contexts/AuthContext';
import { getDefaultImageUrl } from '../../../utils/imageUrl';
import HomePageManagement from './components/HomePageManagement';
import HeaderFooterManagement from './components/HeaderFooterManagement';
import AboutPageManagement from './components/AboutPageManagement';
import UserManagement from './components/UserManagement';
import ProductsPageManagement from './components/ProductsPageManagement';
import AwardsPageManagement from './components/AwardsPageManagement';
import CareersPageManagement from './components/CareersPageManagement';
import ContactPageManagement from './components/ContactPageManagement';
import SMTPConfiguration from './components/SMTPConfiguration';
import SpecialtiesPageManagement from './components/SpecialtiesPageManagement';
import InvestorRelationsPageManagement from './components/InvestorRelationsPageManagement';
import ClientsPageManagement from './components/ClientsPageManagement';
import ManagementPageManagement from './components/ManagementPageManagement';
import OurPresencePageManagement from './components/OurPresencePageManagement';
import ProductionFacilityPageManagement from './components/ProductionFacilityPageManagement';
import QualityAssurancePageManagement from './components/QualityAssurancePageManagement';
import RequestDemoPageManagement from './components/RequestDemoPageManagement';
import OurProductsPageManagement from './components/OurProductsPageManagement';
import FaqsManagement from './components/FaqsManagement';
import ContactInfoManagement from './components/ContactInfoManagement';
import GlobalSettingsManagement from './components/GlobalSettingsManagement';
import SocialLinksManagement from './components/SocialLinksManagement';
import TestimonialsManagement from './components/TestimonialsManagement';
import ReusableContactManagement from './components/ReusableContactManagement';
import ActivityLogsPage from './components/ActivityLogsPage';
import RecycleBinPage from './components/RecycleBinPage';
import VersionHistoryPage from './components/VersionHistoryPage';

type MainTab = 'home' | 'header-footer' | 'about' | 'products' | 'our-products' | 'awards' | 'careers' | 'specialties' | 'investors' | 'clients' | 'management' | 'presence' | 'production' | 'quality' | 'demo' | 'contact' | 'contact-info' | 'reusable-contact' | 'faqs' | 'global-settings' | 'social-links' | 'testimonials' | 'users' | 'smtp' | 'logs' | 'bin' | 'versions';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const handleLogout = () => {
    logout();
  };

  const mainTabs = [
    { id: 'home' as MainTab, label: 'Home', icon: 'ri-home-line' },
    { id: 'header-footer' as MainTab, label: 'Header & Footer', icon: 'ri-layout-line' },
    { id: 'about' as MainTab, label: 'About', icon: 'ri-information-line' },
    { id: 'products' as MainTab, label: 'Products', icon: 'ri-product-hunt-line' },
    { id: 'our-products' as MainTab, label: 'Our Products', icon: 'ri-shopping-bag-line' },
    { id: 'awards' as MainTab, label: 'Awards', icon: 'ri-award-line' },
    { id: 'careers' as MainTab, label: 'Careers', icon: 'ri-briefcase-line' },
    { id: 'specialties' as MainTab, label: 'Specialties', icon: 'ri-stethoscope-line' },
    { id: 'investors' as MainTab, label: 'Investors', icon: 'ri-line-chart-line' },
    { id: 'clients' as MainTab, label: 'Clients', icon: 'ri-user-heart-line' },
    { id: 'management' as MainTab, label: 'Management', icon: 'ri-team-line' },
    { id: 'presence' as MainTab, label: 'Our Presence', icon: 'ri-map-2-line' },
    { id: 'production' as MainTab, label: 'Production', icon: 'ri-factory-line' },
    { id: 'quality' as MainTab, label: 'Quality Assurance', icon: 'ri-shield-check-line' },
    { id: 'demo' as MainTab, label: 'Request Demo', icon: 'ri-calendar-check-line' },
    { id: 'contact' as MainTab, label: 'Contact', icon: 'ri-mail-line' },
    { id: 'contact-info' as MainTab, label: 'Contact Info', icon: 'ri-contacts-line' },
    { id: 'reusable-contact' as MainTab, label: 'Reusable Contact', icon: 'ri-mail-send-line' },
    { id: 'faqs' as MainTab, label: 'FAQs', icon: 'ri-question-line' },
    { id: 'global-settings' as MainTab, label: 'Global Settings', icon: 'ri-settings-3-line' },
    { id: 'social-links' as MainTab, label: 'Social Links', icon: 'ri-share-line' },
    { id: 'testimonials' as MainTab, label: 'Testimonials', icon: 'ri-chat-quote-line' },
    { id: 'users' as MainTab, label: 'Users', icon: 'ri-user-settings-line' },
    { id: 'smtp' as MainTab, label: 'SMTP', icon: 'ri-mail-settings-line' },
    { id: 'logs' as MainTab, label: 'Activity Logs', icon: 'ri-file-list-3-line' },
    { id: 'bin' as MainTab, label: 'Recycle Bin', icon: 'ri-delete-bin-line' },
    { id: 'versions' as MainTab, label: 'Version History', icon: 'ri-history-line' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Top Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <img 
                src={getDefaultImageUrl('2024/09/logo_adonis_4x-1.svg')} 
                alt="Adonis Medical" 
                className="h-10"
              />
              <div>
                <h1 className="text-xl font-bold text-[#2563EB]">Admin Dashboard</h1>
                <p className="text-xs text-[#6B7280]">Content Management System</p>
              </div>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[#1F2937]">Welcome, <span className="text-[#2563EB]">{user?.email || user?.fullName || 'Admin'}</span></p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-logout-box-line"></i>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="px-6">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-medium text-sm whitespace-nowrap transition-all duration-300 border-b-2 cursor-pointer ${
                  activeMainTab === tab.id
                    ? 'text-[#2563EB] border-[#2563EB] bg-gradient-to-b from-[#EFF6FF] to-transparent'
                    : 'text-[#6B7280] border-transparent hover:text-[#2563EB] hover:bg-[#F9FAFB]'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeMainTab === 'home' && <HomePageManagement />}
        {activeMainTab === 'header-footer' && <HeaderFooterManagement />}
        {activeMainTab === 'about' && <AboutPageManagement />}
        {activeMainTab === 'products' && <ProductsPageManagement />}
        {activeMainTab === 'our-products' && <OurProductsPageManagement />}
        {activeMainTab === 'awards' && <AwardsPageManagement />}
        {activeMainTab === 'careers' && <CareersPageManagement />}
        {activeMainTab === 'specialties' && <SpecialtiesPageManagement />}
        {activeMainTab === 'investors' && <InvestorRelationsPageManagement />}
        {activeMainTab === 'clients' && <ClientsPageManagement />}
        {activeMainTab === 'management' && <ManagementPageManagement />}
        {activeMainTab === 'presence' && <OurPresencePageManagement />}
        {activeMainTab === 'production' && <ProductionFacilityPageManagement />}
        {activeMainTab === 'quality' && <QualityAssurancePageManagement />}
        {activeMainTab === 'demo' && <RequestDemoPageManagement />}
        {activeMainTab === 'contact' && <ContactPageManagement />}
        {activeMainTab === 'contact-info' && <ContactInfoManagement />}
        {activeMainTab === 'reusable-contact' && <ReusableContactManagement />}
        {activeMainTab === 'faqs' && <FaqsManagement />}
        {activeMainTab === 'global-settings' && <GlobalSettingsManagement />}
        {activeMainTab === 'social-links' && <SocialLinksManagement />}
        {activeMainTab === 'testimonials' && <TestimonialsManagement />}
        {activeMainTab === 'users' && <UserManagement />}
        {activeMainTab === 'smtp' && <SMTPConfiguration />}
        {activeMainTab === 'logs' && <ActivityLogsPage />}
        {activeMainTab === 'bin' && <RecycleBinPage />}
        {activeMainTab === 'versions' && <VersionHistoryPage />}
      </div>
    </div>
  );
}
