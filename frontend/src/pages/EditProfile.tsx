import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { Camera, Save, User, Mail, Building, Phone} from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the shape of user data
interface UserProfileData {
  fullName: string;
  email: string;
  department: string;
  phone: string;
  bio: string;
  avatarUrl: string | null;
}

const EditProfile: React.FC = () => {
  // --- 1. State Management ---
  const [formData, setFormData] = useState<UserProfileData>({
    fullName: "Ashwani Pathak",
    email: "ashwani.pathak@iitism.ac.in", // Read-only
    department: "Computer Science & Engineering",
    phone: "+91 98765 43210",
    bio: "Final year student passionate about civic tech and open source.",
    avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
  });

  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(formData.avatarUrl);

  // --- 2. Handlers ---

  // Handle Text Inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload Preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Create a fake local URL to show the preview immediately
      const localUrl = URL.createObjectURL(file);
      setPreviewImage(localUrl);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    console.log("Saving profile...", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    // You might want to redirect back to profile here:
    // navigate('/profile'); 
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="mt-2 text-gray-600">Update your personal information and public profile.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3">
            
            {/* --- LEFT COLUMN: Avatar Upload --- */}
            <div className="p-8 bg-gray-50/50 border-r border-gray-100 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                  {previewImage ? (
                    <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-300">
                      <User size={64} />
                    </div>
                  )}
                </div>
                
                {/* Overlay Button */}
                <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={32} />
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900">Profile Photo</h3>
                <p className="text-xs text-gray-500 mt-1">Click image to upload new photo.<br/>JPG or PNG, max 2MB.</p>
              </div>

              {previewImage && previewImage !== formData.avatarUrl && (
                 <button 
                   type="button"
                   onClick={() => setPreviewImage(formData.avatarUrl)}
                   className="mt-4 text-xs text-red-600 font-medium hover:underline"
                 >
                   Reset to original
                 </button>
              )}
            </div>

            {/* --- RIGHT COLUMN: Form Fields --- */}
            <div className="p-8 md:col-span-2 space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                  <span className="ml-2 text-xs font-normal text-gray-400">(Contact admin to change)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Department & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Building size={18} className="text-gray-400" />
                    </div>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                    >
                      <option>Computer Science & Engineering</option>
                      <option>Electronics Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Petroleum Engineering</option>
                      <option>Mining Engineering</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">About / Bio</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Tell us a bit about yourself..."
                />
                <p className="mt-1 text-xs text-gray-500 text-right">Brief description for your public profile.</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <Link 
                  to="/profile"
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;