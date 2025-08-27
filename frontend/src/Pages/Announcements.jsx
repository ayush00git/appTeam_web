import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/announcements');
      
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      
      const data = await response.json();
      
      // Handle the specific API response structure
      if (data && Array.isArray(data.announcements)) {
        setAnnouncements(data.announcements);
      } else {
        console.warn('Unexpected API response format:', data);
        setAnnouncements([]);
      }
      
      setError('');
    } catch (err) {
      setError('Failed to load announcements. Please try again later.');
      setAnnouncements([]); // Ensure announcements is always an array even on error
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    // For older dates, show formatted date
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isNewAnnouncement = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    return diffInDays <= 3; // Consider announcements within 3 days as "new"
  };

  if (loading) {
    return (
      <div className="font-sans min-h-screen p-5 select-none bg-[#140b29]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-white text-3xl font-semibold mb-10 text-shadow">
            Latest Announcements
          </h1>
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading announcements...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans min-h-screen p-5 select-none bg-[#140b29]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-white text-3xl font-semibold mb-10 text-shadow">
            Latest Announcements
          </h1>
          <div className="text-center">
            <div className="mb-4 p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
              {error}
            </div>
            <button 
              onClick={fetchAnnouncements}
              className="py-3 px-8 bg-gradient-to-r from-purple-400 to-pink-600 border-none rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:from-purple-500 hover:to-pink-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen p-5 select-none bg-[#140b29]">
      <div className="max-w-full mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-center text-white text-3xl font-semibold mb-6 text-shadow">
            Latest Announcements
          </h1>
          <button 
            onClick={() => navigate('/announcements/admin_only')}
            className="py-4 px-8 bg-[#231446] border-2 border-[#a594f9] rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#9d8bfa] flex items-center gap-2"
          >
            Make an Announcement
          </button>
        </div>
        
        {!Array.isArray(announcements) || announcements.length === 0 ? (
          <div className="text-center">
            <div className="mb-4 p-8 announcement-card rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <p className="text-white/70 text-lg">No announcements available at the moment.</p>
              <p className="text-white/50 text-sm mt-2">Check back later for updates!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <div
                key={announcement._id || announcement.id || index}
                className="announcement-card rounded-2xl p-6 border-2 border-white/15 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:shadow-xl relative"
              >
                {/* Header with title and date */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h2 className="text-white font-bold text-xl mb-2 leading-tight">
                      {announcement.title}
                    </h2>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-purple-300 text-sm font-medium px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
                      {formatDate(announcement.date)}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="content-section">
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl p-5 border border-purple-400/20">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-purple-200 font-medium text-sm uppercase tracking-wide">
                        Announcement Details
                      </h4>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-purple-100 text-base leading-relaxed whitespace-pre-line">
                        {announcement.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer with status indicator */}
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-purple-300 text-xs font-medium">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    {announcement.isActive}
                  </div>
                  <div className="flex items-center gap-1 text-white/50 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19h9" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 15h9" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11h9" />
                    </svg>
                    Official Announcement
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button 
            onClick={fetchAnnouncements}
            disabled={loading}
            className="py-3 px-8 border-[#a594f9] bg-[#231446] border-2 rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#9d8bfa] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Refresh Announcements'}
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default AnnouncementsSection;