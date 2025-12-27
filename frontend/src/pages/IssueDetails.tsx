import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Calendar, 
  User
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom'; // Assuming you use React Router

const IssueDetails: React.FC = () => {
  const { id } = useParams(); // Get issue ID from URL
  const [commentText, setCommentText] = useState('');
  
  // --- Mock Data for a Single Issue ---
  // In a real app, you would fetch this based on the 'id'
  const issue = {
    id: {id},
    title: "Electricity pole down",
    description: "The electricity pole near the main crossing has been leaning dangerously for the past 3 days. Wires are hanging low and posing a threat to pedestrians and vehicles. Please fix this immediately before an accident happens.",
    status: "OPEN",
    category: "Electricity & Power",
    zone: "SAC",
    reporter: "Ashwani Pathak",
    date: "August 31, 2025 at 11:53 PM",
    timeElapsed: "3 days ago",
    upvotes: 15,
    downvotes: 2,
    images: [
      "https://images.unsplash.com/photo-1574359407328-3e4b370607c3?w=800&h=600&fit=crop"
    ],
    comments: [], // Empty for now
  };

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'OPEN': return 'bg-red-50 text-red-700 border-red-100';
        case 'IN PROGRESS': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
        case 'RESOLVED': return 'bg-green-50 text-green-700 border-green-100';
        default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Back Button --- */}
        <Link to="/issues" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Issues
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN (Main Content) --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(issue.status)} uppercase tracking-wider`}>
                    {issue.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {issue.category}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-indigo-600 transition-colors p-1">
                  <Share2 size={20} />
                </button>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {issue.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center">
                  <User size={16} className="mr-1.5 text-gray-400" />
                  <span>by <span className="font-semibold text-gray-700">{issue.reporter}</span></span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1.5 text-gray-400" />
                  <span>{issue.date}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {issue.description}
              </p>
            </div>

            {/* 2. Media Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                Media <span className="ml-2 text-gray-400 text-sm font-normal">({issue.images.length})</span>
              </h2>
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {/* Displaying first image efficiently */}
                <img 
                  src={issue.images[0]} 
                  alt="Issue Evidence" 
                  className="w-full h-auto max-h-125 object-contain mx-auto"
                />
              </div>
            </div>

            {/* 3. Comments Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-bold text-gray-900 flex items-center">
                   Comments <span className="ml-2 text-gray-400 text-sm font-normal">(0)</span>
                 </h2>
               </div>
               
               {/* Empty State for Comments */}
               <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
                  <MessageSquare size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500 text-sm">No comments yet. Be the first to start the discussion.</p>
               </div>

               {/* Add Comment Input */}
               <div className="space-y-3">
                 <textarea
                   rows={3}
                   placeholder="Share your thoughts about this issue..."
                   className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-sm"
                   value={commentText}
                   onChange={(e) => setCommentText(e.target.value)}
                 />
                 <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{commentText.length}/1000 characters</span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Add Comment
                    </button>
                 </div>
               </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN (Sidebar) --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 1. Actions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="flex gap-4 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all">
                  <ThumbsUp size={18} />
                  <span className="font-semibold">{issue.upvotes}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all">
                  <ThumbsDown size={18} />
                  <span className="font-semibold">{issue.downvotes}</span>
                </button>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors border border-gray-200">
                <Share2 size={18} />
                Share Issue
              </button>
            </div>

            {/* 2. Issue Details Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Issue Details</h3>
              <div className="space-y-4">
                <DetailRow label="Status" value={<span className="text-red-600 font-medium">{issue.status}</span>} />
                <DetailRow label="Category" value={issue.category} />
                <DetailRow label="Created" value={issue.timeElapsed} />
                <DetailRow label="Comments" value="0" />
                <DetailRow label="Media" value={`${issue.images.length} files`} />
                <DetailRow label="Zone" value={`${issue.zone}`} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Details Row
const DetailRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
    <span className="text-gray-500 text-sm">{label}:</span>
    <span className="text-gray-900 font-medium text-sm text-right">{value}</span>
  </div>
);

export default IssueDetails;