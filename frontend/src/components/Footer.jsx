import React from 'react';

const Footer = () => {
  return (
    <>
      {/* Custom styles for animations and gradients */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .float-delay-2 {
          animation-delay: 2s;
        }
        
        .float-delay-4 {
          animation-delay: 4s;
        }
        
        .footer-bg-gradient {
          background: linear-gradient(135deg, #0f0823 0%, #1a0d33 50%, #140b29 100%);
        }
        
        .footer-link {
          position: relative;
          padding-left: 0;
          transition: all 0.3s ease;
        }
        
        .footer-link::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 1px;
          background: #6366f1;
          transition: width 0.3s ease;
        }
        
        .footer-link:hover::before {
          width: 4px;
        }
        
        .footer-link:hover {
          padding-left: 8px;
        }
        
        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 1px;
        }
        
        @media (max-width: 480px) {
          .footer-heading::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>

      <footer className="footer-bg-gradient relative overflow-hidden mt-16">
        
        <div className="max-w-6xl mx-auto px-5 pt-16 relative z-20 md:pt-20">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 lg:gap-16">
            {/* Footer Brand */}
            <div className="flex flex-col gap-5 text-center lg:text-left">
              <h2 
                className="text-4xl font-extrabold text-indigo-400 m-0"
                style={{ textShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
              >
                AppTeam
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
                Building tomorrow's digital experiences today
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                {/* Website Icon */}
                <a 
                  href="/" 
                  className="flex items-center justify-center w-11 h-11 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-gray-400 transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-indigo-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2.2c5.394 0 9.8 4.406 9.8 9.8s-4.406 9.8-9.8 9.8-9.8-4.406-9.8-9.8 4.406-9.8 9.8-9.8zm0 4.4c-3.087 0-5.6 2.513-5.6 5.6s2.513 5.6 5.6 5.6 5.6-2.513 5.6-5.6-2.513-5.6-5.6-5.6zm0 2.2c1.87 0 3.4 1.53 3.4 3.4s-1.53 3.4-3.4 3.4-3.4-1.53-3.4-3.4 1.53-3.4 3.4-3.4z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/appteam-nith/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-gray-400 transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-indigo-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/appteam_nith/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-gray-400 transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-indigo-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.061 1.278.263 2.148.567 2.913.306.789.717 1.459 1.384 2.126s1.337 1.079 2.126 1.384c.765.295 1.635.497 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.278-.061 2.148-.263 2.913-.567.789-.306 1.459-.717 2.126-1.384s1.079-1.337 1.384-2.126c.295-.765.497-1.635.558-2.913.012-1.278.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.061-1.278-.263-2.148-.567-2.913-.306-.789-.717-1.459-1.384-2.126S20.65 1.079 19.86 0.772c-.765-.295-1.635-.497-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.2 0 3.583.012 4.85.07 1.17.055 1.834.249 2.227.4.597.23 1.05.545 1.432.928.382.383.698.834.928 1.432.15.393.345 1.057.4 2.227.058 1.267.07 1.65.07 4.85s-.012 3.583-.07 4.85c-.055 1.17-.249 1.834-.4 2.227-.23.597-.545 1.05-.928 1.432-.383.382-.834.698-1.432.928-.393.15-1.057.345-2.227.4-1.267.058-1.65.07-4.85.07s-3.583-.012-4.85-.07c-1.17-.055-1.834-.249-2.227-.4-.597-.23-1.05-.545-1.432-.928-.382-.383-.698-.834-.928-1.432-.15-.393-.345-1.057-.4-2.227-.058-1.267-.07-1.65-.07-4.85s.012-3.583.07-4.85c.055-1.17.249-1.834.4-2.227.23-.597.545-1.05.928-1.432.383-.382.834-.698 1.432-.928.393-.15 1.057-.345 2.227-.4 1.267-.058 1.65-.07 4.85-.07zm0 3.673c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.16c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.47-.988c-.689 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-2">
              {/* Quick Links */}
              <div className="text-center sm:text-left">
                <h3 className="footer-heading text-gray-100 text-lg font-semibold mb-5 relative">
                  Quick Links
                </h3>
                <ul className="list-none flex flex-col gap-3">
                  {[
                    { href: '/member', text: 'Our Team' },
                    { href: '/aboutUs', text: 'About Us' },
                    { href: '/events', text: 'Events' },
                    { href: '/projects', text: 'Projects' },
                    { href: '/contactUs', text: 'Contact Us' }
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="footer-link text-gray-400 no-underline text-sm hover:text-indigo-400"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Events */}
              <div className="text-center sm:text-left">
                <h3 className="footer-heading text-gray-100 text-lg font-semibold mb-5 relative">
                  Events
                </h3>
                <ul className="list-none flex flex-col gap-3">
                  <li>
                    <a href="#nimbus" className="footer-link text-gray-400 no-underline text-sm hover:text-indigo-400">
                      Nimbus 2k24
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link text-gray-400 no-underline text-sm hover:text-indigo-400">
                      Hackathons
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="text-center sm:text-left">
                <h3 className="footer-heading text-gray-100 text-lg font-semibold mb-5 relative">
                  Contact
                </h3>
                <ul className="list-none flex flex-col gap-3">
                  <li>
                    <a href="#" className="footer-link text-gray-400 no-underline text-sm hover:text-indigo-400">
                      hello@appteam.dev
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link text-gray-400 no-underline text-sm hover:text-indigo-400">
                      +91 9876547654
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.instagram.com/appteam_nith/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer-link text-gray-400 no-underline text-sm hover:text-indigo-400"
                    >
                      Follow us on Instagram
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/company/appteam-nith/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer-link text-gray-400 no-underline text-sm hover:text-indigo-400"
                    >
                      Follow us on LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-indigo-500/20 py-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
              <p className="text-gray-400 text-sm">
                &copy; 2025 AppTeam. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;