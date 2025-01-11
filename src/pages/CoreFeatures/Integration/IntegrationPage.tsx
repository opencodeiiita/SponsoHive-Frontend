import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle, Check, X, RefreshCw, Link, Download, Settings, Info, HelpCircle, Clock, ChevronDown, LogOut, UserPlus, Users, FileText, BarChart2 } from 'lucide-react';
import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver';

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
  const [showEnrichModal, setShowEnrichModal] = useState(false);
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
  const [enrichedContacts, setEnrichedContacts] = useState([]);
  const [crmActivity, setCrmActivity] = useState({
    contactsImported: 0,
    contactsExported: 0,
    detailsChanged: 0
  });
  const [activityChartData, setActivityChartData] = useState([]);
  const [syncSettings, setSyncSettings] = useState({
    frequency: 'daily',
    direction: 'bidirectional',
    fields: ['email', 'name', 'company']
  });
  const [errorLogs, setErrorLogs] = useState([]);
  const [summaryReport, setSummaryReport] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [runtimeError, setRuntimeError] = useState(null);

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

      setCrmActivity({
        contactsImported: 1500,
        contactsExported: 750,
        detailsChanged: 250
      });

      setActivityChartData([
        { date: '2024-12-25', activity: 50 },
        { date: '2024-12-26', activity: 80 },
        { date: '2024-12-27', activity: 120 },
        { date: '2024-12-28', activity: 90 },
        { date: '2024-12-29', activity: 110 },
        { date: '2024-12-30', activity: 150 },
      ]);

      setErrorLogs([
        {
          id: '1',
          timestamp: '2024-12-30T08:15:00Z',
          provider: 'hubspot',
          message: 'Authentication failed',
          solution: 'Check your API key and reconnect your HubSpot account.',
        },
        {
          id: '2',
          timestamp: '2024-12-29T14:30:00Z',
          provider: 'salesforce',
          message: 'API rate limit exceeded',
          solution: 'Reduce the frequency of API calls or upgrade your plan for higher limits.',
        },
        {
          id: '3',
          timestamp: '2024-12-28T11:45:00Z',
          provider: 'hubspot',
          message: 'Invalid request: Missing required fields',
          solution: 'Ensure all required fields are included in your API request.',
        },
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error("Caught an error:", error, errorInfo);
      setRuntimeError(error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
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
      
      // Simulate a random error (1 in 3 chance)
      if (Math.random() < 0.33) {
        const errorMessages = [
          'Authentication failed',
          'API rate limit exceeded',
          'Invalid request',
          'Network error'
        ];
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        handleError(new Error(randomError), 'hubspot');
      } else {
        setSyncLogs(prev => [{
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          provider: 'hubspot',
          recordsCount: 25,
          status: 'success',
          message: 'Manual sync completed',
          type: 'sync'
        }, ...prev]);
        addNotification('Sync completed', 'Successfully synced 25 contacts from HubSpot.');
      }
    }, 2000);
  };

  const handleEnrichContacts = async (selectedContacts) => {
    setLoading(true);
    // Simulate API call to enrich contacts
    const enrichedData = await Promise.all(selectedContacts.map(async (contactId) => {
      const contact = contacts.find(c => c.id === contactId);
      // Simulate fetching data from social media APIs
      const enrichedInfo = {
        linkedinProfile: `https://linkedin.com/in/${contact.name.toLowerCase().replace(' ', '-')}`,
        twitterHandle: `@${contact.name.toLowerCase().replace(' ', '')}`,
        profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=${contact.name}`,
        jobTitle: 'Software Engineer', // Example job title
        company: contact.company
      };
      return { ...contact, ...enrichedInfo };
    }));
    setEnrichedContacts(enrichedData);
    setLoading(false);
    setShowEnrichModal(true);
  };

  const verifyContact = (contactId) => {
    setContacts(prevContacts => prevContacts.map(contact => 
      contact.id === contactId ? { ...contact, verified: true } : contact
    ));
    addNotification('Contact Verified', `Contact ${contactId} has been verified.`);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = filters.search === '' || 
      contact.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      contact.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      contact.company.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesTags = filters.tags === 'all' || contact.tags.includes(filters.tags);
    
    return matchesSearch && matchesTags;
  });

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
              <th className="px-4 py-3 text-left">Actions</th>
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
                <td className="px-4 py-3">
                  <button
                    onClick={() => verifyContact(contact.id)}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                    disabled={contact.verified}
                  >
                    {contact.verified ? 'Verified' : 'Verify'}
                  </button>
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
            onClick={() => handleEnrichContacts(selectedContacts)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            disabled={selectedContacts.length === 0}
          >
            Enrich Selected
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

  const EnrichModalContent = () => (
    <div className="space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">LinkedIn</th>
              <th className="px-4 py-3 text-left">Twitter</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {enrichedContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={contact.profilePicture} alt={contact.name} className="w-8 h-8 rounded-full" />
                  {contact.name}
                </td>
                <td className="px-4 py-3">{contact.email}</td>
                <td className="px-4 py-3">{contact.company}</td>
                <td className="px-4 py-3">
                  <a href={contact.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Profile
                  </a>
                </td>
                <td className="px-4 py-3">{contact.twitterHandle}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => verifyContact(contact.id)}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowEnrichModal(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
        <button
          onClick={() => {
            setShowEnrichModal(false);
            // Handle saving enriched data
            setContacts(prevContacts => {
              const updatedContacts = prevContacts.map(contact => {
                const enrichedContact = enrichedContacts.find(ec => ec.id === contact.id);
                return enrichedContact ? { ...contact, ...enrichedContact } : contact;
              });
              return updatedContacts;
            });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Enriched Data
        </button>
      </div>
    </div>
  );

  const addNotification = (title, message) => {
    //Implementation for adding notification
    console.log({title, message});
  }

  const handleError = (error, provider) => {
    const newError = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      provider,
      message: error.message,
      solution: getErrorSolution(error.message),
    };
    setErrorLogs(prev => [newError, ...prev]);
    addNotification('Error Occurred', `An error occurred with ${provider}. Check error logs for details.`);
  };

  const getErrorSolution = (errorMessage) => {
    const solutions = {
      'Authentication failed': 'Try reconnecting your account or check if your API key is still valid.',
      'API rate limit exceeded': 'Wait for a few minutes before trying again or upgrade your plan for higher limits.',
      'Invalid request': 'Check your request parameters and try again.',
      'Network error': 'Check your internet connection and try again.',
    };
    return solutions[errorMessage] || 'Contact support for assistance with this error.';
  };

  const generateSummaryReport = () => {
    const report = [
      ['Date', 'Provider', 'Error', 'Solution'],
      ...errorLogs.map(log => [
        new Date(log.timestamp).toLocaleDateString(),
        log.provider,
        log.message,
        log.solution
      ])
    ];
    setSummaryReport(report);
  };

  const downloadPDFReport = () => {
    // This is a placeholder for PDF generation
    // In a real-world scenario, you'd use a library like jsPDF to generate the PDF
    const pdfContent = syncLogs.map(log => 
      `${new Date(log.timestamp).toLocaleString()} - ${log.provider} - ${log.type} - ${log.recordsCount} records`
    ).join('\n');
    
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'sync_summary_report.txt');
  };

  if (runtimeError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-2">Oops! Something went wrong.</h1>
        <p className="text-red-600 mb-4">We're sorry, but an error occurred while rendering the page.</p>
        <pre className="bg-white p-4 rounded-lg shadow-inner text-red-500 overflow-auto max-w-full">
          {runtimeError.toString()}
        </pre>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  }

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

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 text-lg">Need Help?</h3>
            <p className="text-blue-600 mt-1">
              Check out our integration guide or contact support if you need assistance setting up your CRM connections.
            </p>
          </div>
        </div>

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

        <div className="bg-white rounded-lg shadow-smp-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Integration Details</h2>
          </div>
          <div className="border-b">
            <nav className="-mb-px flex" aria-label="Tabs">
              {['Sync Logs', 'CRM Activity Dashboard', 'Error Logs'].map((tab, index) => (
                <button
                  key={tab}
                  className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                    index === activeTab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-6">
            {activeTab === 0 && (
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
            )}
            {activeTab === 1 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <UserPlus className="w-8 h-8 text-blue-500" />
                      <span className="text-2xl font-bold text-blue-700">{crmActivity.contactsImported}</span>
                    </div>
                    <p className="mt-2 text-sm text-blue-600">Contacts Imported</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Users className="w-8 h-8 text-green-500" />
                      <span className="text-2xl font-bold text-green-700">{crmActivity.contactsExported}</span>
                    </div>
                    <p className="mt-2 text-sm text-green-600">Contacts Exported</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <FileText className="w-8 h-8 text-yellow-500" />
                      <span className="text-2xl font-bold text-yellow-700">{crmActivity.detailsChanged}</span>
                    </div>
                    <p className="mt-2 text-sm text-yellow-600">Details Changed</p>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="activity" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Error Logs</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={generateSummaryReport}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Generate Report
                    </button>
                    {summaryReport.length > 0 && (
                      <>
                        <CSVLink
                          data={summaryReport}
                          filename="error_summary_report.csv"
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Download CSV
                        </CSVLink>
                        <button
                          onClick={downloadPDFReport}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                          Download PDF
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {errorLogs.map((error) => (
                  <div key={error.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-red-800">{error.provider} Error</h4>
                        <p className="text-sm text-red-700 mt-1">{error.message}</p>
                        <p className="text-sm text-red-600 mt-2">
                          <strong>Solution:</strong> {error.solution}
                        </p>
                        <p className="text-xs text-red-500 mt-1">
                          {new Date(error.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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

      <Modal
        isOpen={showEnrichModal}
        onClose={() => setShowEnrichModal(false)}
        title="Enriched Contacts"
      >
        <EnrichModalContent />
      </Modal>
    </div>
  );
};

export default IntegrationPage;

