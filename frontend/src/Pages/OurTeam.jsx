import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';

const OurTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch members from API
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:8000/member');
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, observerOptions);

    // Observe team cards
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card) => {
      observerRef.current.observe(card);
    });

    // Parallax effect for hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-section');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [members]);

  const handleCardMouseEnter = (e) => {
    e.currentTarget.style.zIndex = '10';
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.zIndex = '1';
  };

  // Function to categorize members by their roles
  const categorizeMembers = () => {
    const categories = {
      alumni: { title: 'Alumni', members: [], priority: 1 },
      leadership: { title: 'Leadership Team', members: [], priority: 2 },
      coordinator: { title: 'Club Coordinator', members: [], priority: 3 },
      executives: { title: 'Executives', members: [], priority: 4 },
      volunteers: { title: 'Volunteers', members: [], priority: 5 }
    };

    members.forEach(member => {
      const role = member.role?.toLowerCase() || '';
      
      if (role.includes('alumni')) {
        categories.alumni.members.push(member);
      } else if (role.includes('secretary') || role.includes('convener')) {
        categories.leadership.members.push(member);
      } else if (role.includes('coordinator')) {
        categories.coordinator.members.push(member);
      } else if (role.includes('executive')) {
        categories.executives.members.push(member);
      } else if (role.includes('volunteer')) {
        categories.volunteers.members.push(member);
      } else {
        // Default category for unmatched roles
        categories.volunteers.members.push(member);
      }
    });

    // Filter out empty categories and sort by priority
    return Object.values(categories)
      .filter(category => category.members.length > 0)
      .sort((a, b) => a.priority - b.priority);
  };

  const renderMemberCard = (member, index, globalIndex) => (
    <div
      key={member.id || `${member.name}-${index}`}
      className="team-card bg-gradient-to-br from-white/5 to-white/2 rounded-3xl p-8 text-center relative overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-500 cursor-pointer opacity-0 translate-y-12 scale-90"
      style={{
        animationDelay: `${globalIndex * 0.1}s`
      }}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      {/* Shine effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-600 shine-effect"></div>
      
      {/* Member Image */}
      <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden relative border-4 border-transparent bg-gradient-to-r from-blue-400 to-purple-600 p-1 transition-all duration-300 member-image">
        <img
          src={member.profileImageURL}
          alt={member.name}
          className="w-full h-full object-cover rounded-full transition-transform duration-300"
        />
      </div>

      {/* Member Details */}
      <h3 className="text-xl font-semibold mb-3 text-white transition-all duration-300 member-name">
        {member.name}
      </h3>
      <p className="text-sm text-purple-300 font-medium leading-relaxed mb-2 transition-color duration-300">
        {member.role}
      </p>
      <p className="text-sm text-gray-300 leading-relaxed mb-6 transition-color duration-300 member-bio">
        {member.bio}
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mt-auto">
        {member.linkedInURL && (
          <a
            href={member.linkedInURL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/10 relative overflow-hidden hover:-translate-y-1 hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 transition-opacity duration-300"></div>
            <svg className="w-5 h-5 fill-white relative z-10 transition-all duration-300" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
        {member.githubURL && (
          <a
            href={member.githubURL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/10 relative overflow-hidden hover:-translate-y-1 hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 transition-opacity duration-300"></div>
            <svg className="w-5 h-5 fill-white relative z-10 transition-all duration-300" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#140b29' }}>
        <div className="text-white text-xl">Loading team members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#140b29' }}>
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  const categorizedMembers = categorizeMembers();
  let globalIndex = 0;

  return (
    <div className="font-sans text-white select-none min-h-screen" style={{ backgroundColor: '#140b29' }}>
      <div className="max-w-6xl mx-auto px-5">
        {/* Hero Section */}
        <section className="hero-section text-center py-20 pb-16 opacity-0 translate-y-12 animate-[fadeInUp_1s_ease-out_forwards]">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate individuals working together to create amazing experiences
            and drive innovation forward.
          </p>
        </section>

        {/* Members Click Here Button */}
        
          <button className="submit-btn block mb-10 w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-purple-700 border-none rounded-xl text-white text-lg font-semibold cursor-pointer transition-all duration-300 mt-5 hover:from-purple-700 hover:to-purple-900 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
          onClick={() => navigate('/member/admin_only/newMember')}>
            Members Click Here
          </button>
        

        {/* Categorized Team Sections */}
        {categorizedMembers.map((category, categoryIndex) => (
          <div key={category.title} className="mb-16">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title">
                {category.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-5">
              {category.members.map((member, index) => {
                const card = renderMemberCard(member, index, globalIndex);
                globalIndex++;
                return card;
              })}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-section h1 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-title {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .team-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .team-card:hover .shine-effect {
          left: 100%;
        }

        .team-card:hover .member-image {
          transform: scale(1.1);
        }

        .team-card:hover .member-image img {
          transform: scale(1.1);
        }

        .team-card:hover .member-name {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .team-card:hover .member-bio {
          color: #d0d0d0;
        }

        .social-link:hover .absolute {
          opacity: 1;
        }

        .social-link:hover svg {
          transform: scale(1.1);
        }

        .social-link:hover {
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
      `}</style>
    </div>
  );
};

export default OurTeam;