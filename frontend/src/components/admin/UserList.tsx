import { Search,
  MoreVertical, 
  Eye, 
  Trash2, 
  Mail,
  UserPlus,
  CheckCircle,
 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

// Mock Data converted to State so UI updates on delete
const users = [
    { id: 1, name: 'Amit Kumar', role: 'Student', email: 'amit.22je0123@iitism.ac.in', dept: 'CSE', status: 'Active' },
    { id: 2, name: 'Dr. S. Roy', role: 'Faculty', email: 'sroy@iitism.ac.in', dept: 'Mining', status: 'Active' },
    { id: 3, name: 'Priya Das', role: 'Student', email: 'priya.21je0567@iitism.ac.in', dept: 'Petroleum', status: 'Inactive' },
    { id: 4, name: 'Rahul Singh', role: 'Admin', email: 'admin.rahul@iitism.ac.in', dept: 'Estate Office', status: 'Active' },
    { id: 5, name: 'Neha Gupta', role: 'Student', email: 'neha.23je0999@iitism.ac.in', dept: 'EE', status: 'Active' },
];
const UsersList = () => { 
  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = useMemo(()=>{ 
    return users.filter((user)=>{
      const matchesSearch = 
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesSearch;
    })
  }, [searchQuery]);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: number | null }>({ show: false, id: null });
  
  // Ref for click outside
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

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const confirmDeleteClick = (id: number) => {
    setDeleteModal({ show: true, id });
    setOpenMenuId(null); // Close menu if open
  };

  const handleDeleteConfirm = () => {
    // if (deleteModal.id) {
    //   setUsers(users.filter(u => u.id !== deleteModal.id));
    //   setDeleteModal({ show: false, id: null });
    // }
  };


  return (
    <div className="p-6 relative">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500 text-sm">Manage students, faculty, and admin access.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          + Add New User
        </button>
      </div>

      {/* Added overflow-visible to parent to help dropdowns, though main scrolling happens in overflow-x-auto */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by emailId or admission no..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table - Added min-h to allow dropdowns to expand downwards without scrollbars immediately covering them */}
        <div className="overflow-x-auto min-h-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role & Dept</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                           <Mail size={10} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                        ${user.role === 'Student' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                          user.role === 'Faculty' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                          'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {user.role}
                      </span>
                      <span className="text-xs text-gray-500">{user.dept}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                        ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {user.status}
                     </span>
                  </td>
                  
                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right relative"> 
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* Quick Delete Button (Hover only) */}
                      <button 
                        onClick={() => confirmDeleteClick(user.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100" 
                        title="Quick Delete"
                      >
                        <Trash2 size={18} />
                      </button>

                      {/* Three Dots Menu Trigger */}
                      <div className="relative" ref={openMenuId === user.id ? menuRef : null}>
                        <button 
                          onClick={() => toggleMenu(user.id)}
                          className={`p-1.5 rounded-md transition-colors ${openMenuId === user.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {/* --- DROPDOWN MENU --- */}
                        {openMenuId === user.id && (
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
                                onClick={() => confirmDeleteClick(user.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 size={16} /> Delete User
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 3. DELETE CONFIRMATION MODAL (MOVED OUTSIDE TABLE) --- */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete this user? This action cannot be undone.
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

export default UsersList;