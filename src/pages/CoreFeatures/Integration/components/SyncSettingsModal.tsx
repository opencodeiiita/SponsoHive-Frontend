import React, { useState } from 'react';
import { Modal } from './';

export const SyncSettingsModal = ({ isOpen, onClose, onSave }) => {
  const [syncSettings, setSyncSettings] = useState({
    frequency: 'daily',
    direction: 'bidirectional',
    fields: ['email', 'name', 'company']
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Integration Settings">
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
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(syncSettings)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Settings
          </button>
        </div>
      </div>
    </Modal>
  );
};