import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.gallery-item');
      const windowHeight = window.innerHeight;

      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('animate');
        }
      });
    };

    const handleScroll = () => {
      animateOnScroll();
    };

    const handleLoad = () => {
      animateOnScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleLoad);

    // Initial animation check
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="bg-[#140b29] text-white font-sans leading-relaxed select-none min-h-screen">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="text-center py-20 pb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent mb-5 opacity-0 translate-y-12 animate-[fadeInUp_1s_ease-out_forwards]">
            About Us
          </h1>
        </div>

        {/* Gallery Section */}
        <div className="py-10">
          {/* Our Journey */}
          <div className="gallery-item mb-20 opacity-0 translate-y-12 transition-all duration-700 ease-out">
            <div className="flex items-center gap-10 mb-16 lg:flex-row flex-col">
              <div className="flex-1 flex gap-5 lg:flex-row flex-col">
                <div className="flex-1 relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 group">
                  <img 
                    src="/aboutUs/us_1.webp" 
                    alt="Team collaboration"
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 group">
                  <img 
                    src="/aboutUs/us_2.webp" 
                    alt="Creative workspace"
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex-1 p-5">
                <h3 className="text-3xl mb-5 text-purple-300 font-bold">Our Journey</h3>
                <p className="text-lg leading-relaxed text-purple-200 text-justify">
                  We began as a small group of passionate individuals united by a vision to build something impactful. What started in a modest setting quickly evolved through our shared drive, creativity, and relentless effort. Along the way, we took on challenges that tested and strengthened our bond—most notably organizing HACKONHILLS, the biggest hackathon in North India. Countless late nights, problem-solving sessions, and team wins shaped our path. Today, we stand as a tightly knit team that thrives on innovation, collaboration, and creating meaningful experiences together.
                </p>
              </div>
            </div>
          </div>

          {/* Innovation & Technology */}
          <div className="gallery-item mb-20 opacity-0 translate-y-12 transition-all duration-700 ease-out">
            <div className="flex items-center gap-10 mb-16 lg:flex-row-reverse flex-col">
              <div className="flex-1 flex gap-5 lg:flex-row flex-col">
                <div className="flex-1 relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 group">
                  <img 
                    src="/aboutUs/inv1.webp" 
                    alt="Innovation lab"
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 group">
                  <img 
                    src="/aboutUs/inv2.webp" 
                    alt="Technology focus"
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex-1 p-5">
                <h3 className="text-3xl mb-5 text-purple-300 font-bold">Innovation & Technology</h3>
                <p className="text-lg leading-relaxed text-purple-200 text-justify">
                  From humble beginnings, our team came together with a shared passion for innovation and a drive to make an impact through technology. What started as a small group evolved into a force behind meaningful projects—like developing the official Nimbus and Hillfair apps for NIT Hamirpur, and organizing HACKONHILLS, the largest hackathon in North India. Our journey has been shaped by late-night coding sprints, creative problem-solving, and an unshakable commitment to excellence. Today, we continue to grow as a team that believes in building solutions that matter—powered by collaboration, curiosity, and a love for tech.
                </p>
              </div>
            </div>
          </div>

          {/* Best Tech Innovation Team */}
          <div className="gallery-item mb-20 opacity-0 translate-y-12 transition-all duration-700 ease-out">
            <div className="flex items-center gap-10 mb-16 lg:flex-row flex-col">
              <div className="flex-1 flex gap-5 lg:flex-row flex-col">
                <div className="flex-1 relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 group">
                  <img 
                    src="/aboutUs/ach2.webp" 
                    alt="Global reach"
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 group">
                  <img 
                    src="/aboutUs/ach1.webp" 
                    alt="Diverse community"
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex-1 p-5">
                <h3 className="text-3xl mb-5 text-purple-300 font-bold">Best Tech Innovation Team</h3>
                <p className="text-lg leading-relaxed text-purple-200 text-justify">
                  Our journey has been marked by dedication, creativity, and a relentless pursuit of excellence. One of our proudest milestones was being honored with the title of "Best Tech Innovation Team", a recognition of the impact we've made through our projects and initiatives. From building official apps for Nimbus and Hillfair, to leading large-scale events like HACKONHILLS, we've consistently pushed boundaries and delivered with purpose. These achievements reflect not just our technical skills, but our ability to work as a team, turn ideas into reality, and inspire innovation at every step.
                </p>
              </div>
            </div>
          </div>

          {/* Single Images Grid */}
          <div className="gallery-item opacity-0 translate-y-12 transition-all duration-700 ease-out">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:-translate-y-3 group">
                <img 
                  src="/aboutUs/end1.webp" 
                  alt="Team meeting"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:-translate-y-3 group">
                <img 
                  src="/aboutUs/end2.webp" 
                  alt="Strategic planning"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:-translate-y-3 group">
                <img 
                  src="/aboutUs/end3.webp" 
                  alt="Success celebration"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .gallery-item.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;