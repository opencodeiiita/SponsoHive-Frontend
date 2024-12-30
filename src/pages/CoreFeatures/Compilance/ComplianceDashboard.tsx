import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Download, Filter, RefreshCw, AlertTriangle } from 'lucide-react';

interface OptOutEntry {
  id: string;
  email: string;
  campaignId: string;
  timestamp: string;
  reason: string;
  status: string;
  processingTime: number;
  location: string;
  gdprStatus: boolean;
  verificationDetails: {
    verified: boolean;
    verifiedAt: string;
    method: string;
  };
  communicationHistory: Array<{
    date: string;
    type: string;
    content: string;
  }>;
}

interface ComplianceMetrics {
  totalOptOuts: number;
  optOutRate: number;
  processingTime: number;
  complianceScore: number;
  gdprCompliance: number;
  canSpamCompliance: number;
  dailyOptOuts: Array<{ date: string; count: number }>;
  riskFactors: Array<{ type: string; level: string; description: string }>;
}

const ComplianceDashboard = () => {
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null);
  const [suppressionList, setSuppressionList] = useState<OptOutEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'suppression', label: 'Suppression List' },
    { id: 'audit', label: 'Audit Trail' },
    { id: 'settings', label: 'Compliance Settings' }
  ];

  // Mock data loading
  useEffect(() => {
    setTimeout(() => {
      setMetrics({
        totalOptOuts: 245,
        optOutRate: 2.8,
        processingTime: 1.2,
        complianceScore: 98,
        gdprCompliance: 100,
        canSpamCompliance: 98,
        dailyOptOuts: [
          { date: '2024-12-25', count: 45 },
          { date: '2024-12-26', count: 52 },
          { date: '2024-12-27', count: 48 },
          { date: '2024-12-28', count: 51 },
          { date: '2024-12-29', count: 49 }
        ],
        riskFactors: [
          { type: 'GDPR', level: 'LOW', description: 'All consent records up to date' },
          { type: 'CAN-SPAM', level: 'LOW', description: 'Physical address present in all campaigns' }
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  const renderSuppressionList = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Suppression List</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-4 h-4" />
            Export List
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Campaign</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Sample suppression list entries */}
            {[1, 2, 3].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">user{index}@example.com</td>
                <td className="px-4 py-3 text-sm">Campaign {index + 1}</td>
                <td className="px-4 py-3 text-sm">2024-12-29</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Verified
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-blue-500 hover:text-blue-700">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAuditTrail = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Audit Trail</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Opt-out Request Processed</h3>
                <p className="text-sm text-gray-500">Campaign: Winter Newsletter {index + 1}</p>
                <p className="text-sm text-gray-500">Email: user{index}@example.com</p>
              </div>
              <span className="text-sm text-gray-500">2024-12-29 14:30:0{index}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-lg font-medium">Loading compliance data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compliance Management</h1>
            <p className="text-gray-500 mt-1">GDPR and CAN-SPAM Compliance Monitor</p>
          </div>
          <div className="flex space-x-4">
            <select 
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Campaigns</option>
              <option value="CAMP001">Campaign 001</option>
              <option value="CAMP002">Campaign 002</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Alert for non-compliant items */}
            {metrics?.canSpamCompliance < 100 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800">Compliance Alert</h3>
                  <p className="text-yellow-700 text-sm mt-1">
                    Some campaigns require attention to maintain CAN-SPAM compliance.
                    Please review the audit trail for details.
                  </p>
                </div>
              </div>
            )}

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">{metrics?.gdprCompliance}%</h2>
                  <p className="text-sm text-gray-500">GDPR Compliance</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">{metrics?.canSpamCompliance}%</h2>
                  <p className="text-sm text-gray-500">CAN-SPAM Compliance</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">{metrics?.processingTime}s</h2>
                  <p className="text-sm text-gray-500">Avg. Processing Time</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">{metrics?.totalOptOuts}</h2>
                  <p className="text-sm text-gray-500">Total Opt-outs</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Opt-out Trends</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metrics?.dailyOptOuts}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#64748b"
                        tick={{ fill: '#64748b' }}
                      />
                      <YAxis
                        stroke="#64748b"
                        tick={{ fill: '#64748b' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Risk Assessment</h2>
                <div className="space-y-4">
                  {metrics?.riskFactors.map((risk, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{risk.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          risk.level === 'LOW' ? 'bg-green-100 text-green-800' :
                          risk.level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {risk.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Suppression List Tab */}
        {activeTab === 'suppression' && renderSuppressionList()}

        {/* Audit Trail Tab */}
        {activeTab === 'audit' && renderAuditTrail()}

        {/* Compliance Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Compliance Settings</h2>
            
            <div className="space-y-6">
              {/* GDPR Settings */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-4">GDPR Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Consent Requirement Level
                      </label>
                      <p className="text-sm text-gray-500">Set the consent collection requirements</p>
                    </div>
                    <select className="px-3 py-2 border rounded-lg">
                      <option>Double Opt-in</option>
                      <option>Single Opt-in</option>
                      <option>Explicit Consent</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Data Retention Period
                      </label>
                      <p className="text-sm text-gray-500">Set how long to keep user data</p>
                    </div>
                    <select className="px-3 py-2 border rounded-lg">
                      <option>12 Months</option>
                      <option>24 Months</option>
                      <option>36 Months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* CAN-SPAM Settings */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-4">CAN-SPAM Compliance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Unsubscribe Link Position
                      </label>
                      <p className="text-sm text-gray-500">Set where the unsubscribe link appears</p>
                    </div>
                    <select className="px-3 py-2 border rounded-lg">
                      <option>Footer</option>
                      <option>Header</option>
                      <option>Both</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Physical Address Display
                      </label>
                      <p className="text-sm text-gray-500">Set how to show your business address</p>
                    </div>
                    <select className="px-3 py-2 border rounded-lg">
                      <option>Footer - Plain Text</option>
                      <option>Footer - Formatted</option>
                      <option>Custom Position</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Automation Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Automation Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Opt-out Processing Speed
                      </label>
                      <p className="text-sm text-gray-500">Set how quickly opt-outs are processed</p>
                    </div>
                    <select className="px-3 py-2 border rounded-lg">
                      <option>Immediate</option>
                      <option>Within 1 Hour</option>
                      <option>Within 24 Hours</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Automated Reports
                      </label>
                      <p className="text-sm text-gray-500">Set frequency of compliance reports</p>
                    </div>
                    <select className="px-3 py-2 border rounded-lg">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceDashboard;