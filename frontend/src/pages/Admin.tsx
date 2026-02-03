import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  AlertCircle, 
  Settings, 
  Search, 
  Bell, 
  Menu,
  LogOut,
  CheckCircle,
  Clock
} from 'lucide-react';

// Import your separated components
import Dashboard from '../components/admin/Dashboard';
import UsersList from '../components/admin/UserList';
import AllIssues from '../components/admin/AllIssues';
import SettingsPage from '../components/admin/Settings'; 

const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <h1 className={`text-xl font-bold text-indigo-700 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0 hidden'}`}>
            Issue Track
          </h1>
          {!isSidebarOpen && <span className="text-indigo-700 font-bold text-xl">IT</span>}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'issues', label: 'All Issues', icon: AlertCircle },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings }, // 3. This now correctly refers to the Icon
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

      {/* --- MAIN LAYOUT SHELL --- */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-64"
              />
            </div> */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto bg-gray-50 flex-1">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'users' && <UsersList />}
          {activeTab === 'issues' && <AllIssues />}
          {activeTab === 'settings' && <h1 className='text-center'>Coming Soon...</h1>} 
        </main>
        
      </div>
    </div>
  );
};

export default Admin;