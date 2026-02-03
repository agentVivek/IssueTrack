import { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Save, 
  Moon,
  Mail
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Menu items for the internal settings sidebar
  const menuItems = [
    { id: 'general', label: 'General Profile', icon: User, desc: 'Update your personal details' },
    { id: 'security', label: 'Security', icon: Lock, desc: 'Password and 2FA settings' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Manage email & push alerts' },
    { id: 'system', label: 'System', icon: Globe, desc: 'Platform-wide configurations' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500">Manage your account settings and system preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
            <nav className="flex flex-col p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'} />
                  <div>
                    <span className="block text-sm font-medium">{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Profile Information</h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl border-4 border-white shadow-sm">
                  A
                </div>
                <div>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" defaultValue="Admin" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" defaultValue="User" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" defaultValue="admin@iitism.ac.in" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Title</label>
                  <input type="text" defaultValue="Senior System Administrator" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                   </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                   </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
               <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Notification Preferences</h3>
               
               <div className="space-y-6">
                 {[
                   { title: 'New Issue Alerts', desc: 'Get notified when a student reports a new issue.', icon: Bell },
                   { title: 'Weekly Reports', desc: 'Receive a weekly summary of resolved issues.', icon: Mail },
                   { title: 'System Updates', desc: 'Notifications about platform maintenance.', icon: Shield }
                 ].map((item, index) => (
                   <div key={index} className="flex items-start gap-4">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                          <span className="text-xs text-gray-600 font-medium">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                          <span className="text-xs text-gray-600 font-medium">SMS</span>
                        </label>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">System Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                   <div className="flex items-center gap-3">
                     <Moon size={20} className="text-gray-600" />
                     <div>
                       <h4 className="text-sm font-medium text-gray-900">Dark Mode</h4>
                       <p className="text-xs text-gray-500">Switch between light and dark themes.</p>
                     </div>
                   </div>
                   <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
                     <option>System Default</option>
                     <option>Light</option>
                     <option>Dark</option>
                   </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                   <div className="flex items-center gap-3">
                     <Shield size={20} className="text-red-600" />
                     <div>
                       <h4 className="text-sm font-medium text-red-900">Maintenance Mode</h4>
                       <p className="text-xs text-red-700">Prevent users from accessing the platform temporarily.</p>
                     </div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                   </label>
                </div>
              </div>
            </div>
          )}

          {/* Global Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
              <Save size={18} />
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;