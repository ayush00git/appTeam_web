import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const navigate = useNavigate();

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

  const faqData = [
    {
      id: 1,
      question: "How can I join the APP Team?",
      answer: "You can join by filling out the recruitment form we share at the start of each semester. Keep an eye on our social media channels and official college announcements for recruitment notifications. We typically conduct interviews and technical assessments to evaluate candidates."
    },
    {
      id: 2,
      question: "Do I need any prior experience to join?",
      answer: "No prior experience is mandatory! We welcome beginners who are eager to learn. However, basic knowledge of programming concepts and enthusiasm for technology will be beneficial. We provide training and mentorship to help you grow."
    },
    {
      id: 3,
      question: "What kind of projects do you work on?",
      answer: "We develop mobile applications for college festivals like Nimbus and Hillfair, create websites for various college events, organize the annual Hack on Hills hackathon, and work on innovative tech solutions. Our projects span web development, mobile apps, and more."
    },
    {
      id: 4,
      question: "Can first-year students join the team?",
      answer: "Absolutely! First-year students are encouraged to join and explore different domains. It's a great opportunity to start your tech journey early and learn from senior team members. We believe in nurturing talent from the ground up."
    },
    {
      id: 5,
      question: "What programming languages should I know?",
      answer: "The required languages depend on your domain of interest. For web development: JavaScript, HTML, CSS. For mobile apps: Java/Kotlin (Android), Swift (iOS), or React Native/Flutter. For AI/ML: Python. However, willingness to learn is more important than knowing everything beforehand."
    },
    {
      id: 6,
      question: "How much time commitment is expected?",
      answer: "We expect active participation in team meetings, project work, and events. Typically, members spend 10-12 hours per week on team activities, but this can vary during project deadlines or major events like Hack on Hills. We value quality contribution over just time spent."
    }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <React.Fragment>
      <style jsx>{`
        body {
          font-family: 'Ubuntu', sans-serif;
        }
        
        .gasoek-font {
          font-family: 'Gasoek One', sans-serif;
        }
        
        .faq-item {
          border-bottom: 1px solid rgba(165, 148, 249, 0.2);
        }
        
        .faq-item:last-child {
          border-bottom: none;
        }
        
        .answer-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, padding 0.3s ease-out;
        }
        
        .answer-content.open {
          max-height: 200px;
          padding-top: 1rem;
          padding-bottom: 1.5rem;
        }
        
        .chevron {
          transition: transform 0.3s ease;
        }
        
        .chevron.rotate {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="bg-[#140b29] min-h-screen py-20 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 
              className="gasoek-font font-normal text-[#a594f9] mb-4 tracking-wide"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to know about joining and being part of the APP Team
            </p>
          </div>

          {/* FAQ List */}
          <div className="border-2 border-purple-200 rounded-2xl shadow-2xl p-8">
            {faqData.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full py-6 flex justify-between items-start text-left focus:outline-none group"
                >
                  <h3 className="text-xl font-semibold text-white pr-8 group-hover:text-purple-100 transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`chevron flex-shrink-0 ${openQuestion === faq.id ? 'rotate' : ''}`}>
                    <svg 
                      className="w-6 h-6 text-purple-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </div>
                </button>
                
                <div className={`answer-content ${openQuestion === faq.id ? 'open' : ''}`}>
                  <p className="text-gray-300 text-base leading-relaxed pl-0">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="text-center mt-12">
            <p className="text-purple-200 text-lg mb-4">
              Still have questions?
            </p>
            <button className="bg-[#a594f9] hover:bg-[rgb(147,129,236)] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            onClick={() => navigate('/contactUs')}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FAQ;