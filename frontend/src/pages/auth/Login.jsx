import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/authContext';

const Login = () => {

  const { setAuthUser } = useContext(authContext);

  const [form, setForm] = useState({ 
    admission_number: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch ("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }
      console.log(data);
      setAuthUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Logged In Successfully") 
    }catch(error){
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
    <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
    >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {error && (
        <p className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
        </p>
        )}

        <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Admission Number
        </label>
        <input
            type="text"
            name="admission_number"
            value={form.admission_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        </div>

        <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
        </label>
        <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        </div>

        <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
        >
        Login
        </button>
        <Link 
            className="mt-4 text-center text-sm text-gray-600" 
            to="/register"
        >
            Don't have an account?{' '}
            <span className="text-blue-600 cursor-pointer hover:underline">
            Register
            </span>
        </Link>
    </form>
</div>
);
};

export default Login;
