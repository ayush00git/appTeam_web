import { useState, useEffect } from 'react';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:8000/announcements');
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data.announcements || data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnnouncement = (index) => {
    setActiveAnnouncement(activeAnnouncement === index ? null : index);
  };

  const handleMakeAnnouncement = () => {
    // You can implement navigation logic here
    window.open('/announcements/admin_only', '_blank');
  };

  return (
    <div className="min-h-screen font-sans text-white py-10 px-5" style={{backgroundColor: '#140b29'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-5">
          <h1 className="text-4xl font-semibold" style={{
            color: '#ca82ff', 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Announcements
          </h1>
          
          <button 
            onClick={handleMakeAnnouncement}
            className="px-6 py-3 text-white border-2 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 transform"
            
          >
            Make an Announcement
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-white/60 py-12">
            <p className="text-lg">Loading announcements...</p>
          </div>
        )}

        {/* Announcements List */}
        <div className="flex flex-col gap-5">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                activeAnnouncement === index ? 'active' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #1e1538 0%, #2a1f4a 100%)',
                borderColor: activeAnnouncement === index ? '#8b5cf6' : '#3d2f5f',
                boxShadow: activeAnnouncement === index 
                  ? '0 12px 48px rgba(0, 0, 0, 0.4)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
                transform: activeAnnouncement === index ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              {/* Gradient top border */}
              <div 
                className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc)',
                  opacity: activeAnnouncement === index ? 1 : 0
                }}
              ></div>

              {/* Header */}
              <div 
                className="p-6 cursor-pointer flex justify-between items-center transition-colors duration-300"
                style={{
                  backgroundColor: activeAnnouncement === index ? 'rgba(139, 92, 246, 0.1)' : 'transparent'
                }}
                onClick={() => toggleAnnouncement(index)}
                onMouseEnter={(e) => {
                  if (activeAnnouncement !== index) {
                    e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeAnnouncement !== index) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <h3 className="text-xl font-semibold m-0" style={{color: '#e0e7ff'}}>
                  {announcement.title}
                </h3>
                <span 
                  className="text-xl transition-transform duration-300"
                  style={{
                    color: '#8b5cf6',
                    transform: activeAnnouncement === index ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  ▼
                </span>
              </div>

              {/* Content */}
              <div 
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: activeAnnouncement === index ? '500px' : '0px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="p-6 border-t" style={{borderColor: '#3d2f5f'}}>
                  {/* Meta info */}
                  <div className="flex justify-between items-center mb-4 text-sm" style={{color: '#8b5cf6'}}>
                    <span className="font-medium">
                      {announcement.date || new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                    <span className="italic">
                      By: {announcement.author || 'Admin Team'}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div 
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{color: '#c1c9e8', fontSize: '0.95rem', lineHeight: '1.6'}}
                  >
                    {announcement.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && announcements.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p className="text-lg">No announcements to display</p>
          </div>
        )}
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          .max-w-4xl {
            padding: 0 15px;
          }
          
          .flex.justify-between.items-center.mb-10 {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            gap: 20px;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          button {
            align-self: center;
          }
        }
      `}</style>
    </div>
  );
}