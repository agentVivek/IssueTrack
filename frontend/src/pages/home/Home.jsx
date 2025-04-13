// App.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function App() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });

  useEffect( () => {
      const getData = async () => {
        try{
          const res = await fetch("/api/issues/");
          const data = await res.json();
          if(data.error){
            throw new Error(data.error);
          }
          let currentTotal = data.length, currentOpen = 0, currentResolved = 0;
          data.map((issue) => {
            if(issue.status === 'open') currentOpen++;
            if(issue.status === 'resolved') currentResolved++;
          })
          console.log(data);
          setStats({
            total: currentTotal,
            open: currentOpen,
            resolved: currentResolved,
          });
        } catch(error){
          toast.error(error.message);
        }
      }
      getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            Issue Tracker Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Monitor and manage your issues with style.
          </p>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Total Issues
            </h2>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Open Issues
            </h2>
            <p className="text-4xl font-bold text-green-500">{stats.open}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Resolved Issues
            </h2>
            <p className="text-4xl font-bold text-purple-500">
              {stats.resolved}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-10">
          <Link
            to='/register'
            className="inline-block bg-blue-600 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-lg cursor-pointer"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="inline-block bg-blue-600 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-lg cursor-pointer"
          >
            Login
          </Link> 
        </div> 
        
      </div>
    </div>
  );
}

export default App;
