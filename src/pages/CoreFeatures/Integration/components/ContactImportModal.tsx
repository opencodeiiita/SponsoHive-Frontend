import React from 'react';
import { Modal, Dropdown } from './';

export const ContactImportModal = ({ 
  isOpen, 
  onClose, 
  contacts, 
  selectedContacts, 
  setSelectedContacts, 
  filters, 
  setFilters,
  onImport
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Contacts">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
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
                      setSelectedContacts(e.target.checked ? contacts.map(c => c.id) : []);
                    }}
                    checked={selectedContacts.length === contacts.length}
                  />
                </th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contacts.map((contact) => (
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
                            : prev.filter(id => id !==contact.id)
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

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          {selectedContacts.length} contacts selected
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onImport(selectedContacts)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={selectedContacts.length === 0}
          >
            Import Selected
          </button>
        </div>
      </div>
    </div>
  </Modal>
  );
};

