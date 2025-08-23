import { useState, useEffect, useRef } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [contacts, setContacts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const messageTimeoutRef = useRef(null);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:8000/contactUs');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };  const handleChange = (e) => {
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
      const response = await fetch('http://localhost:8000/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json(); // Always parse JSON

      if (response.ok && data.success) {
        setMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', query: '' });
        fetchContacts(); // Optionally refresh the queries list
      } else {
        setMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending message. Please check your connection.');
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
    <div className="min-h-screen font-sans text-white p-5 select-none" style={{backgroundColor: '#140b29'}}>
      {/* Contact Form Section */}
      <div className="max-w-lg mx-auto p-10 rounded-lg shadow-2xl backdrop-blur-sm border" 
           style={{
             backgroundColor: 'rgba(255, 255, 255, 0.1)', 
             borderColor: 'rgba(255, 255, 255, 0.1)',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
           }}>
        <h1 className="text-3xl text-center mb-8 font-normal" style={{color: '#c87fff'}}>
          Contact Us
        </h1>
        
        {message && (
          <div className={`mb-6 p-3 rounded text-center ${
            message.includes('success') 
              ? 'text-green-300' 
              : 'text-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-5">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-bold" style={{color: '#c87fff'}}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full p-3 border rounded text-white text-base transition-colors duration-300 focus:outline-none focus:shadow-lg"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 font-bold" style={{color: '#c87fff'}}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="w-full p-3 border rounded text-white text-base transition-colors duration-300 focus:outline-none focus:shadow-lg"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="query" className="block mb-2 font-bold" style={{color: '#c87fff'}}>
              Query
            </label>
            <textarea
              id="query"
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Please describe your query or message..."
              required
              rows="5"
              className="w-full p-3 border rounded text-white text-base transition-colors duration-300 focus:outline-none focus:shadow-lg resize-y"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                height: '120px',
                boxShadow: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full p-3 text-white border-0 rounded text-base font-bold cursor-pointer transition-all duration-300 active:translate-y-px disabled:cursor-not-allowed"
            style={{
              backgroundColor: isSubmitting ? 'rgba(139, 92, 246, 0.5)' : '#8b5cf6'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#7c3aed';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#8b5cf6';
              }
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>

      {/* Recent Queries Section */}
      <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-4xl font-semibold text-center mb-10 text-white" 
            style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}>
          Recent Queries
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="relative rounded-xl p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden group border"
              style={{
                background: 'linear-gradient(135deg, #1e1538 0%, #2a1f4a 100%)',
                borderColor: '#3d2f5f',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.4)';
                const before = e.currentTarget.querySelector('.gradient-border');
                if (before) before.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#3d2f5f';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                const before = e.currentTarget.querySelector('.gradient-border');
                if (before) before.style.opacity = '0';
              }}
            >
              {/* Gradient top border */}
              <div 
                className="gradient-border absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc)',
                  opacity: 0
                }}
              ></div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-0" style={{color: '#e0e7ff'}}>
                  {contact.name}
                </h3>
              </div>
              
              <div className="text-sm leading-relaxed break-words" 
                   style={{color: '#c1c9e8', fontSize: '0.95rem', lineHeight: '1.6'}}>
                {contact.query}
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p className="text-lg">No recent queries to display</p>
          </div>
        )}
      </div>

      <style jsx>{`
        input::placeholder,
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}