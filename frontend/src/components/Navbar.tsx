import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Menu, LogOut, ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

//   Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'REPORT', href: '/report' },
    { name: 'ISSUES', href: '/issues' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- Mobile Menu Button --- */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* --- Logo / Brand (Hidden on Mobile if you want centered nav, adjust as needed) --- */}
          <div className="shrink-0 items-center justify-center">
             <span className="text-xl font-bold text-indigo-700">Issue Track</span>
          </div>

          {/* --- Desktop Navigation Links --- */}
          <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
        {navLinks.map((link) => (
            <NavLink
            key={link.name}
            to={link.href} // Note: Use 'to' instead of 'href'
            className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors uppercase ${
                isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1" // Active Style
                    : "text-gray-600 hover:text-indigo-600" // Inactive Style
                }`
            }
            >
            {link.name}
            </NavLink>
            ))}
            </div>

          {/* --- Right Actions --- */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Admin Panel Button */}
            <NavLink to={'/admin'}>
                <button className="hidden sm:flex items-center px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                Admin Panel
                </button>
            </NavLink>
            {/* Search Icon */}
            <button className="text-gray-500 hover:text-indigo-600 transition-colors p-1">
              <Search size={22} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <User size={22} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-1 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate">student@iitism.ac.in</p>
                  </div>
                  
                  <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                    <User size={16} className="mr-3" />
                    Profile
                  </a>
                  
                  <button 
                    onClick={() => console.log('Logout clicked')}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Sidebar (Drawer) --- */}
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-60 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-70 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Mobile Header */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
           <button 
             onClick={() => setIsMobileMenuOpen(false)}
             className="flex items-center text-gray-500 hover:text-gray-900"
           >
             <ChevronLeft size={20} className="mr-1"/>
             <span className="text-sm font-medium">Back</span>
           </button>
        </div>

        {/* Mobile Links */}
        <div className="py-4 px-2 space-y-1">
        {navLinks.map((link) => (
            <NavLink
            key={link.name}
            to={link.href}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked!
            className={({ isActive }) =>
                `block px-4 py-3 text-base font-medium rounded-lg uppercase transition-colors ${
                isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold" // Active: Light purple bg
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600" // Inactive
                }`
            }
            >
            {link.name}
            </NavLink>
        ))}

        <div className="border-t border-gray-100 my-2 pt-2">
            <NavLink
            to="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
                `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
            }
            >
            ADMIN PANEL
            </NavLink>
        </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;