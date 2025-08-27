import React, { useState, useEffect } from 'react';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/contactUs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      
      // Handle the specific API response structure and filter for verified reviews only
      if (data && Array.isArray(data.reviews)) {
        const verifiedReviews = data.reviews.filter(review => review.verified === true);
        setReviews(verifiedReviews);
      } else {
        console.warn('Unexpected API response format:', data);
        setReviews([]);
      }
      
      setError('');
    } catch (err) {
      setError('Failed to load reviews. Please try again later.');
      setReviews([]); // Ensure reviews is always an array even on error
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (loading) {
    return (
      <div className="font-sans min-h-screen p-5 select-none bg-[#140b29]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-white text-3xl font-semibold mb-10 text-shadow">
            Recent Reviews & Queries
          </h1>
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading reviews...</p>
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
            Recent Reviews & Queries
          </h1>
          <div className="text-center">
            <div className="mb-4 p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
              {error}
            </div>
            <button 
              onClick={fetchReviews}
              className="py-3 px-8 bg-gradient-to-r from-blue-400 to-purple-600 border-none rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:from-blue-500 hover:to-purple-700"
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
        <h1 className="text-center text-white text-3xl font-semibold mb-10 text-shadow">
          Recent Reviews & Queries
        </h1>
        
        {!Array.isArray(reviews) || reviews.length === 0 ? (
          <div className="text-center">
            <p className="text-white/70 text-lg">No verified reviews available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2">
            {reviews.map((review, index) => (
            <div
              key={review._id || review.id || index}
              className="review-card rounded-2xl p-6 border-2 border-white/15 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:shadow-xl"
            >
              {/* Header with user info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {review.name}
                  </h3>
                  <p className="text-blue-300 text-sm font-medium">
                    {review.email}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-white/50 text-xs font-medium px-2 py-1 rounded-full bg-white/5">
                    {formatTimestamp(review.createdAt)}
                  </span>
                  {/* Verified badge */}
                  <div className="flex items-center gap-1 text-green-300 text-xs font-medium px-2 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    Verified
                  </div>
                </div>
              </div>

              {/* Query Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-gray-200 font-medium text-sm uppercase tracking-wide">
                    Query
                  </h4>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {review.query}
                  </p>
                </div>
              </div>

              {/* Response Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-gray-200 font-medium text-sm uppercase tracking-wide">
                    Our Response
                  </h4>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl p-4 border border-blue-400/20">
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {review.response}
                  </p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex justify-end mt-4">
                <div className="flex items-center gap-2 text-green-300 text-xs font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Responded
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button 
            onClick={fetchReviews}
            disabled={loading}
            className="py-3 px-8 bg-[#231446] border-2 border-[#a594f9] rounded-xl text-white text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#a594f9] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Refresh Reviews'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .text-shadow {
          text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
        }
        
        .review-card {
          background: rgba(32, 25, 74, 0.4);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.15);
        }
        
        .review-card:hover {
          background: rgba(37, 30, 90, 0.5);
          transform: translateY(-2px);
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewsSection;