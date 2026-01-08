import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useSendIssue } from '../hooks/useSendIssue';
import { useNavigate } from 'react-router-dom';

export interface IssueData{
    title: string;
    description: string;
    category: string;
    zone: string;
    image?: File;
}

const Report: React.FC = () => {
  // State for text/select inputs
  const navigate = useNavigate();
  const { sendIssue, sending } = useSendIssue();
  const [issueData, setIssueData] = useState<IssueData>({
    title: '',
    description: '',
    category: '',
    zone: '',
  });
  
  // Separate state for image file
  const [image, setImage] = useState<File | null>(null);
  // Hardcoded options relevant to IIT (ISM)
  const categories = [
    'Roads & Transport',
    'Electricity & Power',
    'Water Supply',
    'Sanitation & Waste',
    'Hostel Infrastructure',
    'Academic Facilities',
    'Internet & Wi-Fi',
    'Other',
  ];

  const zones = [
    'IIT Campus (Main Area)',
    'Amber Hostel',
    'Jasper Hostel',
    'Diamond Hostel',
    'Ruby Hostel',
    'Academic Complex (New)',
    'Heritage Building Area',
    'Staff Quarters',
    'Student Activity Centre (SAC)',
  ];

  // --- Handlers ---

  // Handle text, textarea, and select changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIssueData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation for file type and size (e.g., < 5MB)
      if (file.size > 5 * 1024 * 1024) {
          alert("File size should be less than 5MB");
          return;
      }
      setImage(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    // Reset file input value so onchange triggers again for the same file
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const success = await sendIssue(issueData);
    if(success){
      console.log("Successfully Reported Issue.");
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 my-10 font-sans">
      {/* --- Header --- */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
        <p className="mt-2 text-gray-600 text-lg">
          Found a problem on campus? Let us know so we can fix it.
        </p>
      </div>

      {/* --- Success Message Alert --- */}
      {/* {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-start animate-in fade-in">
          <Check size={24} className="mr-3 shrink-0 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-semibold">Report Submitted Successfully!</h3>
            <p className="text-sm mt-1">Your issue has been logged. You can track its status on the Issues page.</p>
          </div>
        </div>
      )} */}

      {/* --- Form --- */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Issue Details */}
        <div className="space-y-6">
            <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-900 mb-2">
                Issue Title <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={issueData.title}
                onChange={handleInputChange}
                placeholder="e.g., Streetlight not working near Amber Hostel gate"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400"
                required
            />
            </div>

            <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-900 mb-2">
                Description <span className="text-red-500">*</span>
            </label>
            <textarea
                id="description"
                name="description"
                rows={5}
                value={issueData.description}
                onChange={handleInputChange}
                placeholder="Please provide as much detail as possible. Where exactly is the issue? How long has it been happening?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-400 resize-none"
                required
            />
            </div>
        </div>

        {/* Section 2: Classification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-gray-900 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={issueData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white appearance-none ${issueData.category ? 'text-gray-900 border-gray-300' : 'text-gray-400 border-gray-300'}`}
              required
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.75rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-gray-900">{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-bold text-gray-900 mb-2">
              Zone / Area <span className="text-red-500">*</span>
            </label>
            <select
              id="zone"
              name="zone"
              value={issueData.zone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white appearance-none ${issueData.zone ? 'text-gray-900 border-gray-300' : 'text-gray-400 border-gray-300'}`}
              required
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.75rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
            >
              <option value="" disabled>Select a zone</option>
              {zones.map((zone) => (
                <option key={zone} value={zone} className="text-gray-900">{zone}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 3: Image Upload */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Attach an Image (Optional)
          </label>
          <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${image ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:border-indigo-500 hover:bg-gray-100'} border-dashed rounded-lg transition-all relative group`}>
            {image ? (
              // --- Image Preview State ---
              <div className="text-center z-10 w-full">
                 <div className="relative inline-block">
                    <img 
                    src={URL.createObjectURL(image)} 
                    alt="Preview" 
                    className="h-40 mx-auto mb-4 object-cover rounded-lg shadow-sm border border-indigo-200"
                    />
                    <button 
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 p-1 bg-white rounded-full text-gray-500 hover:text-red-600 shadow-sm border border-gray-200 transition-colors focus:outline-none"
                        title="Remove image"
                    >
                        <X size={18} />
                    </button>
                 </div>
                 <p className="text-sm text-indigo-700 font-medium truncate px-4">{image.name}</p>
                 <p className="text-xs text-indigo-500">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              // --- Empty Upload State ---
              <div className="space-y-2 text-center relative">
                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-bold text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>Click to upload</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                 {/* Fallback icon for no image */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
                    <ImageIcon size={40} className="text-gray-200" />
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Priority & Submit */}
       {/* <div className="pt-4 border-t border-gray-100"> */}
        {/*
            <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
                <input
                id="isPriority"
                name="isPriority"
                type="checkbox"
                checked={issueData.isPriority}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="isPriority" className="font-bold text-gray-900 flex items-center cursor-pointer">
                <AlertCircle size={18} className="text-red-500 mr-2" />
                Mark as High Priority
                </label>
                <p className="text-gray-500 mt-1">
                Select this only for urgent issues that pose an immediate safety risk or severe disruption.
                </p>
            </div>
            </div> */}

            {/* --- Submit Button --- */}
            <button
            type="submit"
            disabled={sending}
            className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                sending ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md hover:-translate-y-0.5'
            }`}
            >
            {sending ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Report...
                </>
            ) : (
                'Submit Report'
            )}
            </button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default Report;