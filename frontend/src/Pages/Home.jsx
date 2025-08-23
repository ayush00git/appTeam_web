import React, { useState, useEffect, useRef } from 'react';

const Homepage = () => {
  // State management
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [faqScrollY, setFaqScrollY] = useState(0);
  
  // Refs
  const currentImageRef = useRef(null);
  const sectionsData = useRef([
    {
      id: "hack-on-hills",
      title: "Conduct Hack on Hills",
      description: "North India's biggest student-run hackathon, powered by our robust event management and judging platform with real-time updates and seamless participant experience.",
      image: "/homepage/hoh.webp",
      link: "https://www.hackonhills.com/"
    },
    {
      id: "nimbus-app", 
      title: "Nimbus App",
      description: "A comprehensive platform for NIT Hamirpur's annual tech fest, offering schedules, live updates, interactive maps, and streamlined event registration features.",
      image: "/homepage/nimbus.webp",
      link: "https://play.google.com/store/apps/details?id=com.appteam.nimbus2k25&pcampaignid=web_share"
    },
    {
      id: "hillfair-app",
      title: "Hillfair App", 
      description: "The official app for NIT Hamirpur's cultural fest, blending vibrant UI with seamless user experience to celebrate student creativity and cultural diversity through innovative features.",
      image: "/homepage/hillfair.webp",
      link: "https://play.google.com/store/apps/details?id=com.appteam.hillfair2k24&pcampaignid=web_share"
    }
  ]);

  // Load fonts
  useEffect(() => {
    if (!document.querySelector('link[href*="Gasoek"]')) {
      const gasoekLink = document.createElement('link');
      gasoekLink.href = 'https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap';
      gasoekLink.rel = 'stylesheet';
      document.head.appendChild(gasoekLink);
    }

    if (!document.querySelector('link[href*="Ubuntu"]')) {
      const ubuntuLink = document.createElement('link');
      ubuntuLink.href = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap';
      ubuntuLink.rel = 'stylesheet';
      document.head.appendChild(ubuntuLink);
    }
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll handlers
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Handle section changes for image switching
      const sectionElements = document.querySelectorAll('.content-section');
      let newActiveSection = 0;

      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.8) {
          newActiveSection = index;
        }
      });

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }

      // Handle FAQ scroll effects
      const faqSection = document.querySelector('.faq-hero-section');
      if (faqSection) {
        const faqRect = faqSection.getBoundingClientRect();
        const relativeScroll = Math.max(0, -faqRect.top);
        setFaqScrollY(relativeScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Update image when active section changes
  useEffect(() => {
    const currentImage = currentImageRef.current;
    if (currentImage && activeSection >= 0 && activeSection < sectionsData.current.length) {
      const newImageSrc = sectionsData.current[activeSection].image;
      if (currentImage.src !== newImageSrc) {
        currentImage.classList.add('opacity-0', 'scale-105');
        setTimeout(() => {
          currentImage.src = newImageSrc;
          currentImage.classList.remove('opacity-0', 'scale-105');
        }, 200);
      }
    }
  }, [activeSection]);

  // Animation observer for domain cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const domainCards = document.querySelectorAll('.domain-card');
    domainCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const faqCards = [
    {
      id: 1,
      category: 'security',
      bgColor: 'bg-purple-600',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      question: 'How can I join the APP Team?',
      answer: 'You can join by filling out the recruitment form we share at the start of each semester. Follow our social media for updates!'
    },
    {
      id: 2,
      category: 'wallet',
      bgColor: 'bg-emerald-500',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      ),
      question: 'Do I need any prior experience to join?',
      answer: "No! We welcome beginners. If you're eager to learn, we'll help you grow with training and mentorship."
    },
    {
      id: 3,
      category: 'speed',
      bgColor: 'bg-orange-500',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
        </svg>
      ),
      question: 'What kind of projects do you work on?',
      answer: 'In the App Team, we develop apps for college fests like Nimbus and Hillfair, build websites, and organize the annual Hack on Hills hackathon.'
    },
    {
      id: 4,
      category: 'support',
      bgColor: 'bg-red-400',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="m22,21-3-3m2-5a5,5 0 1,1-10,0 5,5 0 0,1 10,0Z" />
        </svg>
      ),
      question: 'Can first-year students join the team?',
      answer: 'Yes! First-year students are encouraged to join and explore different domains to find what interests them most.'
    }
  ];

  return (
    <React.Fragment>
      {/* Custom Styles */}
      <style jsx>{`
        body {
          font-family: 'Ubuntu', sans-serif !important;
          user-select: none;
        }
        
        .hero-gradient {
          background: linear-gradient(180deg, #140b29 0%, #140b29 60%, #a594f9 60%, #a594f9 100%);
        }
        
        .gasoek-font {
          font-family: 'Gasoek One', sans-serif;
        }
        
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 100%);
        }
        
        .purple-shape {
          clip-path: polygon(0% 15%, 85% 0%, 100% 85%, 15% 100%);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-10px);
          }
          70% {
            transform: translateY(-5px);
          }
        }
        
        .section-image-transition {
          transition: all 0.8s ease-in-out;
        }
        
        .domain-card {
          opacity: 0;
          transform: translateY(50px);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #140b29;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #a594f9;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #9084e8;
        }
      `}</style>

      <div className="w-full min-h-screen hero-gradient overflow-x-hidden">
        {/* Hero Section */}
        <section className="h-[80vh] flex items-center justify-center relative px-8">
          <div className="text-center">
            <h1 
              className="gasoek-font font-normal text-purple-300 leading-none tracking-tight"
              style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}
            >
              APP<br />TEAM
            </h1>
          </div>
        </section>

        {/* Domains Section */}
        <section className="bg-purple-300 min-h-[40vh] px-8 pt-16 pb-16 clip-path-polygon -mt-8">
          <div className="text-center mb-12">
            <h2 
              className="gasoek-font font-normal text-purple-900"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Our Domains
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { src: '/homepage/web.webp', alt: 'Web Development', delay: 0 },
              { src: '/homepage/app.webp', alt: 'Mobile App Development', delay: 100 },
              { src: '/homepage/ml.webp', alt: 'AI & Machine Learning', delay: 200 },
              { src: '/homepage/bchain.webp', alt: 'Blockchain', delay: 300 },
              { src: '/homepage/ar.webp', alt: 'VR/AR Development', delay: 400 },
              { src: '/homepage/iot.webp', alt: 'IoT Development', delay: 500 }
            ].map((domain, index) => (
              <div 
                key={index}
                className="domain-card relative rounded-xl overflow-hidden shadow-lg h-56 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
                data-delay={domain.delay}
              >
                <img 
                  src={domain.src}
                  alt={domain.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>

        {/* What We Do Section - Fixed Sticky Container */}
        <div className="bg-purple-950">
          <div className="flex flex-col lg:flex-row items-start">
            {/* Left Panel - Sticky */}
            <div className="lg:sticky lg:top-0 lg:w-1/2 h-screen flex items-center justify-center bg-purple-950 flex-shrink-0 z-10">
              <div className="relative w-80 h-[420px] flex items-center justify-center">
                {/* Purple shape background */}
                <div className="absolute w-80 h-[420px] bg-purple-300 purple-shape -rotate-12 z-10"></div>
                {/* Stacked images */}
                {sectionsData.current.map((section, idx) => (
                  <img
                    key={section.id}
                    src={section.image}
                    alt={section.title}
                    className={`absolute left-1/2 top-1/2 w-64 h-96 rounded-xl object-cover shadow-2xl -translate-x-1/2 -translate-y-1/2 section-image-transition
                      ${idx === activeSection ? 'z-30 opacity-100 scale-100' : idx < activeSection ? 'z-20 opacity-0 scale-95' : 'z-10 opacity-0 scale-95'}`}
                    style={{ transition: 'all 0.8s cubic-bezier(.4,2,.6,1)', pointerEvents: idx === activeSection ? 'auto' : 'none' }}
                  />
                ))}
              </div>
            </div>

            {/* Right Panel - Scrollable Content */}
            <div className="lg:w-1/2 bg-purple-950 relative z-20">
              {/* Header */}
              <div className="h-screen flex items-center justify-center px-8 lg:px-16">
                <h1 
                  className="gasoek-font font-normal text-center text-purple-300 tracking-wide uppercase leading-tight"
                  style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
                >
                  WHAT WE DO
                </h1>
              </div>

              {/* Content Sections */}
              {sectionsData.current.map((section, index) => (
                <div 
                  key={section.id}
                  className={`content-section min-h-[80vh] px-8 lg:px-16 py-16 flex flex-col justify-center transition-all duration-500 ${
                    index === activeSection ? 'opacity-100 transform-none' : 'opacity-30 translate-y-5'
                  }`}
                >
                  <h2 className="text-4xl font-bold mb-8 text-purple-300 leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-200 mb-12 max-w-[90%] font-normal">
                    {section.description}
                    <br />
                    <a 
                      href={section.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      {section.id === 'hack-on-hills' ? 'HACKONHILLS-7.0' : 
                       section.id === 'nimbus-app' ? 'Nimbus-2k25' : 'Hillfair-2k24'}
                    </a>
                  </p>
                  <div 
                    className="w-full h-0.5 mt-auto"
                    style={{ background: 'linear-gradient(90deg, #a594f9 0%, transparent 100%)' }}
                  ></div>
                </div>
              ))}

              {/* Bottom Spacer */}
              <div className="h-[50vh]"></div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="min-h-[180vh] bg-purple-300">
          {/* FAQ Hero */}
          <div className="faq-hero-section relative min-h-screen flex flex-col items-center justify-center px-4 overflow-visible">
            <div 
              className="relative z-20 text-center transition-all duration-300"
              style={{
                opacity: Math.max(0, 1 - faqScrollY / 900),
                transform: `scale(${Math.max(0.85, 1 - faqScrollY / 1800)})`
              }}
            >
              <h1 
                className="gasoek-font font-normal mb-8 text-purple-900 tracking-tight leading-tight"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
              >
                Frequently asked questions
              </h1>

              {/* Decorative Card */}
              <div className="relative mx-auto w-80 h-48 bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-orange-400 rounded-xl rotate-12"></div>
                <div className="absolute top-8 right-6 w-8 h-8 bg-pink-300 rounded-full"></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-blue-400 rounded-2xl -rotate-6"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-10 h-10 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9,9a3,3 0 1,1 6,0c0,2 -3,3 -3,3" />
                      <path d="m12,17 l.01,0" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 text-purple-600">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9,9a3,3 0 1,1 6,0c0,2 -3,3 -3,3" />
                    <path d="m12,17 l.01,0" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div 
              className="absolute bottom-8 animate-bounce-slow"
              style={{
                opacity: Math.max(0, 1 - faqScrollY / 900)
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#140b29" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </div>

          {/* FAQ Cards */}
          <div className="relative min-h-screen px-4 py-20">
            <div 
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500"
              style={{
                transform: `translateY(${Math.max(0, 100 - faqScrollY / 12)}px)`,
                opacity: Math.min(1, faqScrollY / 900)
              }}
            >
              {faqCards.map((card) => (
                <div
                  key={card.id}
                  className={`${card.bgColor} aspect-square rounded-2xl shadow-lg transition-all duration-500 cursor-pointer overflow-hidden flex flex-col hover:scale-105 hover:-translate-y-2 group`}
                >
                  <div className="p-6 text-white h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-bold leading-tight">
                        {card.question}
                      </h3>
                    </div>

                    <div className="transition-all duration-500 overflow-hidden max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 flex-grow">
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-white/90 text-sm leading-relaxed">
                          {card.answer}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-white/70 text-sm pt-4">
                      <span>Hover for answer</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-4"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;