import React, { useState, useEffect } from 'react';

interface SenderInfo {
  name: string;
  organization: string;
  email: string;
}

interface AuthRecord {
  type: 'DKIM' | 'SPF' | 'DMARC';
  status: 'configured' | 'pending' | 'failed';
  lastChecked: string;
  value: string;
}

const SenderAuthDashboard = () => {
  const [authRecords, setAuthRecords] = useState<AuthRecord[]>([
    { type: 'DKIM', status: 'pending', lastChecked: '2024-01-04T12:00:00Z', value: '' },
    { type: 'SPF', status: 'configured', lastChecked: '2024-01-04T12:00:00Z', value: 'v=spf1 include:_spf.example.com ~all' },
    { type: 'DMARC', status: 'failed', lastChecked: '2024-01-04T12:00:00Z', value: 'v=DMARC1; p=none; rua=mailto:dmarc@example.com' },
  ]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [senderIdEnforced, setSenderIdEnforced] = useState(true);
  const [senderInfo, setSenderInfo] = useState<SenderInfo>({
    name: '',
    organization: '',
    email: '',
  });
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'unverified' | 'pending'>('unverified');


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'configured':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'pending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'failed':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'configured':
        return 'Configured';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const renderConfigInstructions = (type: 'DKIM' | 'SPF' | 'DMARC') => {
    const record = authRecords.find(r => r.type === type);
    let instructions = '';
    let sampleRecord = '';

    switch (type) {
      case 'DKIM':
        instructions = `
          Generate a DKIM key pair
          Add the public key to your DNS as a TXT record
          Configure your email server to sign outgoing emails with the private key
        `;
        sampleRecord = 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3QEKyU1fSma0axspqYK5iAj+54lsAg4qRRCnpKK68hawSd8zpsDz77ntGCR0X2mHVvkf0WEOIqaspaG/A5IGxieiWer+wBX8lW2tE4NHTE0PLhHqL0uD2sif2pKoPR3Wr6n/rbiihGYCIzvuY4/U5GigNUGls/QUbCPRyzho30wIDAQAB';
        break;
      case 'SPF':
        instructions = `
          Create a TXT record in your DNS
          Add all authorized IP addresses and domains that send email on your behalf
          Specify the policy for emails that fail SPF checks
        `;
        sampleRecord = 'v=spf1 ip4:192.0.2.0/24 include:_spf.example.com -all';
        break;
      case 'DMARC':
        instructions = `
          Create a TXT record named _dmarc in your DNS
          Specify the policy for emails that fail DKIM and SPF checks
          Set up a reporting email address to receive DMARC reports
        `;
        sampleRecord = 'v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@example.com';
        break;
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">How to set up {type}</h3>
        <ol className="list-decimal list-inside space-y-2">
          {instructions.split('\n').filter(line => line.trim()).map((line, index) => (
            <li key={index}>{line.trim()}</li>
          ))}
        </ol>
        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="text-sm font-semibold mb-2">Sample DNS Record:</h4>
          <code className="text-sm break-all">{sampleRecord}</code>
        </div>
        {record && (
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <h4 className="text-sm font-semibold mb-2">Your Current {type} Record:</h4>
            <code className="text-sm break-all">{record.value || 'Not configured'}</code>
          </div>
        )}
      </div>
    );
  };

  const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Configuration Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const handleSenderInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const verifySenderInfo = () => {
    // Simulate verification process
    setVerificationStatus('pending');
    setTimeout(() => {
      setVerificationStatus(Math.random() > 0.2 ? 'verified' : 'unverified');
    }, 2000);
  };

  const renderActionableSteps = (type: 'DKIM' | 'SPF' | 'DMARC') => {
    const record = authRecords.find(r => r.type === type);
    if (!record) return null;

    switch (record.status) {
      case 'configured':
        return (
          <p className="text-green-600 mt-2">
            Your {type} is correctly configured. No action needed.
          </p>
        );
      case 'pending':
        return (
          <p className="text-yellow-600 mt-2">
            Your {type} configuration is being processed. This can take up to 48 hours. Check back later.
          </p>
        );
      case 'failed':
        return (
          <div className="text-red-600 mt-2">
            <p>Your {type} configuration has failed. Please take the following steps:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>Review your DNS records to ensure the {type} record is correctly formatted.</li>
              <li>Check if the record has been propagated (this can take up to 48 hours).</li>
              <li>Verify that the record matches the one provided in your email service settings.</li>
              <li>If issues persist, contact your DNS provider or email service for assistance.</li>
            </ol>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sender Authentication Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {authRecords.map((auth) => (
          <div key={auth.type} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{auth.type}</h3>
              <span className={`flex items-center ${
                auth.status === 'configured' ? 'text-green-500' :
                auth.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {getStatusIcon(auth.status)}
                <span className="ml-2 text-sm">{getStatusText(auth.status)}</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Last checked: {new Date(auth.lastChecked).toLocaleString()}
            </p>
            <button
              onClick={() => setActiveModal(auth.type)}
              className="mt-4 text-sm text-blue-500 hover:text-blue-700"
            >
              View Configuration Details
            </button>
          </div>
        ))}
      </div>

      {/* Sender Identification Enforcement */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Sender Identification Enforcement</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">
              Enforce sender identification (name, organization, and verified email address) for each campaign.
            </p>
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={senderIdEnforced}
                onChange={() => setSenderIdEnforced(!senderIdEnforced)}
              />
              <div className={`block w-14 h-8 rounded-full ${senderIdEnforced ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${senderIdEnforced ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {senderIdEnforced ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
        {senderIdEnforced && (
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">Sender Name</label>
              <input
                type="text"
                id="senderName"
                name="name"
                value={senderInfo.name}
                onChange={handleSenderInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter sender name"
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={senderInfo.organization}
                onChange={handleSenderInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <label htmlFor="verifiedEmail" className="block text-sm font-medium text-gray-700">Verified Email Address</label>
              <input
                type="email"
                id="verifiedEmail"
                name="email"
                value={senderInfo.email}
                onChange={handleSenderInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter verified email address"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={verifySenderInfo}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Sender Information
              </button>
              <span className={`ml-3 ${
                verificationStatus === 'verified' ? 'text-green-600' :
                verificationStatus === 'unverified' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {verificationStatus === 'verified' ? 'Verified' :
                 verificationStatus === 'unverified' ? 'Unverified' :
                 'Verification Pending...'}
              </span>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={activeModal !== null} onClose={() => setActiveModal(null)}>
        {activeModal && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{activeModal} Configuration</h3>
            <div className="space-y-4">
              {renderConfigInstructions(activeModal as 'DKIM' | 'SPF' | 'DMARC')}
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Current Status</h4>
                {renderActionableSteps(activeModal as 'DKIM' | 'SPF' | 'DMARC')}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Proper sender authentication helps improve email deliverability and protects your domain from email spoofing. Ensure all authentication methods are correctly configured for optimal results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderAuthDashboard;

