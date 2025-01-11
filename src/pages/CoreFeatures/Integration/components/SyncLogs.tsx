import React from 'react';
import { Check, X } from 'lucide-react';

const SyncLogs = ({ syncLogs }) => {
  return (
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
  );
};

export default SyncLogs;

