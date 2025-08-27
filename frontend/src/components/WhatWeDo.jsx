import React, { useState, useEffect, useRef } from 'react';

const WhatWeDo = () => {
  const [activeSection, setActiveSection] = useState(0);
  
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
  }, []);

  // Scroll handler for section detection
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll('.content-section');
      const windowHeight = window.innerHeight;
      let newActiveSection = 0;

      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.6) {
          newActiveSection = index;
        }
      });

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <React.Fragment>
      <style jsx>{`
        .gasoek-font {
          font-family: 'Gasoek One', sans-serif;
        }
        
        .purple-shape {
          clip-path: polygon(0% 15%, 85% 0%, 100% 85%, 15% 100%);
        }
        
        .section-image-transition {
          transition: all 0.8s cubic-bezier(.4,2,.6,1);
        }
      `}</style>

      <div className="bg-[#140b29]">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Left Panel - Sticky */}
          <div className="lg:sticky lg:top-0 lg:w-1/2 h-screen flex items-center justify-center bg-[#140b29] flex-shrink-0 z-10">
            <div className="relative w-80 h-[420px] flex items-center justify-center">
              {/* Purple shape background */}
              {/* <div className="absolute w-80 h-[420px] bg-purple-300 purple-shape -rotate-12 z-10"></div> */}
              
              {/* Stacked images */}
              {sectionsData.current.map((section, idx) => (
                <img
                  key={section.id}
                  src={section.image}
                  alt={section.title}
                  className={`absolute left-1/2 top-1/2 w-64 h-96 rounded-xl object-cover shadow-2xl -translate-x-1/2 -translate-y-1/2 section-image-transition
                    ${idx === activeSection ? 'z-30 opacity-100 scale-100' : idx < activeSection ? 'z-20 opacity-0 scale-95' : 'z-10 opacity-0 scale-95'}`}
                  style={{ 
                    transition: 'all 0.8s cubic-bezier(.4,2,.6,1)', 
                    pointerEvents: idx === activeSection ? 'auto' : 'none' 
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Panel - Scrollable Content */}
          <div className="lg:w-1/2 bg-[#140b29] relative z-20">
            {/* Header */}
            <div className="h-screen flex items-center justify-center px-8 lg:px-16">
              <h1 
                className="gasoek-font font-normal text-center text-[#a594f9] tracking-wide uppercase leading-tight"
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
                <h2 className="text-4xl font-bold mb-8 text-[#a594f9] leading-tight">
                  {section.title}
                </h2>
                <p className="text-lg leading-relaxed text-gray-200 mb-12 max-w-[90%] font-normal">
                  {section.description}
                  <br />
                  <a 
                    href={section.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#a594f9] hover:text-purple-200 transition-colors inline-flex items-center mt-4 group"
                  >
                    <span className="mr-2">
                      {section.id === 'hack-on-hills' ? 'HACKONHILLS-7.0' : 
                       section.id === 'nimbus-app' ? 'Nimbus-2k25' : 'Hillfair-2k24'}
                    </span>
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
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
    </React.Fragment>
  );
};

export default WhatWeDo;