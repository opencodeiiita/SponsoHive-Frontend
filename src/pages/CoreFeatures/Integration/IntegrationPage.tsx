import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Loader2, AlertCircle, Check, X, RefreshCw, 
  Link, Download, Settings, Info,
  HelpCircle, Clock, ChevronDown, LogOut
} from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left border rounded-lg flex justify-between items-center bg-white hover:bg-gray-50"
      >
        {options.find(opt => opt.value === value)?.label || placeholder}
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full px-4 py-2 text-left hover:bg-gray-50"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const IntegrationPage = () => {
  const [connections, setConnections] = useState([]);
  const [syncLogs, setSyncLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    tags: 'all',
    search: ''
  });
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Inc', tags: ['Customer'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Tech Corp', tags: ['Lead'] },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', company: 'Dev Ltd', tags: ['Prospect'] },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', company: 'Design Co', tags: ['Customer'] },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', company: 'Sales Inc', tags: ['Lead'] },
  ]);

  // Load initial data
  useEffect(() => {
    setTimeout(() => {
      setConnections([
        {
          id: '1',
          provider: 'hubspot',
          status: 'connected',
          lastSync: '2024-12-30T10:00:00Z',
          contactsCount: 1234,
          tokenExpiry: '2025-01-30T00:00:00Z'
        },
        {
          id: '2',
          provider: 'salesforce',
          status: 'error',
          lastSync: '2024-12-29T15:30:00Z',
          contactsCount: 5678,
          error: 'OAuth token expired',
          tokenExpiry: '2024-12-30T00:00:00Z'
        }
      ]);

      setSyncLogs([
        {
          id: '1',
          timestamp: '2024-12-30T10:00:00Z',
          provider: 'hubspot',
          recordsCount: 150,
          status: 'success',
          message: 'Contacts imported successfully',
          type: 'import'
        },
        {
          id: '2',
          timestamp: '2024-12-30T09:45:00Z',
          provider: 'salesforce',
          recordsCount: 0,
          status: 'failure',
          message: 'Authentication failed',
          type: 'sync'
        }
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  const handleConnect = async (provider) => {
    setLoading(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setConnections(prev => prev.map(conn => 
        conn.provider === provider 
          ? { ...conn, status: 'connected', error: null }
          : conn
      ));
      setLoading(false);
    }, 1500);
  };

  const handleDisconnect = async (provider) => {
    setLoading(true);
    // Simulate disconnection
    setTimeout(() => {
      setConnections(prev => prev.map(conn => 
        conn.provider === provider 
          ? { ...conn, status: 'disconnected', error: null }
          : conn
      ));
      setLoading(false);
    }, 1000);
  };

  const handleSync = async (connectionId) => {
    setSyncInProgress(true);
    setTimeout(() => {
      setSyncInProgress(false);
      setSyncLogs(prev => [{
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        provider: 'hubspot',
        recordsCount: 25,
        status: 'success',
        message: 'Manual sync completed',
        type: 'sync'
      }, ...prev]);
    }, 2000);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = filters.search === '' || 
      contact.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      contact.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      contact.company.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesTags = filters.tags === 'all' || contact.tags.includes(filters.tags);
    
    return matchesSearch && matchesTags;
  });

  // Import Modal Content
  const ImportModalContent = () => (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Dropdown
          value={filters.dateRange}
          onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
          options={[
            { value: 'all', label: 'All Time' },
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' }
          ]}
          placeholder="Select Date Range"
        />
        
        <Dropdown
          value={filters.tags}
          onChange={(value) => setFilters(prev => ({ ...prev, tags: value }))}
          options={[
            { value: 'all', label: 'All Tags' },
            { value: 'Customer', label: 'Customer' },
            { value: 'Prospect', label: 'Prospect' },
            { value: 'Lead', label: 'Lead' }
          ]}
          placeholder="Select Tags"
        />

        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          placeholder="Search contacts..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input 
                  type="checkbox" 
                  className="rounded"
                  onChange={(e) => {
                    setSelectedContacts(e.target.checked ? filteredContacts.map(c => c.id) : []);
                  }}
                  checked={selectedContacts.length === filteredContacts.length}
                />
              </th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input 
                    type="checkbox"
                    className="rounded"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={(e) => {
                      setSelectedContacts(prev => 
                        e.target.checked 
                          ? [...prev, contact.id]
                          : prev.filter(id => id !== contact.id)
                      );
                    }}
                  />
                </td>
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3">{contact.email}</td>
                <td className="px-4 py-3">{contact.company}</td>
                <td className="px-4 py-3">
                  {contact.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-1">
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {selectedContacts.length} contacts selected
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowImportModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowImportModal(false);
              // Handle import
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={selectedContacts.length === 0}
          >
            Import Selected
          </button>
        </div>
      </div>
    </div>
  );

  // Settings Modal Content remains the same...
  const SettingsModalContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Sync Frequency</h3>
        <div className="space-y-2">
          {['realtime', 'hourly', 'daily', 'weekly'].map((freq) => (
            <label key={freq} className="flex items-center gap-2">
              <input
                type="radio"
                name="frequency"
                value={freq}
                checked={syncSettings.frequency === freq}
                onChange={(e) => setSyncSettings({ ...syncSettings, frequency: e.target.value })}
                className="rounded"
              />
              <span className="capitalize">{freq}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Sync Direction</h3>
        <div className="space-y-2">
          {[
            { value: 'bidirectional', label: 'Two-way Sync' },
            { value: 'import', label: 'Import Only' },
            { value: 'export', label: 'Export Only' }
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="radio"
                name="direction"
                value={value}
                checked={syncSettings.direction === value}
                onChange={(e) => setSyncSettings({ ...syncSettings, direction: e.target.value })}
                className="rounded"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Fields to Sync</h3>
        <div className="space-y-2">
          {[
            { value: 'email', label: 'Email' },
            { value: 'name', label: 'Name' },
            { value: 'company', label: 'Company' },
            { value: 'phone', label: 'Phone' }
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={syncSettings.fields.includes(value)}
                onChange={(e) => {
                  const newFields = e.target.checked
                    ? [...syncSettings.fields, value]
                    : syncSettings.fields.filter(f => f !== value);
                  setSyncSettings({ ...syncSettings, fields: newFields });
                }}
                className="rounded"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowSettingsModal(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setShowSettingsModal(false);
            // Save settings
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-lg font-medium">Loading integration data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header section remains the same... */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CRM Integrations</h1>
            <p className="text-gray-500 mt-1">Manage your CRM connections and synchronization</p>
          </div>
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Integration Settings
          </button>
        </div>

        {/* Help Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 text-lg">Need Help?</h3>
            <p className="text-blue-600 mt-1">
              Check out our integration guide or contact support if you need assistance setting up your CRM connections.
            </p>
          </div>
        </div>

        {/* CRM Connections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map(connection => (
            <div key={connection.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    {connection.provider.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {connection.provider}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        connection.status === 'connected' ? 'bg-green-100 text-green-800' :
                        connection.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                       {connection.status === 'connected' ? 
                          <Check className="w-3 h-3 mr-1" /> :
                          connection.status === 'error' ?
                          <AlertCircle className="w-3 h-3 mr-1" /> :
                          <X className="w-3 h-3 mr-1" />
                        }
                        {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                      </span>
                      {connection.status === 'connected' && (
                        <span className="text-sm text-gray-500">
                          {connection.contactsCount.toLocaleString()} contacts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {connection.status === 'connected' ? (
                    <>
                      <button 
                        onClick={() => handleSync(connection.id)}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={syncInProgress}
                        title="Sync contacts"
                      >
                        <RefreshCw className={`w-5 h-5 ${syncInProgress ? 'animate-spin' : ''}`} />
                      </button>
                      <button 
                        onClick={() => handleDisconnect(connection.provider)}
                        className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        title="Disconnect"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setShowSettingsModal(true)}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Settings"
                      >
                        <Settings className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnect(connection.provider)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      <Link className="w-4 h-4" />
                      Connect
                    </button>
                  )}
                </div>
              </div>

              {connection.status === 'connected' && (
                <div className="mt-6 space-y-4">
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Import Contacts
                  </button>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Last synced: {new Date(connection.lastSync).toLocaleString()}
                  </div>
                </div>
              )}

              {connection.error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Error</h4>
                      <p className="text-sm text-red-700">{connection.error}</p>
                      <button 
                        onClick={() => handleConnect(connection.provider)}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Reconnect
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sync Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Sync Activity</h2>
            <div className="flex items-center gap-4">
              <Dropdown
                value="all"
                onChange={() => {}}
                options={[
                  { value: 'all', label: 'All Providers' },
                  { value: 'hubspot', label: 'HubSpot' },
                  { value: 'salesforce', label: 'Salesforce' }
                ]}
                placeholder="Select Provider"
              />
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <Info className="w-4 h-4" />
                View All Logs
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Timestamp</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Provider</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Records</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {syncLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm capitalize">{log.provider}</td>
                    <td className="px-4 py-3 text-sm capitalize">{log.type}</td>
                    <td className="px-4 py-3 text-sm">{log.recordsCount}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === 'success' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {log.status === 'success' ? 
                          <Check className="w-3 h-3 mr-1" /> : 
                          <X className="w-3 h-3 mr-1" />
                        }
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Contacts"
      >
        <ImportModalContent />
      </Modal>

      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Integration Settings"
      >
        <SettingsModalContent />
      </Modal>
    </div>
  );
};

export default IntegrationPage;