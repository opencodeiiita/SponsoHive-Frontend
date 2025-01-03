import React from 'react';
import { X } from 'lucide-react';

export const NotificationPanel = ({ isOpen, onClose, notifications, onClearAll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        <>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={onClearAll}
            className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
};

