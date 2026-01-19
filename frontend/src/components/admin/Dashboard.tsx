import React from 'react';
import { 
  MoreVertical, 
  Filter, 
  // Icons needed for the specific stats cards if they are rendered here
  // Note: If you pass icons as components in the 'stats' prop, you might not need to import them here, 
  // but we keep them just in case you define data locally.
} from 'lucide-react';

const Dashboard = ({ stats, recentIssues }) => {
  
  // Helper for status badge styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Stats Grid */}
      {/* We check if stats exist before mapping to prevent errors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats && stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bg}`}>
              {/* Render the icon component passed from props */}
              <stat.icon className={stat.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Issues Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Recent Issues</h3>
            <p className="text-sm text-gray-500">Overview of the latest reports filed by students.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Issue Title</th>
                <th className="px-6 py-4 font-semibold">Reported By</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentIssues && recentIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{issue.title}</div>
                    <div className="text-xs text-gray-500">ID: #{issue.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{issue.reportedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{issue.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${issue.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                        issue.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View All Issues</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;