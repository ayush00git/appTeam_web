import React, { useState } from 'react';

const NewMemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    githubURL: '',
    linkedInURL: '',
    profileImageURL: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState('Choose Image');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateRequiredFields = () => {
    const requiredFields = [];
    
    if (!formData.name.trim()) requiredFields.push('Full Name');
    if (!formData.role) requiredFields.push('Position');
    if (!formData.githubURL.trim()) requiredFields.push('GitHub Link');
    if (!formData.linkedInURL.trim()) requiredFields.push('LinkedIn Link');
    
    return requiredFields;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setIsUploading(true);
      setFileName('Processing...');

      // Use FileReader to process the image
      const reader = new FileReader();

      reader.onload = function (event) {
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            profileImageURL: file
          }));
          setPreviewImage(event.target.result);
          setFileName(file.name);
          setIsUploading(false);
        }, 800); // Realistic processing time
      };

      reader.onerror = function () {
        setError('Error reading file');
        resetFileInput();
      };

      reader.readAsDataURL(file);
    } else {
      resetFileInput();
    }
  };

  const resetFileInput = () => {
    setFileName('Choose Image');
    setPreviewImage(null);
    setIsUploading(false);
    setFormData(prev => ({
      ...prev,
      profileImageURL: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate required fields
    const missingFields = validateRequiredFields();
    if (missingFields.length > 0) {
      setError(`Required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('githubURL', formData.githubURL);
      formDataToSend.append('linkedInURL', formData.linkedInURL);
      formDataToSend.append('profileImageURL', formData.profileImageURL);

      const response = await fetch(`http://localhost:8000/member/admin_only/newMember/${import.meta.env.VITE_ROUTE_SECRET}`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess('Successfully joined the team!');
        // Reset form
        setFormData({
          name: '',
          role: '',
          bio: '',
          githubURL: '',
          linkedInURL: '',
          profileImageURL: null
        });
        resetFileInput();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit form');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Simulate file input change
      const event = {
        target: {
          files: [file]
        }
      };
      handleFileChange(event);
    }
  };

  const isFieldMissing = (fieldName) => {
    const missingFields = validateRequiredFields();
    return missingFields.includes(fieldName);
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center p-5 select-none" style={{ backgroundColor: '#140b29' }}>
      <div className="form-card rounded-3xl p-10 w-full max-w-md border-2 border-white/15 shadow-2xl relative">
      
        <h1 className="text-center text-white text-2xl font-semibold mb-8 text-shadow">
          Team Member's Details
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
            {success}
          </div>
        )}

        <div>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-medium mb-2 uppercase tracking-wide">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full py-4 px-5 bg-white/8 border-2 rounded-xl text-white text-base outline-none focus:border-blue-400 focus:bg-white/12 placeholder:text-white/50 ${
                isFieldMissing('Full Name') ? 'border-red-500/70' : 'border-white/20'
              }`}
              required
            />
          </div>

          {/* Position */}
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-medium mb-2 uppercase tracking-wide">
              Position <span className="text-red-400">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`w-full py-4 px-5 bg-white/8 border-2 rounded-xl text-white text-base outline-none focus:border-blue-400 focus:bg-white/12 ${
                isFieldMissing('Position') ? 'border-red-500/70' : 'border-white/20'
              }`}
              required
            >
              <option value="" disabled>What's your position</option>
              <option value="Alumni">Alumni</option>
              <option value="Club Secretary">Club Secretary</option>
              <option value="Convener">Convener</option>
              <option value="Club Coordinator">Club Coordinator</option>
              <option value="Executive Member">Executive Member</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-medium mb-2 uppercase tracking-wide">
              Tell a little about yourself
            </label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Enter a tagline"
              className="w-full py-4 px-5 bg-white/8 border-2 border-white/20 rounded-xl text-white text-base outline-none focus:border-blue-400 focus:bg-white/12 placeholder:text-white/50"
            />
          </div>

          {/* GitHub */}
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-medium mb-2 uppercase tracking-wide">
              Github Link 🔗 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="githubURL"
              value={formData.githubURL}
              onChange={handleInputChange}
              placeholder="Enter your github profile link"
              className={`w-full py-4 px-5 bg-white/8 border-2 rounded-xl text-white text-base outline-none focus:border-blue-400 focus:bg-white/12 placeholder:text-white/50 ${
                isFieldMissing('GitHub Link') ? 'border-red-500/70' : 'border-white/20'
              }`}
              required
            />
          </div>

          {/* LinkedIn */}
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-medium mb-2 uppercase tracking-wide">
              LinkedIn Link 🔗 <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              name="linkedInURL"
              value={formData.linkedInURL}
              onChange={handleInputChange}
              placeholder="Enter your linkedin profile link"
              className={`w-full py-4 px-5 bg-white/8 border-2 rounded-xl text-white text-base outline-none focus:border-blue-400 focus:bg-white/12 placeholder:text-white/50 ${
                isFieldMissing('LinkedIn Link') ? 'border-red-500/70' : 'border-white/20'
              }`}
              required
            />
          </div>

          {/* Profile Image */}
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-medium mb-2 uppercase tracking-wide">
              Profile Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleFileChange}
                className="opacity-0 absolute -z-10"
              />
              <label
                htmlFor="profile-image"
                className={`flex items-center justify-between w-full py-4 px-5 bg-white/8 border-2 border-dashed border-white/30 rounded-xl text-white/70 text-base cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-white/12 ${isUploading ? 'border-blue-400 bg-blue-400/10 cursor-not-allowed' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex items-center gap-3">
                  <span>{fileName}</span>
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-blue-400 rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-lg">📁</span>
                  )}
                </div>
              </label>
            </div>

            {/* Image Preview */}
            {previewImage && (
              <div className="mt-3 text-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-32 max-h-32 rounded-xl border-2 border-white/20 object-cover mx-auto"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading}
            className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-600 border-none rounded-xl text-white text-base font-semibold uppercase tracking-wide mt-3 cursor-pointer transition-all duration-300 hover:from-blue-500 hover:to-purple-700 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Join the Team'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .text-shadow {
          text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
        }
        select option {
          background: #140b29;
          color: #b3a7e6;
        }
        input[type="text"],
        input[type="url"],
        select {
          background: #20194a !important;
          border-color: #3a2e6e !important;
          color: #b3a7e6 !important;
        }
        input[type="text"]::placeholder,
        input[type="url"]::placeholder {
          color: #7c6bb3 !important;
          opacity: 1;
        }
        input[type="text"]:focus,
        input[type="url"]:focus,
        select:focus {
          border-color: #7c6bb3 !important;
          background: #251e5a !important;
          color: #e0d6ff !important;
        }
        .file-label,
        label[for="profile-image"] {
          background: #20194a !important;
          border-color: #3a2e6e !important;
          color: #b3a7e6 !important;
        }
        .file-label:hover,
        label[for="profile-image"]:hover {
          border-color: #7c6bb3 !important;
          background: #251e5a !important;
        }
      `}</style>
    </div>
  );
};

export default NewMemberForm;