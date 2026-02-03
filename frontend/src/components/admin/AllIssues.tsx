import React, { useMemo, useState } from 'react';
import { 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Trash2,
  CheckCircle,
  X
} from 'lucide-react';
import IssueCard from './IssueCard';
import type { IssueType } from '../../hooks/useGetIssues';
const AllIssues: React.FC = () => {
  // 1. Data State 
  
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
        category: "Water Supply",
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

  // 2. Filter & UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [sortBy, setSortBy] = useState('Latest');
  
  // 3. Action State
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: number | null }>({ show: false, id: null });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Handlers
  const handleInitiateDelete = (id: number) => {
    setDeleteModal({ show: true, id });
    setOpenMenuId(null); 
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.id !== null) {
      setIssues(prev => prev.filter(issue => issue.id !== deleteModal.id));
      setDeleteModal({ show: false, id: null });
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  // --- Filter Logic ---
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || issue.category === selectedCategory;
      const matchesZone = selectedZone === 'All Zones' || issue.zone === selectedZone;
      const matchesStatus = selectedStatus === 'All Status' || issue.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesZone && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'Latest')  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'Oldest')  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'Most Voted') return b.upvotes - a.upvotes;
        return 0;
    });
  }, [issues, searchQuery, selectedCategory, selectedZone, selectedStatus, sortBy]);

  const categories = ['All Categories', 'Roads & Transport', 'Electricity & Power', 'Water Supply', 'Infrastructure', 'Sanitation'];
  const zones = ['All Zones', 'Amber Hostel', 'Jasper Hostel', 'Academic Complex', 'Student Activity Centre (SAC)'];
  const statuses = ['All Status', 'Pending', 'In Progress', 'Resolved'];
  const sortOptions = ['Latest', 'Oldest', 'Most Voted'];

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm rounded-t-xl"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search issues by title, description, or zone..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <FilterSelect label="Category" value={selectedCategory} onChange={setSelectedCategory} options={categories} />
            <FilterSelect label="Zone" value={selectedZone} onChange={setSelectedZone} options={zones} />
            <FilterSelect label="Status" value={selectedStatus} onChange={setSelectedStatus} options={statuses} />
            
            <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-3 pr-8 py-2.5 text-sm border-gray-200 bg-gray-50 rounded-md focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-visible mt-0">
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
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No issues found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => (
                  <IssueCard 
                    key={issue.id} 
                    data={issue}
                    onDeleteClick={() => handleInitiateDelete(issue.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredIssues.length}</span> of <span className="font-medium">{issues.length}</span> results</p>
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

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
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

      {/* Success Toast */}
      {/* {showSuccessToast && ( */}
        {/* <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
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
      )} */}
    </div>
  );
};

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, onChange, options }) => (
    <div className="flex flex-col">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 pl-1">
            {label}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full pl-3 pr-8 py-2.5 text-sm border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer bg-white shadow-sm transition-shadow hover:border-gray-300"
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);

export default AllIssues;