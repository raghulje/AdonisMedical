import { useState } from 'react';

interface ActivityLog {
  id: string;
  user: string;
  userEmail: string;
  action: 'create' | 'update' | 'delete' | 'restore' | 'login' | 'logout';
  page: string;
  section: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: Date;
  ipAddress: string;
}

export default function ActivityLogsPage() {
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterPage, setFilterPage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data - In production, fetch from your database
  const [logs] = useState<ActivityLog[]>([
    {
      id: '1',
      user: 'Admin User',
      userEmail: 'raghul.je@refex.co.in',
      action: 'update',
      page: 'Home',
      section: 'Hero Section',
      field: 'Title',
      oldValue: 'Welcome to Adonis Medical',
      newValue: 'Affordable Diagnostic Imaging Solutions',
      timestamp: new Date('2025-01-15T10:30:00'),
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      user: 'Admin User',
      userEmail: 'raghul.je@refex.co.in',
      action: 'login',
      page: 'Admin',
      section: 'Authentication',
      timestamp: new Date('2025-01-15T09:00:00'),
      ipAddress: '192.168.1.100'
    },
    {
      id: '3',
      user: 'Editor User',
      userEmail: 'editor@adonismedical.com',
      action: 'create',
      page: 'Products',
      section: 'Product List',
      field: 'New Product',
      newValue: 'HF Mobile X-Ray System',
      timestamp: new Date('2025-01-14T15:45:00'),
      ipAddress: '192.168.1.101'
    },
    {
      id: '4',
      user: 'Admin User',
      userEmail: 'raghul.je@refex.co.in',
      action: 'delete',
      page: 'Awards',
      section: 'Awards List',
      field: 'Award Item',
      oldValue: 'Best Innovation Award 2023',
      timestamp: new Date('2025-01-14T14:20:00'),
      ipAddress: '192.168.1.100'
    },
    {
      id: '5',
      user: 'Admin User',
      userEmail: 'raghul.je@refex.co.in',
      action: 'restore',
      page: 'Awards',
      section: 'Awards List',
      field: 'Award Item',
      newValue: 'Best Innovation Award 2023',
      timestamp: new Date('2025-01-14T14:25:00'),
      ipAddress: '192.168.1.100'
    },
    {
      id: '6',
      user: 'Editor User',
      userEmail: 'editor@adonismedical.com',
      action: 'update',
      page: 'About',
      section: 'Company Overview',
      field: 'Description',
      oldValue: 'We are a leading manufacturer...',
      newValue: 'Adonis Medical Systems, a professionally managed...',
      timestamp: new Date('2025-01-13T11:30:00'),
      ipAddress: '192.168.1.101'
    }
  ]);

  const actionColors = {
    create: 'bg-green-100 text-green-800',
    update: 'bg-blue-100 text-blue-800',
    delete: 'bg-red-100 text-red-800',
    restore: 'bg-purple-100 text-purple-800',
    login: 'bg-gray-100 text-gray-800',
    logout: 'bg-gray-100 text-gray-800'
  };

  const actionIcons = {
    create: 'ri-add-circle-line',
    update: 'ri-edit-line',
    delete: 'ri-delete-bin-line',
    restore: 'ri-restart-line',
    login: 'ri-login-box-line',
    logout: 'ri-logout-box-line'
  };

  const filteredLogs = logs.filter(log => {
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesPage = filterPage === 'all' || log.page === filterPage;
    const matchesSearch = searchQuery === '' || 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.section.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesAction && matchesPage && matchesSearch;
  });

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'User', 'Email', 'Action', 'Page', 'Section', 'Field', 'Old Value', 'New Value', 'IP Address'],
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.user,
        log.userEmail,
        log.action,
        log.page,
        log.section,
        log.field || '',
        log.oldValue || '',
        log.newValue || '',
        log.ipAddress
      ])
    ].map(row => row.join(',')).join('\\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Activity Logs</h2>
            <p className="text-sm text-gray-600 mt-1">Track all user actions and changes</p>
          </div>
          <button
            onClick={exportLogs}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-download-line"></i>
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user, email, page..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Action Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="restore">Restore</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
            </select>
          </div>

          {/* Page Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page</label>
            <select
              value={filterPage}
              onChange={(e) => setFilterPage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">All Pages</option>
              <option value="Home">Home</option>
              <option value="About">About</option>
              <option value="Products">Products</option>
              <option value="Awards">Awards</option>
              <option value="Careers">Careers</option>
              <option value="Contact">Contact</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.user}</div>
                    <div className="text-xs text-gray-500">{log.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionColors[log.action]}`}>
                      <i className={`${actionIcons[log.action]} mr-1`}></i>
                      {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.page}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.section}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {log.field && (
                      <div className="space-y-1">
                        <div className="font-medium">{log.field}</div>
                        {log.oldValue && (
                          <div className="text-xs text-red-600">
                            <span className="font-medium">From:</span> {log.oldValue.substring(0, 50)}{log.oldValue.length > 50 ? '...' : ''}
                          </div>
                        )}
                        {log.newValue && (
                          <div className="text-xs text-green-600">
                            <span className="font-medium">To:</span> {log.newValue.substring(0, 50)}{log.newValue.length > 50 ? '...' : ''}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-list-3-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No activity logs found</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Actions</p>
              <p className="text-2xl font-medium text-gray-900 mt-1">{logs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-bar-chart-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Updates</p>
              <p className="text-2xl font-medium text-gray-900 mt-1">
                {logs.filter(l => l.action === 'update').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-edit-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deletions</p>
              <p className="text-2xl font-medium text-gray-900 mt-1">
                {logs.filter(l => l.action === 'delete').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-delete-bin-line text-2xl text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Logins</p>
              <p className="text-2xl font-medium text-gray-900 mt-1">
                {logs.filter(l => l.action === 'login').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-login-box-line text-2xl text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
