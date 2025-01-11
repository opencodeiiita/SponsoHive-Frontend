import React from 'react';
import { UserPlus, Users, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CRMActivityDashboard = ({ crmActivity, activityChartData }) => {
  return (
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
  );
};

export default CRMActivityDashboard;

