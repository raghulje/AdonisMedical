import { useState } from 'react';
import HfMobilePageManagement from './products/HfMobilePageManagement';
import HfFixedPageManagement from './products/HfFixedPageManagement';
import FpdCArmPageManagement from './products/FpdCArmPageManagement';
import HfCArm1kPageManagement from './products/HfCArm1kPageManagement';
import LineFrequencyPageManagement from './products/LineFrequencyPageManagement';
import DigitalRadiographyPageManagement from './products/DigitalRadiographyPageManagement';
import DreamSeriesPageManagement from './products/DreamSeriesPageManagement';

type ProductSection = 'hf-mobile' | 'hf-fixed' | 'fpd-c-arm' | 'hf-c-arm-1k' | 'line-frequency' | 'digital-radiography' | 'dream-series';

export default function ProductsPageManagement() {
  const [activeSection, setActiveSection] = useState<ProductSection>('hf-mobile');

  const sections = [
    { id: 'hf-mobile' as ProductSection, label: 'HF Mobile', icon: 'ri-truck-line' },
    { id: 'hf-fixed' as ProductSection, label: 'HF Fixed', icon: 'ri-hospital-line' },
    { id: 'fpd-c-arm' as ProductSection, label: 'FPD C-Arm', icon: 'ri-scan-line' },
    { id: 'hf-c-arm-1k' as ProductSection, label: '1K*1K High End HF C-ARM', icon: 'ri-vip-crown-line' },
    { id: 'line-frequency' as ProductSection, label: 'Line Frequency', icon: 'ri-pulse-line' },
    { id: 'digital-radiography' as ProductSection, label: 'Digital Radiography', icon: 'ri-image-line' },
    { id: 'dream-series' as ProductSection, label: 'Dream Series', icon: 'ri-star-line' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-300 border-b-2 cursor-pointer ${
                  activeSection === section.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <i className={section.icon}></i>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {activeSection === 'hf-mobile' && <HfMobilePageManagement />}
        {activeSection === 'hf-fixed' && <HfFixedPageManagement />}
        {activeSection === 'fpd-c-arm' && <FpdCArmPageManagement />}
        {activeSection === 'hf-c-arm-1k' && <HfCArm1kPageManagement />}
        {activeSection === 'line-frequency' && <LineFrequencyPageManagement />}
        {activeSection === 'digital-radiography' && <DigitalRadiographyPageManagement />}
        {activeSection === 'dream-series' && <DreamSeriesPageManagement />}
      </div>
    </div>
  );
}
