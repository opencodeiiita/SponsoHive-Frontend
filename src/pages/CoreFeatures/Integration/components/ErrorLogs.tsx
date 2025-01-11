import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorLogs = ({ errorLogs }) => {
  return (
    <div className="space-y-4">
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
  );
};

export default ErrorLogs;

