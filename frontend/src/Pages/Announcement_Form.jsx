import React, { useState, useRef, useEffect } from 'react';

export default function AnnouncementForm() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const messageTimeoutRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage('');
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);

    try {
      const response = await fetch(`http://localhost:8000/announcements/admin_only/${import.meta.env.VITE_ROUTE_SECRET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message || 'Announcement posted successfully!');
        setFormData({ title: '', date: '', content: '' });
      } else {
        setMessage(data.message || 'Failed to post announcement. Please try again.');
      }
    } catch (error) {
      setMessage('Error posting announcement. Please check your connection.');
      console.error('Error:', error);
    }

    setIsSubmitting(false);
    messageTimeoutRef.current = setTimeout(() => setMessage(''), 4000);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="min-h-screen font-sans text-white flex justify-center items-center p-5"
      style={{backgroundColor: '#140b29'}}
    >
      <div 
        className="w-full max-w-2xl p-10 rounded-xl border-2 shadow-lg">
        <h1 
          className="text-4xl font-semibold text-center mb-8"
        >
          What's the Announcement
        </h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            message.includes('success') 
              ? 'text-green-300' 
              : 'text-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div className="mb-6">
            <label 
              htmlFor="title" 
              className="block mb-2 font-semibold text-lg"
            >
              Title of Announcement
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter announcement title"
              required
              className="w-full px-4 py-4 border rounded-lg text-white text-base transition-all duration-300 focus:outline-none focus:transform focus:-translate-y-0.5 font-sans"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="date" 
              className="block mb-2 font-semibold text-lg"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 border rounded-lg text-white text-base transition-all duration-300 focus:outline-none focus:transform focus:-translate-y-0.5 font-sans"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="content" 
              className="block mb-2 font-semibold text-lg"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your announcement content here..."
              required
              rows="6"
              className="w-full px-4 py-4 border rounded-lg text-white text-base transition-all duration-300 focus:outline-none focus:transform focus:-translate-y-0.5 resize-y font-sans"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: '150px',
                minHeight: '100px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full px-4 py-4 text-white border-0 rounded-lg text-xl font-bold cursor-pointer transition-all duration-300 transform uppercase tracking-wider disabled:cursor-not-allowed"
            style={{
              background: isSubmitting ? 'rgba(139, 92, 246, 0.5)' : 'linear-gradient(135deg, #8b5cf6, #a855f7)',
              boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(139, 92, 246, 0.3)'
            }}
            
          >
            {isSubmitting ? 'Posting...' : 'Post the Announcement'}
          </button>
        </div>
      </div>

      <style jsx>{`
        
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        @media (max-width: 767px) {
          .max-w-2xl {
            padding: 30px 20px;
          }
          
          h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}