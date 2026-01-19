import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Settings, 
  Search, 
  Bell, 
  Menu,
  MoreVertical,
  Filter,
  LogOut
} from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock Data for the Dashboard
  // const stats = [
  //   { title: 'Total Issues', value: '1,248', icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
  //   { title: 'Pending', value: '45', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  //   { title: 'Resolved', value: '1,180', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  //   { title: 'Active Users', value: '3,500', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  // ];

  // const recentIssues = [
  //   { id: 101, title: 'Broken Projector in L-105', reportedBy: 'Amit Kumar', date: 'Jan 19, 2026', status: 'Pending', priority: 'High' },
  //   { id: 102, title: 'Water Leakage in Jasper Hostel', reportedBy: 'Sarah Smith', date: 'Jan 18, 2026', status: 'Resolved', priority: 'Medium' },
  //   { id: 103, title: 'Wi-Fi not connecting in Library', reportedBy: 'Rahul Singh', date: 'Jan 18, 2026', status: 'In Progress', priority: 'High' },
  //   { id: 104, title: 'Broken Chair in Canteen', reportedBy: 'Priya D.', date: 'Jan 17, 2026', status: 'Resolved', priority: 'Low' },
  //   { id: 105, title: 'AC Malfunction in Comp Lab', reportedBy: 'Faculty: Dr. Roy', date: 'Jan 16, 2026', status: 'Pending', priority: 'Critical' },
  // ];

  // Helper for status badge styles
  // const getStatusStyle = (status) => {
  //   switch (status) {
  //     case 'Resolved': return 'bg-green-100 text-green-700';
  //     case 'Pending': return 'bg-amber-100 text-amber-700';
  //     case 'In Progress': return 'bg-blue-100 text-blue-700';
  //     default: return 'bg-gray-100 text-gray-700';
  //   }
  // };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <h1 className={`text-xl font-bold text-indigo-700 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0 hidden'}`}>
            Issue Track
          </h1>
          {/* Collapse Icon for mobile/tablet could go here */}
          {!isSidebarOpen && <span className="text-indigo-700 font-bold text-xl">IT</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'issues', label: 'All Issues', icon: AlertCircle },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-3 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === item.id 
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} />
                  <span className={`ml-3 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0 w-0 overflow-hidden'}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile / Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className={`ml-3 overflow-hidden transition-all ${!isSidebarOpen && 'w-0 opacity-0'}`}>
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@iitism.ac.in</p>
            </div>
            <LogOut size={18} className={`ml-auto text-gray-400 hover:text-red-500 cursor-pointer ${!isSidebarOpen && 'hidden'}`} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search issues..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm w-64"
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto bg-gray-50 flex-1">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          {/* Recent Issues Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Recent Issues</h3>
                <p className="text-sm text-gray-500">Overview of the latest reports filed by students.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Issue Title</th>
                    <th className="px-6 py-4 font-semibold">Reported By</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Priority</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentIssues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{issue.title}</div>
                        <div className="text-xs text-gray-500">ID: #{issue.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{issue.reportedBy}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{issue.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${issue.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                            issue.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(issue.status)}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View All Issues</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;