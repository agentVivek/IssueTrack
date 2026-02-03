import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  MoreVertical, 
  Eye, 
  Trash2, 
  UserPlus, 
  Mail 
} from 'lucide-react';
import type { IssueType } from '../../hooks/useGetIssues';

interface IssueCardProps {
  data: IssueType;
  onDeleteClick: (id: number) => void; // Callback provided by parent
}

const IssueCard: React.FC<IssueCardProps> = ({ data, onDeleteClick }) => {
  const {
    id,
    title,
    status,
    zone,
    user,
    created_at,
  } = data;

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onViewDetails = () => {
    navigate(`/issues/${id}`);
  };

  const getStatusStyle = (status: string) => {

    const s = status.toUpperCase();
    switch (s) {
      case 'RESOLVED': return 'bg-green-100 text-green-700 border-green-200';
      case 'OPEN': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'IN PROGRESS': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click events if you add them later
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      
      {/* Issue Details */}
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900 line-clamp-1 cursor-pointer hover:text-indigo-600" onClick={onViewDetails}>
            {title}
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
          <span className="font-mono bg-gray-100 px-1.5 rounded">#{id}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{user.name}</span>
        </div>
      </td>

      {/* Location */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {zone || 'N/A'} 
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {new Date(created_at).toLocaleDateString()}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}>
          {status}
        </span>
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4 text-right relative"> 
        <div className="flex items-center justify-end gap-2">
          
          {/* Quick Delete Button (Hover only) */}
          <button 
            onClick={() => onDeleteClick(id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100" 
            title="Quick Delete"
          >
            <Trash2 size={18} />
          </button>

          {/* Three Dots Menu Trigger */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={toggleMenu}
              className={`p-1.5 rounded-md transition-colors ${isMenuOpen ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <MoreVertical size={18} />
            </button>

            {/* --- DROPDOWN MENU --- */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                <div className="py-1">
                  <button onClick={onViewDetails} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Eye size={16} className="text-gray-400" /> View Details
                  </button>
                  {/* <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <UserPlus size={16} className="text-gray-400" /> Assign Agent
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" /> Email Student
                  </button> */}
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      onDeleteClick(id);
                    }}
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
  );
};

export default IssueCard;