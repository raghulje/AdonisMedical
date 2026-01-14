import { useState } from 'react';

interface DeletedItem {
  id: string;
  type: 'page-section' | 'product' | 'award' | 'job' | 'client' | 'document';
  page: string;
  section: string;
  title: string;
  deletedBy: string;
  deletedAt: Date;
  data: any;
}

export default function RecycleBinPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');

  // Mock data - In production, fetch from your database
  const [deletedItems, setDeletedItems] = useState<DeletedItem[]>([
    {
      id: '1',
      type: 'award',
      page: 'Awards',
      section: 'Awards List',
      title: 'Best Innovation Award 2023',
      deletedBy: 'raghul.je@refex.co.in',
      deletedAt: new Date('2025-01-14T14:20:00'),
      data: {
        year: '2023',
        category: 'Innovation',
        organization: 'Healthcare Excellence Awards',
        description: 'Recognized for breakthrough innovations in medical imaging technology'
      }
    },
    {
      id: '2',
      type: 'product',
      page: 'Products',
      section: 'Product List',
      title: 'Legacy X-Ray System',
      deletedBy: 'editor@adonismedical.com',
      deletedAt: new Date('2025-01-13T10:15:00'),
      data: {
        category: 'X-Ray Systems',
        description: 'Discontinued product line'
      }
    },
    {
      id: '3',
      type: 'job',
      page: 'Careers',
      section: 'Job Openings',
      title: 'Senior Software Engineer',
      deletedBy: 'raghul.je@refex.co.in',
      deletedAt: new Date('2025-01-12T16:30:00'),
      data: {
        department: 'Engineering',
        location: 'Mohali, India',
        type: 'Full-time'
      }
    },
    {
      id: '4',
      type: 'page-section',
      page: 'Home',
      section: 'Testimonials',
      title: 'Customer Testimonial - Dr. Smith',
      deletedBy: 'editor@adonismedical.com',
      deletedAt: new Date('2025-01-11T09:45:00'),
      data: {
        author: 'Dr. John Smith',
        content: 'Excellent equipment and service...'
      }
    }
  ]);

  const typeIcons = {
    'page-section': 'ri-file-text-line',
    'product': 'ri-product-hunt-line',
    'award': 'ri-award-line',
    'job': 'ri-briefcase-line',
    'client': 'ri-user-heart-line',
    'document': 'ri-file-line'
  };

  const typeColors = {
    'page-section': 'bg-blue-100 text-blue-800',
    'product': 'bg-green-100 text-green-800',
    'award': 'bg-yellow-100 text-yellow-800',
    'job': 'bg-purple-100 text-purple-800',
    'client': 'bg-pink-100 text-pink-800',
    'document': 'bg-gray-100 text-gray-800'
  };

  const filteredItems = filterType === 'all' 
    ? deletedItems 
    : deletedItems.filter(item => item.type === filterType);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleRestore = (id: string) => {
    const item = deletedItems.find(i => i.id === id);
    if (item) {
      alert(`Restored: ${item.title}`);
      setDeletedItems(prev => prev.filter(i => i.id !== id));
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleRestoreSelected = () => {
    if (selectedItems.length === 0) return;
    
    if (confirm(`Restore ${selectedItems.length} selected item(s)?`)) {
      setDeletedItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      alert(`${selectedItems.length} item(s) restored successfully!`);
    }
  };

  const handlePermanentDelete = (id: string) => {
    const item = deletedItems.find(i => i.id === id);
    if (item && confirm(`Permanently delete "${item.title}"? This action cannot be undone.`)) {
      setDeletedItems(prev => prev.filter(i => i.id !== id));
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
      alert('Item permanently deleted');
    }
  };

  const handleEmptyBin = () => {
    if (deletedItems.length === 0) return;
    
    if (confirm(`Permanently delete all ${deletedItems.length} item(s)? This action cannot be undone.`)) {
      setDeletedItems([]);
      setSelectedItems([]);
      alert('Recycle bin emptied successfully');
    }
  };

  const getDaysAgo = (date: Date) => {
    const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recycle Bin</h2>
            <p className="text-sm text-gray-600 mt-1">
              {deletedItems.length} deleted item(s) • Items are kept for 30 days
            </p>
          </div>
          <div className="flex space-x-3">
            {selectedItems.length > 0 && (
              <button
                onClick={handleRestoreSelected}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-restart-line"></i>
                <span>Restore Selected ({selectedItems.length})</span>
              </button>
            )}
            <button
              onClick={handleEmptyBin}
              disabled={deletedItems.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ri-delete-bin-line"></i>
              <span>Empty Bin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Items ({deletedItems.length})
          </button>
          <button
            onClick={() => setFilterType('page-section')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterType === 'page-section'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Page Sections ({deletedItems.filter(i => i.type === 'page-section').length})
          </button>
          <button
            onClick={() => setFilterType('product')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterType === 'product'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Products ({deletedItems.filter(i => i.type === 'product').length})
          </button>
          <button
            onClick={() => setFilterType('award')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterType === 'award'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Awards ({deletedItems.filter(i => i.type === 'award').length})
          </button>
          <button
            onClick={() => setFilterType('job')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterType === 'job'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Jobs ({deletedItems.filter(i => i.type === 'job').length})
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredItems.length > 0 ? (
          <>
            {/* Select All */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredItems.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[item.type]}`}>
                      <i className={`${typeIcons[item.type]} text-xl`}></i>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[item.type]}`}>
                              {item.type.replace('-', ' ')}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{item.page} / {item.section}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Deleted by {item.deletedBy} • {getDaysAgo(item.deletedAt)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-restart-line"></i>
                            <span>Restore</span>
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(item.id)}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-delete-bin-line"></i>
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <i className="ri-delete-bin-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">Recycle bin is empty</p>
            <p className="text-sm text-gray-400 mt-1">Deleted items will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
