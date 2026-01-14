import { useState } from 'react';

interface Version {
  id: string;
  page: string;
  section: string;
  versionNumber: number;
  createdBy: string;
  createdAt: Date;
  changes: string[];
  data: any;
}

export default function VersionHistoryPage() {
  const [selectedPage, setSelectedPage] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState<string[]>([]);

  // Mock data - In production, fetch from your database
  const [versions] = useState<Version[]>([
    {
      id: '1',
      page: 'Home',
      section: 'Hero Section',
      versionNumber: 5,
      createdBy: 'raghul.je@refex.co.in',
      createdAt: new Date('2025-01-15T10:30:00'),
      changes: ['Updated title text', 'Changed background image', 'Modified button color'],
      data: {
        title: 'Affordable Diagnostic Imaging Solutions',
        subtitle: 'Leading manufacturer of high-quality X-ray systems',
        backgroundImage: 'https://example.com/hero-bg.jpg'
      }
    },
    {
      id: '2',
      page: 'Home',
      section: 'Hero Section',
      versionNumber: 4,
      createdBy: 'editor@adonismedical.com',
      createdAt: new Date('2025-01-14T15:20:00'),
      changes: ['Updated subtitle', 'Changed overlay opacity'],
      data: {
        title: 'Welcome to Adonis Medical',
        subtitle: 'Quality medical imaging solutions',
        backgroundImage: 'https://example.com/hero-bg-old.jpg'
      }
    },
    {
      id: '3',
      page: 'About',
      section: 'Company Overview',
      versionNumber: 3,
      createdBy: 'raghul.je@refex.co.in',
      createdAt: new Date('2025-01-13T11:45:00'),
      changes: ['Added new paragraph', 'Updated bullet points'],
      data: {
        paragraphs: ['Updated company description...'],
        bulletPoints: ['Innovation', 'Quality', 'Service']
      }
    },
    {
      id: '4',
      page: 'Products',
      section: 'Product List',
      versionNumber: 8,
      createdBy: 'editor@adonismedical.com',
      createdAt: new Date('2025-01-12T09:15:00'),
      changes: ['Added new product', 'Updated product images'],
      data: {
        products: ['HF Mobile', 'C-ARM', 'Digital Radiography']
      }
    }
  ]);

  const pages = ['all', ...Array.from(new Set(versions.map(v => v.page)))];
  const sections = selectedPage === 'all' 
    ? ['all'] 
    : ['all', ...Array.from(new Set(versions.filter(v => v.page === selectedPage).map(v => v.section)))];

  const filteredVersions = versions.filter(v => {
    const matchesPage = selectedPage === 'all' || v.page === selectedPage;
    const matchesSection = selectedSection === 'all' || v.section === selectedSection;
    return matchesPage && matchesSection;
  });

  const handleCompareToggle = (versionId: string) => {
    if (compareVersions.includes(versionId)) {
      setCompareVersions(prev => prev.filter(id => id !== versionId));
    } else if (compareVersions.length < 2) {
      setCompareVersions(prev => [...prev, versionId]);
    }
  };

  const handleRestore = (version: Version) => {
    if (confirm(`Restore ${version.page} - ${version.section} to version ${version.versionNumber}?`)) {
      alert(`Restored to version ${version.versionNumber}`);
    }
  };

  const handleCompare = () => {
    if (compareVersions.length === 2) {
      alert('Opening comparison view...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Version History</h2>
            <p className="text-sm text-gray-600 mt-1">View and restore previous versions of your content</p>
          </div>
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={compareMode}
                onChange={(e) => {
                  setCompareMode(e.target.checked);
                  if (!e.target.checked) setCompareVersions([]);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">Compare Mode</span>
            </label>
            {compareMode && compareVersions.length === 2 && (
              <button
                onClick={handleCompare}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-git-compare-line"></i>
                <span>Compare Versions</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page</label>
            <select
              value={selectedPage}
              onChange={(e) => {
                setSelectedPage(e.target.value);
                setSelectedSection('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              {pages.map(page => (
                <option key={page} value={page}>
                  {page === 'all' ? 'All Pages' : page}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              {sections.map(section => (
                <option key={section} value={section}>
                  {section === 'all' ? 'All Sections' : section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Version Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Version Timeline</h3>
        
        {filteredVersions.length > 0 ? (
          <div className="space-y-6">
            {filteredVersions.map((version, index) => (
              <div key={version.id} className="relative">
                {/* Timeline Line */}
                {index !== filteredVersions.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                )}

                <div className="flex items-start space-x-4">
                  {/* Compare Checkbox */}
                  {compareMode && (
                    <input
                      type="checkbox"
                      checked={compareVersions.includes(version.id)}
                      onChange={() => handleCompareToggle(version.id)}
                      disabled={!compareVersions.includes(version.id) && compareVersions.length >= 2}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  )}

                  {/* Version Badge */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    v{version.versionNumber}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {version.page} - {version.section}
                          </h4>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            Version {version.versionNumber}
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-3">
                          {version.createdAt.toLocaleString()} • by {version.createdBy}
                        </p>

                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-700">Changes:</p>
                          <ul className="space-y-1">
                            {version.changes.map((change, idx) => (
                              <li key={idx} className="text-xs text-gray-600 flex items-start">
                                <i className="ri-arrow-right-s-line text-blue-500 mt-0.5"></i>
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => alert('Opening preview...')}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer whitespace-nowrap text-sm"
                        >
                          <i className="ri-eye-line"></i>
                          <span>Preview</span>
                        </button>
                        <button
                          onClick={() => handleRestore(version)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                        >
                          <i className="ri-restart-line"></i>
                          <span>Restore</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="ri-history-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No version history found</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Versions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{versions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-git-branch-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pages Tracked</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {new Set(versions.map(v => v.page)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Latest Update</p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {versions[0]?.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-2xl text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
