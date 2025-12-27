import { MapPin, Clock, Tag, ThumbsUp, ThumbsDown, MessageSquare, User, Image as ImageIcon } from 'lucide-react';
import type { Issue } from './RecentIssues';

// Helper function to get status badge styles
const getStatusStyles = (status: string): string => {
  const statusMap: Record<string, string> = {
    'open': 'bg-red-50 text-red-700 border-red-100',
    'in progress': 'bg-yellow-50 text-yellow-700 border-yellow-100',
    'resolved': 'bg-green-50 text-green-700 border-green-100',
  };
  const normalizedStatus: string = status?.toLowerCase() || '';
  return statusMap[normalizedStatus] || 'bg-gray-50 text-gray-700 border-gray-100';
};

interface IssueCardProps{
    data: Issue;
    onViewDetails: ()=>void;
}

const IssueCard: React.FC<IssueCardProps> = (props) => {
    const { data, onViewDetails } = props;
    const {
        title,
        description,
        imageUrl,
        status = 'OPEN',
        category,
        zone,
        reporter,
        timeElapsed,
        upvotes = 0,
        downvotes = 0,
        commentsCount = 0,
    } = data;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-all duration-200">
      
      {/* --- Left Side: Image Thumbnail --- */}
      <div className="w-full sm:w-48 h-40 sm:h-auto shrink-0 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-50">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/400x300/e2e8f0/94a3b8?text=${category || 'Issue'}`; // Fallback image
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <ImageIcon size={32} className="mb-2" />
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}
        {/* Category Label overlay on image (Optional style choice) */}
        {category && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-indigo-600 flex items-center shadow-sm">
            <Tag size={12} className="mr-1" />
            {category}
          </div>
        )}
      </div>

      {/* --- Right Side: Content --- */}
      <div className="grow flex flex-col justify-between py-1">
        <div>
          {/* Header: Title & Status */}
          <div className="flex justify-between items-start mb-2 gap-4">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 leading-tight">
              {title}
            </h3>
            <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(status)} uppercase tracking-wider`}>
              {status}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-medium">
            {description}
          </p>

          {/* Meta Details (zone & Reporter) */}
          <div className="flex flex-col gap-2 mb-4">
            {zone && (
              <div className="flex items-start text-sm text-gray-500">
                <MapPin size={16} className="mr-2 mt-0.5 shrink-0 text-gray-400" />
                <span className="line-clamp-1">{zone}</span>
              </div>
            )}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {reporter && (
                <div className="flex items-center">
                  <User size={14} className="mr-1.5 text-gray-400" />
                  <span>By <span className="font-semibold text-gray-700">{reporter}</span></span>
                </div>
              )}
              {timeElapsed && (
                <div className="flex items-center">
                  <Clock size={14} className="mr-1.5 text-gray-400" />
                  <span>{timeElapsed}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Footer: Actions & View Details --- */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
          {/* Social Proof (Votes & Comments) */}
          <div className="flex items-center gap-5 text-sm text-gray-500 font-medium">
            <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <ThumbsUp size={18} />
              <span>{upvotes}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <ThumbsDown size={18} />
              <span>{downvotes}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <MessageSquare size={18} />
              <span>{commentsCount}</span>
            </button>
          </div>

          {/* View Details Button (Style from Image 1) */}
          <button
            onClick={onViewDetails}
            className="px-5 py-2 bg-indigo-50 text-indigo-600 text-sm font-bold rounded-lg hover:bg-indigo-100 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;