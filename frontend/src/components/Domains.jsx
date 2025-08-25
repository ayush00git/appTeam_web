import React, { useState, useEffect } from 'react';

const OurDomains = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);

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

  const domains = [
    {
      title: 'Web Development',
      description: 'Building responsive, modern web applications with cutting-edge technologies like React, Next.js, and Node.js.',
    },
    {
      title: 'Mobile App Development',
      description: 'Creating native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
    },
    {
      title: 'AI & Machine Learning',
      description: 'Developing intelligent solutions using machine learning, deep learning, and natural language processing.',
    },
    {
      title: 'Blockchain',
      description: 'Building decentralized applications, smart contracts, and blockchain-based solutions for the future.',
    },
    {
      title: 'VR/AR Development',
      description: 'Creating immersive virtual and augmented reality experiences for entertainment, education, and enterprise.',
    },
    {
      title: 'IoT Development',
      description: 'Connecting the physical world with smart devices, sensors, and automated systems for Industry 4.0.',
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
        
        .gasoek-font {
          font-family: 'Gasoek One', sans-serif;
        }
        
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 100%);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
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
        
        .domain-card {
          opacity: 0;
          transform: translateY(50px);
        }
        
        .tech-tag {
          animation: float 3s ease-in-out infinite;
        }
        
        .tech-tag:nth-child(2) { animation-delay: 0.5s; }
        .tech-tag:nth-child(3) { animation-delay: 1s; }
        .tech-tag:nth-child(4) { animation-delay: 1.5s; }
        .tech-tag:nth-child(5) { animation-delay: 2s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .modal-overlay {
          backdrop-filter: blur(10px);
          background: rgba(20, 11, 41, 0.8);
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#140b29] overflow-x-hidden relative">
        {/* Header Section with Clip Path */}
        <section className="bg-[#140b29] clip-path-polygon pb-20 pt-20 px-8">
          <div className="text-center mb-16">
            <h1 
              className="gasoek-font font-normal text-[#a594f9] mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
            >
              OUR DOMAINS
            </h1>
            <p className="text-[#a594f9] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-80">
              We excel in diverse technology domains, delivering innovative solutions that shape the digital future
            </p>
          </div>
        </section>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-10 w-32 h-32 border border-[#a594f9] opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-16 w-24 h-24 bg-[#a594f9] opacity-5 rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 border-2 border-[#a594f9] opacity-8 rotate-12"></div>
        <div className="absolute bottom-20 right-24 w-16 h-16 bg-[#a594f9] opacity-10 rounded-full"></div>

        {/* Domains Grid */}
        <section className="px-8 pb-20 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {domains.map((domain, index) => (
              <div 
                key={index}
                className="domain-card relative rounded-2xl overflow-hidden shadow-2xl h-64 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-3xl group"
                data-delay={index * 100}
                onClick={() => setSelectedDomain(domain)}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#a594f9] to-[#8c7ae6] flex flex-col justify-center p-8 relative transform transition-transform duration-300 ease-in-out hover:scale-105">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-10 h-10 border-2 border-[#140b29] rounded-full"></div>
                    <div className="absolute top-8 right-6 w-8 h-8 border border-[#140b29] rotate-45"></div>
                    <div className="absolute bottom-8 left-8 w-6 h-6 bg-[#140b29] rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-[#140b29] rotate-12"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-[#140b29] font-bold text-2xl mb-4 leading-tight">
                      {domain.title}
                    </h3>
                    <p className="text-[#140b29] text-sm opacity-80 leading-relaxed">
                      {domain.description.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default OurDomains;