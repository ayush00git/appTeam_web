"use client";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();
  return (
    
    <>
      {/* Hero Section */}
      <section className="h-[80vh] flex items-center justify-center relative px-8 overflow-hidden">
        <div className="text-center max-w-4xl mx-auto">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="gasoek-font font-normal text-[#a594f9] leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
          >
            APP<br />TEAM
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#a594f9] text-xl md:text-2xl font-light mb-2 opacity-90"
          >
            Innovating Tomorrow&apos;s Technology Today
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;re a passionate team of developers, designers, and innovators crafting cutting-edge solutions across multiple technology domains
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button className="bg-[#a594f9] border-2 border-[#140b29] text-[#140b29] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#140b29] hover:text-[#a594f9] hover:border-[#a594f9] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigate('/projects')}>
              Explore Our Work
            </button>
            <button className="border-2 border-[#a594f9] text-[#a594f9] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#a594f9] hover:text-[#140b29] transform hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/member')}>
              Join Our Team
            </button>
          </motion.div>
        </div>

        {/* Floating Elements with motion */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-[#a594f9] opacity-20 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>

        <motion.div
          className="absolute top-40 right-16 w-12 h-12 bg-[#a594f9] opacity-10 rotate-45"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.div>

        <motion.div
          className="absolute bottom-32 left-20 w-16 h-16 border-2 border-[#a594f9] opacity-15 rotate-12"
          animate={{ rotate: [12, -12, 12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute bottom-20 right-24 w-8 h-8 bg-[#a594f9] opacity-20 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        ></motion.div>
      </section>
    </>
  );
}

export default HeroSection;
