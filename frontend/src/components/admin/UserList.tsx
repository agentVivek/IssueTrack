import { Search, Filter, MoreVertical, Mail, Shield } from 'lucide-react';

const UsersList = () => {
  // Mock Data for Users
  const users = [
    { id: 1, name: 'Amit Kumar', role: 'Student', email: 'amit.22je0123@iitism.ac.in', dept: 'CSE', status: 'Active' },
    { id: 2, name: 'Dr. S. Roy', role: 'Faculty', email: 'sroy@iitism.ac.in', dept: 'Mining', status: 'Active' },
    { id: 3, name: 'Priya Das', role: 'Student', email: 'priya.21je0567@iitism.ac.in', dept: 'Petroleum', status: 'Inactive' },
    { id: 4, name: 'Rahul Singh', role: 'Admin', email: 'admin.rahul@iitism.ac.in', dept: 'Estate Office', status: 'Active' },
    { id: 5, name: 'Neha Gupta', role: 'Student', email: 'neha.23je0999@iitism.ac.in', dept: 'EE', status: 'Active' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500 text-sm">Manage students, faculty, and admin access.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          + Add New User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or admission no..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
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
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-indigo-600 p-1 rounded-md hover:bg-indigo-50 transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;