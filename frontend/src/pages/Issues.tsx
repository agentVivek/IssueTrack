import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import IssueCard from '../components/IssueCard'; // Adjust path if needed
import type { Issue } from '../components/RecentIssues.tsx'; // Re-using your Issue interface
  // --- 2. Mock Data (Expanded for testing) ---
const allIssues: Issue[] = [
    {
      id: 1,
      title: "Electricity pole down",
      description: "Streetlight not working for 3 days near the main crossing.",
      status: "OPEN",
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
      status: "OPEN",
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
      status: "RESOLVED",
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
      status: "IN PROGRESS",
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
const Issues: React.FC = () => {
  // --- 1. State for Filters ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
//   const [selectedPriority, setSelectedPriority] = useState('All Priority');
  const [sortBy, setSortBy] = useState('Latest');



  // --- 3. Filter Logic ---
  const filteredIssues = useMemo(() => {
    return allIssues
      .filter((issue) => {
        // Search Filter (checks title, description, and location)
        const matchesSearch = 
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchQuery.toLowerCase())

        // Dropdown Filters
        const matchesCategory = selectedCategory === 'All Categories' || issue.category === selectedCategory;
        const matchesZone = selectedZone === 'All Zones' || issue.zone === selectedZone;
        const matchesStatus = selectedStatus === 'All Status' || issue.status === selectedStatus.toUpperCase(); // Ensure case matches

        return matchesSearch && matchesCategory && matchesZone && matchesStatus;
      })
      .sort((a, b) => {
        // Sorting Logic
        if (sortBy === 'Latest') return b.timestamp - a.timestamp;
        if (sortBy === 'Oldest') return a.timestamp - b.timestamp;
        if (sortBy === 'Most Voted') return b.upvotes - a.upvotes;
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedZone, selectedStatus, sortBy]);

  // --- Hardcoded Options ---
  const categories = ['All Categories', 'Roads & Transport', 'Electricity & Power', 'Water Supply', 'Infrastructure', 'Sanitation'];
  const zones = ['All Zones', 'Amber Hostel', 'Jasper Hostel', 'Academic Complex', 'Student Activity Centre (SAC)'];
  const statuses = ['All Status', 'Open', 'In Progress', 'Resolved'];
//   const priorities = ['All Priority', 'High', 'Medium', 'Low'];
  const sortOptions = ['Latest', 'Oldest', 'Most Voted'];

  const handleViewDetails = (id: number) => {
    console.log("View details for:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans">
      
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
              placeholder="Search issues by title, description, or location..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 2. Filter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Helper to create dropdowns to save space */}
            <FilterSelect label="Category" value={selectedCategory} onChange={setSelectedCategory} options={categories} />
            <FilterSelect label="Zone" value={selectedZone} onChange={setSelectedZone} options={zones} />
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

      {/* --- Issues List Section --- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-gray-500 font-medium">
                Showing {filteredIssues.length} {filteredIssues.length === 1 ? 'issue' : 'issues'}
            </h2>
            {/* Clear Filters Button (Optional UX improvement) */}
            {(searchQuery || selectedCategory !== 'All Categories') && (
                <button 
                    onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All Categories');
                        setSelectedZone('All Zones');
                        setSelectedStatus('All Status');
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    Clear Filters
                </button>
            )}
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard 
                key={issue.id} 
                data={issue} 
                onViewDetails={() => handleViewDetails(issue.id)} 
              />
            ))
          ) : (
            // --- Empty State ---
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <Filter size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No issues found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Reusable Filter Select Component (Internal) ---
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

export default Issues;