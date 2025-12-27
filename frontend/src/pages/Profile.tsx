import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, LogOut, FileText, CheckCircle, Clock } from 'lucide-react';
import IssueCard from '../components/IssueCard'; // Reusing your existing component
import type { Issue } from '../components/RecentIssues'; // Reusing your interface
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-issues' | 'saved'>('my-issues');

  // --- Mock User Data ---
  const user = {
    name: "Ashwani Pathak",
    email: "ashwani.pathak@iitism.ac.in",
    role: "Student",
    department: "Computer Science & Engineering",
    phone: "+91 98765 43210",
    joinDate: "August 2023",
    avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
  };

  // --- Mock "My Issues" Data ---
  const myIssues: Issue[] = [
    {
      id: 1,
      title: "Electricity pole down",
      description: "Streetlight not working for 3 days near the main crossing.",
      status: "OPEN",
      category: "Electricity & Power",
      zone: "Amber Hostel",
      reporter: "Ashwani Pathak",
      imageUrl: "https://images.unsplash.com/photo-1574359407328-3e4b370607c3?w=400&h=300&fit=crop",
      timeElapsed: "3 days ago",
      timestamp: 0,
      upvotes: 15,
      downvotes: 2,
      commentsCount: 4,
    },
    {
      id: 2,
      title: "Broken window in Common Room",
      description: "The window pane in the 3rd floor common room is shattered.",
      status: "RESOLVED",
      category: "Infrastructure",
      zone: "Jasper Hostel",
      reporter: "Ashwani Pathak",
      imageUrl: null,
      timeElapsed: "2 weeks ago",
      timestamp: 0,
      upvotes: 5,
      downvotes: 0,
      commentsCount: 1,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: User Info Card --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              
              {/* Cover Banner (Optional aesthetic) */}
              <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-600"></div>
              
              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4 flex justify-center">
                   <div className="p-1.5 bg-white rounded-full">
                     <img 
                       src={user.avatarUrl} 
                       alt={user.name} 
                       className="w-32 h-32 rounded-full object-cover border border-gray-100 shadow-md"
                     />
                   </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mb-6">
                  <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-sm text-indigo-600 font-medium">{user.role} • {user.department}</p>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={16} className="mr-3 text-gray-400" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone size={16} className="mr-3 text-gray-400" />
                    {user.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-3 text-gray-400" />
                    IIT (ISM) Dhanbad
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 space-y-3">
                  <Link to='/editProfile' className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </Link>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Content & Activity --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard 
                label="Total Reported" 
                value={12} 
                icon={<FileText size={20} className="text-indigo-600" />} 
                bg="bg-indigo-50"
              />
              <StatCard 
                label="Pending" 
                value={3} 
                icon={<Clock size={20} className="text-yellow-600" />} 
                bg="bg-yellow-50"
              />
              <StatCard 
                label="Resolved" 
                value={9} 
                icon={<CheckCircle size={20} className="text-green-600" />} 
                bg="bg-green-50"
              />
            </div>

            {/* 2. Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab('my-issues')}
                  className={`flex-1 py-4 text-sm font-semibold text-center transition-colors border-b-2 ${activeTab === 'my-issues' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  My Reports
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`flex-1 py-4 text-sm font-semibold text-center transition-colors border-b-2 ${activeTab === 'saved' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Saved / Followed
                </button>
              </div>

              {/* 3. List Content */}
              <div className="p-6 bg-gray-50 min-h-100">
                {activeTab === 'my-issues' ? (
                  <div className="flex flex-col gap-4">
                    {myIssues.map((issue) => (
                      <IssueCard 
                        key={issue.id} 
                        data={issue} 
                        onViewDetails={() => console.log('View details', issue.id)} 
                      />
                    ))}
                  </div>
                ) : (
                  // Empty state for the second tab
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <User size={32} />
                    </div>
                    <p>You haven't saved any issues yet.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component for Stats ---
const StatCard = ({ label, value, icon, bg }: { label: string, value: number, icon: React.ReactNode, bg: string }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
    <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Profile;