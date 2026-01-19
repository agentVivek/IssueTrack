import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Trash2, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

const AllIssues = () => {
  const [filterStatus, setFilterStatus] = useState('All');

  // Extended Mock Data
  const allIssues = [
    { id: '101', title: 'Broken Projector', location: 'LHC - 105', category: 'Electrical', reportedBy: 'Amit Kumar', date: 'Jan 19, 2026', status: 'Pending', priority: 'High' },
    { id: '102', title: 'Water Leakage', location: 'Jasper Hostel', category: 'Civil', reportedBy: 'Sarah Smith', date: 'Jan 18, 2026', status: 'Resolved', priority: 'Medium' },
    { id: '103', title: 'Wi-Fi Issue', location: 'Central Library', category: 'Network', reportedBy: 'Rahul Singh', date: 'Jan 18, 2026', status: 'In Progress', priority: 'High' },
    { id: '104', title: 'Broken Chair', location: 'Main Canteen', category: 'Furniture', reportedBy: 'Priya D.', date: 'Jan 17, 2026', status: 'Resolved', priority: 'Low' },
    { id: '105', title: 'AC Malfunction', location: 'Comp Lab 3', category: 'Electrical', reportedBy: 'Dr. Roy', date: 'Jan 16, 2026', status: 'Pending', priority: 'Critical' },
    { id: '106', title: 'Window Glass Broken', location: 'Amber Hostel', category: 'Civil', reportedBy: 'Vikram S.', date: 'Jan 15, 2026', status: 'Pending', priority: 'Medium' },
    { id: '107', title: 'Switchboard Fire', location: 'Diamond Hostel', category: 'Electrical', reportedBy: 'Warden', date: 'Jan 14, 2026', status: 'Resolved', priority: 'Critical' },
  ];

  // Simple filter logic
  const filteredIssues = filterStatus === 'All' 
    ? allIssues 
    : allIssues.filter(issue => issue.status === filterStatus);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'Medium': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Issue Management</h2>
          <p className="text-sm text-gray-500">Track, update, and resolve campus maintenance requests.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
            <Download size={16} />
            Export CSV
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium shadow-sm transition-colors">
            + Create Ticket
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-lg self-start">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  filterStatus === tab 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search issues..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-full md:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Issue Details <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{issue.title}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                      <span>#{issue.id}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>{issue.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>by {issue.reportedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      {issue.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{issue.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityStyle(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredIssues.length}</span> of <span className="font-medium">24</span> results</p>
          <div className="flex gap-2">
            <button className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button className="p-1 border border-gray-300 rounded hover:bg-gray-100">
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllIssues;