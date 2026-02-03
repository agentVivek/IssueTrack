import React, { useState, useEffect, useRef } from 'react';
import { 
  MoreVertical, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Users, 
  AlertCircle,
  X,
  AlertTriangle,
  Mail,
  UserPlus
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [issues, setIssues] = useState([
    { id: '101', title: 'Broken Projector', location: 'LHC - 105', category: 'Electrical', reportedBy: 'Amit Kumar', date: 'Jan 19, 2026', status: 'Pending', priority: 'High' },
    { id: '102', title: 'Water Leakage', location: 'Jasper Hostel', category: 'Civil', reportedBy: 'Sarah Smith', date: 'Jan 18, 2026', status: 'Resolved', priority: 'Medium' },
    { id: '103', title: 'Wi-Fi Issue', location: 'Central Library', category: 'Network', reportedBy: 'Rahul Singh', date: 'Jan 18, 2026', status: 'In Progress', priority: 'High' },
    { id: '104', title: 'Broken Chair', location: 'Main Canteen', category: 'Furniture', reportedBy: 'Priya D.', date: 'Jan 17, 2026', status: 'Resolved', priority: 'Low' },
    { id: '105', title: 'AC Malfunction', location: 'Comp Lab 3', category: 'Electrical', reportedBy: 'Dr. Roy', date: 'Jan 16, 2026', status: 'Pending', priority: 'Critical' },
    { id: '106', title: 'Window Glass Broken', location: 'Amber Hostel', category: 'Civil', reportedBy: 'Vikram S.', date: 'Jan 15, 2026', status: 'Pending', priority: 'Medium' },
    { id: '107', title: 'Switchboard Fire', location: 'Diamond Hostel', category: 'Electrical', reportedBy: 'Warden', date: 'Jan 14, 2026', status: 'Resolved', priority: 'Critical' },
  ]);

  // 2. UI States
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: string | null }>({ show: false, id: null });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Ref for clicking outside the dropdown
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // --- HANDLERS ---
  
  // Toggle the three dots menu
  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Open Delete Confirmation
  const confirmDeleteClick = (id: string) => {
    setDeleteModal({ show: true, id });
    setOpenMenuId(null); // Close menu if open
  };

  // Actually Delete the Item
  const handleDeleteConfirm = () => {
    if (deleteModal.id) {
      setIssues(issues.filter(issue => issue.id !== deleteModal.id));
      setDeleteModal({ show: false, id: null });
      
      // Show Success Toast
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  // Update Status (Mock function)
  const handleStatusUpdate = (id: string, newStatus: string) => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    setOpenMenuId(null);
  };


  // --- STYLES HELPER ---
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = [
    { title: 'Total Issues', value: '1,248', icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pending', value: '45', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Resolved', value: '1,180', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Active Users', value: '3,500', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  return (
    <div className="space-y-6 relative">
      
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible"> {/* overflow-visible allows dropdown to pop out */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Recent Issues</h3>
            <p className="text-sm text-gray-500">Overview of the latest reports filed</p>
          </div>
        </div>
        
        <div className="overflow-x-auto min-h-[400px]"> {/* min-h ensures space for dropdowns near bottom */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Issue Details</th>
                <th className="px-6 py-4 font-semibold">Location</th>
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
                  <tr key={issue.id} className="hover:bg-gray-50 transition-colors group">
                    
                    {/* Issue Details */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{issue.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <span className="font-mono bg-gray-100 px-1.5 rounded">#{issue.id}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{issue.reportedBy}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {issue.location || 'N/A'} 
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {issue.date}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 text-right relative"> 
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Quick Delete Button (Hover only) */}
                        <button 
                          onClick={() => confirmDeleteClick(issue.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100" 
                          title="Quick Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                        {/* Three Dots Menu Trigger */}
                        <div className="relative" ref={openMenuId === issue.id ? menuRef : null}>
                          <button 
                            onClick={() => toggleMenu(issue.id)}
                            className={`p-1.5 rounded-md transition-colors ${openMenuId === issue.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                          >
                            <MoreVertical size={18} />
                          </button>

                          {/* --- DROPDOWN MENU --- */}
                          {openMenuId === issue.id && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                              <div className="py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <Eye size={16} className="text-gray-400" /> View Details
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <UserPlus size={16} className="text-gray-400" /> Assign Agent
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <Mail size={16} className="text-gray-400" /> Email Student
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button 
                                  onClick={() => handleStatusUpdate(issue.id, 'Resolved')}
                                  className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                                >
                                  <CheckCircle size={16} /> Mark Resolved
                                </button>
                                <button 
                                  onClick={() => confirmDeleteClick(issue.id)}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 size={16} /> Delete Issue
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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
        <div className="fixed bottom-6 right-6 z-100 animate-in slide-in-from-bottom-5 fade-in duration-300">
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