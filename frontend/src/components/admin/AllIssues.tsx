  import React, { useEffect, useMemo, useRef, useState } from 'react';
  import { 
    Search, 
    Filter, 
    MoreVertical, 
    Eye, 
    Trash2, 
    Download, 
    ChevronLeft, 
    ChevronRight,
  Mail,
  UserPlus,
  CheckCircle
  } from 'lucide-react';
import { formatFullDate } from '../../utils/dateUtils';

  const AllIssues = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedzone, setSelectedzone] = useState('All zones');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [sortBy, setSortBy] = useState('Latest');

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: number | null }>({ show: false, id: null });

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

    // Toggle the three dots menu
    const toggleMenu = (id: number) => {
      setOpenMenuId(openMenuId === id ? null : id);
    };

    // Open Delete Confirmation
    const confirmDeleteClick = (id: number) => {
      setDeleteModal({ show: true, id });
      setOpenMenuId(null); // Close menu if open
    };

    // Actually Delete the Item
    const handleDeleteConfirm = () => {
      // if (deleteModal.id) {
      //   setAllIssues(issues.filter(issue => issue.id !== deleteModal.id));
      //   setDeleteModal({ show: false, id: null });
        
      //   // Show Success Toast
      //   setShowSuccessToast(true);
      //   setTimeout(() => setShowSuccessToast(false), 3000);
      // }
    };
    // Extended Mock Data
    const allIssues = [ 
    {
      id: 1,
      title: "Electricity pole down",
      description: "Streetlight not working for 3 days near the main crossing.",
      status: "Pending",
      category: "Electricity & Power",
      zone: "Amber Hostel",
      reporter: "Ashwani Pathak",
      imageUrl: "https://images.unsplash.com/photo-1574359407328-3e4b370607c3?w=400&h=300&fit=crop",
      timeElapsed: "less than a minute ago",
      timestamp: new Date().getTime(), // For sorting
      upvotes: 0,
      downvotes: 0,
      commentsCount: 0,
    },
    {
      id: 2,
      title: "Potholes on the Road",
      description: "Potholes on the Road near Rupnarayanpur, causing traffic issues.",
      status: "Pending",
      category: "Roads & Transport",
      zone: "Academic Complex",
      reporter: "Super Administrator",
      imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc1e44b?w=400&h=300&fit=crop",
      timeElapsed: "about 5 hours ago",
      timestamp: new Date().getTime() - 18000000,
      upvotes: 12,
      downvotes: 0,
      commentsCount: 1,
    },
    {
      id: 3,
      title: "Water Cooler Leaking",
      description: "The water cooler on the 2nd floor is leaking continuously.",
      status: "Resolved",
      category: "Water Supply",
      zone: "Jasper Hostel",
      reporter: "Rahul Verma",
      imageUrl: null,
      timeElapsed: "1 day ago",
      timestamp: new Date().getTime() - 86400000,
      upvotes: 5,
      downvotes: 1,
      commentsCount: 2,
    },
    {
      id: 4,
      title: "Broken Bench in Park",
      description: "A bench in the Student Activity Centre park is broken.",
      status: "In Progress",
      category: "Infrastructure",
      zone: "Student Activity Centre (SAC)",
      reporter: "Amit Singh",
      imageUrl: null,
      timeElapsed: "2 days ago",
      timestamp: new Date().getTime() - 172800000,
      upvotes: 8,
      downvotes: 0,
      commentsCount: 0,
    }
  ]; 

    // Simple filter logic 
    const filteredIssues = useMemo(()=>{
       return allIssues.filter((issue) => {
        // Search Filter (checks title, description, and zone)
        const matchesSearch = 
          issue.title.toLowerCase().includes(searchQuery.toLowerCase())
          // issue.description.toLowerCase().includes(searchQuery.toLowerCase())

        // Dropdown Filters
        const matchesCategory = selectedCategory === 'All Categories' || issue.category === selectedCategory;
        const matcheszone = selectedzone === 'All zones' || issue.zone === selectedzone;
        const matchesStatus = selectedStatus === 'All Status' || issue.status === selectedStatus; // Ensure case matches

        return matchesSearch && matchesCategory && matcheszone && matchesStatus;
      })
      .sort((a, b) => {
        // Sorting Logic
        // if (sortBy === 'Latest')  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        // if (sortBy === 'Oldest')  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (sortBy === 'Most Voted') return b.upvotes - a.upvotes;
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedzone, selectedStatus, sortBy]);

     // --- Hardcoded Options ---
    const categories = ['All Categories', 'Roads & Transport', 'Electricity & Power', 'Water Supply', 'Infrastructure', 'Sanitation'];
    const zones = ['All zones', 'Amber Hostel', 'Jasper Hostel', 'Academic Complex', 'Student Activity Centre (SAC)'];
    const statuses = ['All Status', 'Open', 'In Progress', 'Resolved'];
    //   const priorities = ['All Priority', 'High', 'Medium', 'Low'];
    const sortOptions = ['Latest', 'Oldest', 'Most Voted'];

    const getStatusStyle = (status: string) => {
      switch (status) {
        case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
        case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    // const getPriorityStyle = (priority: string) => {
    //   switch (priority) {
    //     case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
    //     case 'High': return 'text-orange-600 bg-orange-50 border-orange-100';
    //     case 'Medium': return 'text-blue-600 bg-blue-50 border-blue-100';
    //     default: return 'text-gray-600 bg-gray-50 border-gray-100';
    //   }
    // };


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

        {/* --- Filter Header Section --- */}
            <div className="bg-white border-b border-gray-200 shadow-sm"> 
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                
                {/* 1. Search Bar */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search issues by title, description, or zone..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
      
                {/* 2. Filter Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Helper to create dropdowns to save space */}
                  <FilterSelect label="Category" value={selectedCategory} onChange={setSelectedCategory} options={categories} />
                  <FilterSelect label="zone" value={selectedzone} onChange={setSelectedzone} options={zones} />
                  <FilterSelect label="Status" value={selectedStatus} onChange={setSelectedStatus} options={statuses} />
                  {/* <FilterSelect label="Priority" value={selectedPriority} onChange={setSelectedPriority} options={priorities} /> */}
                  
                  {/* Sort By (Different styling often) */}
                  <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sort By</label>
                      <div className="relative">
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="block w-full pl-3 pr-8 py-2.5 text-sm border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        >
                          {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                  </div>
                </div>
              </div>
            </div>

        {/* Issues Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-100"> {/* min-h ensures space for dropdowns near bottom */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Issue Details</th>
                <th className="px-6 py-4 font-semibold">zone</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(!filteredIssues || filteredIssues.length === 0) ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No recent issues found.
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50 transition-colors group">
                    
                    {/* Issue Details */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{issue.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <span className="font-mono bg-gray-100 px-1.5 rounded">#{issue.id}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{issue.reporter}</span>
                      </div>
                    </td>

                    {/* zone */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {issue.zone || 'N/A'} 
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {/* {formatFullDate(issue.created_at)} */}
                      Coming Soon..
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
                                  // onClick={() => handleStatusUpdate(issue.id, 'Resolved')}
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
      </div>
    );
  };

  export default AllIssues;

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
            className="block w-full pl-3 pr-8 py-2.5 text-sm border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer bg-white shadow-sm transition-shadow hover:border-gray-300"
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);
