import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  AlertCircle,
  X,
  Trash2
} from 'lucide-react';
import IssueCard from './IssueCard';

import type { IssueType } from '../../hooks/useGetIssues';

const Dashboard: React.FC = () => {
  const [issues, setIssues] = useState<IssueType[]>([
    {
      id: 1,
      title: "Broken streetlight near main gate",
      status: "OPEN",
      description: "The streetlight near the main gate has not been working for the past 3 days.",
      imageUrl: "https://example.com/images/streetlight.jpg",
      category: "Infrastructure",
      zone: "North Campus",
      user: { userId: "u101", name: "Rahul Sharma", avatarUrl: "" },
      created_at: "2026-02-01T10:15:30Z",
      upvotes: 12, downvotes: 1, commentsCount: 4,
    },
    {
      id: 2,
      title: "Water leakage in hostel bathroom",
      status: "IN PROGRESS",
      description: "Continuous water leakage.",
      imageUrl: null,
      category: "Maintenance",
      zone: "Hostel Zone",
      user: { userId: "u102", name: "Ananya Verma", avatarUrl: "" },
      created_at: "2026-01-30T08:42:10Z",
      upvotes: 25, downvotes: 0, commentsCount: 9,
    },
    {
      id: 3,
      title: "WiFi not working in library",
      status: "RESOLVED",
      description: "Library WiFi was down.",
      imageUrl: null,
      category: "Network",
      zone: "Library",
      user: { userId: "u103", name: "Vivek Kumar", avatarUrl: "" },
      created_at: "2026-01-28T14:05:55Z",
      upvotes: 40, downvotes: 2, commentsCount: 15,
    },
  ]);

  const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: number | null }>({ show: false, id: null });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const stats = [
    { title: 'Total Issues', value: '1,248', icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pending', value: '45', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Resolved', value: '1,180', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Active Users', value: '3,500', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  // --- Handlers ---

  // Triggered by the Child Component (IssueCard)
  const initiateDelete = (id: number) => {
    setDeleteModal({ show: true, id });
  };

  // Confirmed in the Modal
  const handleDeleteConfirm = () => {
    if (deleteModal.id !== null) {
      setIssues((prev) => prev.filter((issue) => issue.id !== deleteModal.id));
      setDeleteModal({ show: false, id: null });
      setShowSuccessToast(true);
      
      // Auto hide toast
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  return (
    <div className="space-y-6 relative p-6 bg-gray-50 min-h-screen">
      
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* 2. Recent Issues Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible"> 
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Recent Issues</h3>
            <p className="text-sm text-gray-500">Overview of the latest reports filed</p>
          </div>
        </div>
        
        <div className="overflow-x-auto min-h-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Issue Details</th>
                <th className="px-6 py-4 font-semibold">Zone</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(!issues || issues.length === 0) ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No recent issues found.
                  </td>
                </tr>
              ) : (
                issues.map((issue) => (
                  <IssueCard 
                    key={issue.id} 
                    data={issue} 
                    onDeleteClick={initiateDelete} // Pass the handler down
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View All Issues</button>
        </div>
      </div>

      {/* --- 3. DELETE CONFIRMATION MODAL --- */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Issue</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete this issue? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeleteModal({ show: false, id: null })}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 shadow-sm shadow-red-200 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. SUCCESS TOAST --- */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-center gap-3 pr-8">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Success</h4>
              <p className="text-xs text-gray-500">Action is done successfully!</p>
            </div>
            <button onClick={() => setShowSuccessToast(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;