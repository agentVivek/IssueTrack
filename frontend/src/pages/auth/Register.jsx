import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import toast from 'react-hot-toast';
import { authContext } from '../../context/authContext';

const Register = () => {

  const { setAuthUser } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: '',
    admission_number: '',
    password: '',
    confirmPassword: '',
    gender: '' 
  });
 
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckBoxChange = (gender) => {
      setFormData({...formData, gender});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, admission_number, password, confirmPassword, gender } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, admission_number, password, confirmPassword, gender }),
      });
      const data = await res.json();
      if(data.error){
        setError(data.error || 'Registration failed');
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Welcome!");
      console.log(data);
      setAuthUser(data);
    } catch (err) {
      setError('Server error');
      console.error(err); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create an Account</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        <input
          type="text"
          name="admission_number"
          placeholder="Admission Number"
          value={formData.admission_number}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full mb-6 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <GenderCheckbox onCheckBoxChange={handleCheckBoxChange} selectedGender={formData.gender}/>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>

        <Link 
            className="mt-4 text-center text-sm text-gray-600" 
            to="/login"
        >
          Already have an account?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Register;
