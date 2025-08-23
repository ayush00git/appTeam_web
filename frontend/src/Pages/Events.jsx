import React, { useEffect, useRef } from 'react';

const Events = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all fade-in elements
    elements.forEach((element, index) => {
      if (element.classList.contains('image-item')) {
        const delay = element.dataset.delay || index * 100;
        element.style.transitionDelay = `${delay}ms`;
      }
      observerRef.current.observe(element);
    });

    // Add loading animation for the main title
    setTimeout(() => {
      const mainTitle = document.querySelector('.main-title');
      if (mainTitle) {
        mainTitle.classList.add('visible');
      }
    }, 300);

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const hackOnHillsImages = [
    { src: '/events/hoh/HOH1.webp', alt: 'HackOnHills Event 1', delay: '100' },
    { src: '/events/hoh/HOH2.webp', alt: 'HackOnHills Event 2', delay: '200' },
    { src: '/events/hoh/HOH3.webp', alt: 'HackOnHills Event 3', delay: '300' },
    { src: '/events/hoh/HOH4.webp', alt: 'HackOnHills Event 4', delay: '400' },
    { src: '/events/hoh/HOH5.webp', alt: 'HackOnHills Event 5', delay: '500' },
    { src: '/events/hoh/HOH6.webp', alt: 'HackOnHills Event 6', delay: '600' },
  ];

  const nimbusImages = [
    { src: '/events/nimbus/NBS1.webp', alt: 'Nimbus Event 1', delay: '100' },
    { src: '/events/nimbus/NBS2.webp', alt: 'Nimbus Event 2', delay: '200' },
    { src: '/events/nimbus/NBS3.webp', alt: 'Nimbus Event 3', delay: '300' },
    { src: '/events/nimbus/NBS4.webp', alt: 'Nimbus Event 4', delay: '400' },
    { src: '/events/nimbus/NBS5.webp', alt: 'Nimbus Event 5', delay: '500' },
    { src: '/events/nimbus/NBS6.webp', alt: 'Nimbus Event 6', delay: '600' },
  ];

  return (
    <div className="font-sans leading-relaxed text-white select-none min-h-screen" style={{ backgroundColor: '#140b29' }}>
      <div className="max-w-6xl mx-auto px-8 py-8 relative">
        <h1 className="main-title fade-in text-6xl font-bold text-center my-8 mb-16 uppercase tracking-widest">
          EVENTS
        </h1>

        {/* HackOnHills Section */}
        <div className="text-center mb-16">
          <h2 className="fade-in text-3xl md:text-5xl font-semibold mb-6 text-purple-300 uppercase tracking-wider">
            HACK ON HILLS 6.0
          </h2>
          <p className="fade-in text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-12 text-purple-200 text-justify">
            HackonHills 6.0, organized by our App Team at NIT Hamirpur, was a landmark event that brought together innovators, developers, and tech enthusiasts from across the region. As North India's largest hackathon, it featured 36 hours of nonstop coding, problem-solving, and collaboration. From ideation to execution, our team led the entire initiative—creating an environment where creativity thrived and groundbreaking solutions came to life.
          </p>
        </div>

        {/* HackOnHills Images */}
        <div className="relative min-h-screen mb-4 md:min-h-[140vh]">
          {hackOnHillsImages.map((image, index) => (
            <div
              key={`hoh-${index}`}
              className={`image-item fade-in absolute w-80 md:w-[500px] h-48 md:h-52 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 opacity-0 transform translate-y-12 scale-90 hover:scale-105 hover:-translate-y-3 hover:shadow-3xl ${
                index % 2 === 0 ? 'left-[5%]' : 'right-[5%]'
              } md:block hidden`}
              style={{ 
                top: `${10 + index * 110}px`,
                marginTop: '0'
              }}
              data-delay={image.delay}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
              />
            </div>
          ))}
          
          {/* Mobile Layout for HackOnHills */}
          <div className="md:hidden flex flex-col items-center gap-5">
            {hackOnHillsImages.map((image, index) => (
              <div
                key={`hoh-mobile-${index}`}
                className="image-item fade-in w-80 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 opacity-0 transform translate-y-12 scale-90"
                data-delay={image.delay}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nimbus Section */}
        <div className="text-center mb-16 mt-8">
          <h2 className="fade-in text-3xl md:text-5xl font-semibold mb-6 text-purple-300 uppercase tracking-wider">
            NIMBUS 2K25
          </h2>
          <p className="fade-in text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-12 text-purple-200 text-justify">
            At Nimbus 2K25, our App Team proudly played a key role—not just as participants, but as contributors to the event's digital success. We developed the official Nimbus app, designed to enhance the user experience and streamline event interactions for thousands of attendees. Our efforts were recognized with the prestigious title of "Best Innovation Team", a testament to our commitment to building smart, impactful solutions that elevate the tech culture at NIT Hamirpur.
          </p>
        </div>

        {/* Nimbus Images */}
        <div className="relative min-h-screen mb-8 md:min-h-[140vh]">
          {nimbusImages.map((image, index) => (
            <div
              key={`nimbus-${index}`}
              className={`image-item fade-in absolute w-80 md:w-[500px] h-48 md:h-52 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 opacity-0 transform translate-y-12 scale-90 hover:scale-105 hover:-translate-y-3 hover:shadow-3xl ${
                index % 2 === 0 ? 'left-[5%]' : 'right-[5%]'
              } md:block hidden`}
              style={{ 
                top: `${10 + index * 110}px`,
                marginTop: '0'
              }}
              data-delay={image.delay}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
              />
            </div>
          ))}
          
          {/* Mobile Layout for Nimbus */}
          <div className="md:hidden flex flex-col items-center gap-5">
            {nimbusImages.map((image, index) => (
              <div
                key={`nimbus-mobile-${index}`}
                className="image-item fade-in w-80 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 opacity-0 transform translate-y-12 scale-90"
                data-delay={image.delay}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-title {
          background: #ca82ff;
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 6s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .fade-in {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .image-item.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .image-item:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Events;