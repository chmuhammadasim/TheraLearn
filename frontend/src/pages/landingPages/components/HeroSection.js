import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const HeroSection = ({ title, subtitle, buttonText }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section ref={ref} className="border-b-8 border-blue-600 bg-gradient-to-b from-[#330867] to-[#30cfd0] text-white py-20 md:py-28 px-6 md:px-12 min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Enhanced 3D Parallax Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-[-1] backdrop-blur-sm"
        initial={{ opacity: 0.4, scale: 1.1 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1592194996307-3c1b4509d847?auto=format&fit=crop&w=1740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      
      {/* Enhanced overlay with multiple gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#33086799] to-transparent z-[-1]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#33086755] via-transparent to-[#30cfd055] z-[-1]"></div>

      {/* Advanced particle system */}
      <EnhancedParticleBackground />

      {/* Glowing light orbs */}
      <GlowingOrbs />

      {/* More varied floating emojis with depth effect */}
      {[
        { emoji: "🎉", xRange: [0, 20, -20, 0], yRange: [0, -30, 30, 0], rotateRange: [0, 360, 0], duration: 5, size: "text-6xl", z: 1 },
        { emoji: "🦄", xRange: [0, 10, -10, 0], yRange: [0, -40, 20, 0], rotateRange: [0, 180, 0], duration: 6, size: "text-5xl", z: 3 },
        { emoji: "🍭", xRange: [0, 30, -30, 0], yRange: [0, -20, 20, 0], rotateRange: [0, -360, 0], duration: 4, size: "text-4xl", z: 2 },
        { emoji: "🌈", xRange: [0, 40, -40, 0], yRange: [0, -25, 25, 0], rotateRange: [0, 360, 0], duration: 5.5, size: "text-7xl", z: 1 },
        { emoji: "🎂", xRange: [0, 25, -25, 0], yRange: [0, -35, 35, 0], rotateRange: [0, 360, 0], duration: 5, size: "text-5xl", z: 2 },
        { emoji: "✨", xRange: [0, 15, -15, 0], yRange: [0, -25, 25, 0], rotateRange: [0, 180, 0], duration: 4.5, size: "text-6xl", z: 3 },
        { emoji: "🎊", xRange: [0, 35, -35, 0], yRange: [0, -30, 30, 0], rotateRange: [0, -270, 0], duration: 5.8, size: "text-5xl", z: 1 },
      ].map((item, index) => (
        <FloatingEmoji key={index} {...item} />
      ))}

      <motion.div 
        className="text-center z-10 backdrop-blur-md bg-black/30 p-8 rounded-3xl max-w-4xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-50"
          style={{ background: "radial-gradient(circle at center, rgba(137, 247, 254, 0.2), transparent 70%)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.h1
          className="bg-gradient-to-r from-[#89f7fe] to-[#66a6ff] text-transparent bg-clip-text p-8 md:p-12 rounded-2xl text-5xl md:text-7xl font-extrabold mb-6 tracking-wider leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative">
            <span className="absolute top-0 left-0 w-full h-full blur-md opacity-60 text-blue-300">🎈 {title} 🎉</span>
            🎈 {title} 🎉
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-10 font-light px-6 md:px-16 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {subtitle} <motion.span 
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block"
          >😊</motion.span>
        </motion.p>

        {/* Enhanced 3D Button with neon effect */}
        <motion.div
          className="relative inline-block"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.span 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 blur-xl opacity-70"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.a
            href="/games"
            className="relative inline-block bg-gradient-to-r from-[#89f7fe] to-[#66a6ff] text-white px-10 py-5 rounded-full text-xl font-bold shadow-[0_0_15px_rgba(102,166,255,0.5)] transition-all border border-white/30"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 0 30px rgba(102,166,255,0.8)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="absolute inset-0 rounded-full bg-white/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center justify-center">
              <motion.span 
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                🚀
              </motion.span> 
              {buttonText} 
              <motion.span 
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="ml-2"
              >
                🚀
              </motion.span>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Shapes with 3D effects */}
      <FloatingShape size="w-40 h-40" color="rgba(251, 231, 198, 0.4)" blur depth={2} />
      <FloatingShape size="w-52 h-52" color="rgba(159, 193, 255, 0.4)" rotate blur depth={1} />
      <FloatingShape size="w-64 h-64" color="rgba(255, 219, 172, 0.4)" blur depth={3} />
      <FloatingShape size="w-32 h-32" color="rgba(255, 145, 232, 0.4)" rotate blur depth={2} />
      
      {/* Multiple dynamic starbursts */}
      {[...Array(5)].map((_, i) => (
        <Starburst key={i} />
      ))}
    </section>
  );
};

/* Enhanced Floating Emoji Component with depth effect */
const FloatingEmoji = ({ emoji, xRange, yRange, rotateRange, duration, size = "text-6xl", z = 1 }) => (
  <motion.div
    className={`absolute ${size} filter drop-shadow-lg`}
    animate={{
      x: xRange,
      y: yRange,
      rotate: rotateRange,
      scale: [1, 1.2, 0.9, 1],
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut",
      scale: {
        duration: duration * 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    style={{
      top: `${Math.random() * 85}%`,
      left: `${Math.random() * 85}%`,
      zIndex: z,
      filter: `blur(${(3-z) * 0.5}px)`, // Creates depth perception
      opacity: 0.7 + (z * 0.1),
    }}
  >
    {emoji}
  </motion.div>
);

/* Enhanced Floating Shape Component with 3D perspective */
const FloatingShape = ({ size, color, rotate = false, blur = false, depth = 1 }) => (
  <motion.div
    className={`absolute ${size} rounded-full opacity-30 ${blur ? 'backdrop-blur-md' : ''}`}
    style={{
      backgroundColor: color,
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      filter: blur ? `blur(${8/depth}px)` : 'none',
      zIndex: -depth,
      transformStyle: "preserve-3d",
      perspective: "1000px"
    }}
    animate={{
      y: [0, 25, -15, 0],
      x: [0, 15, -10, 0],
      rotateX: rotate ? [0, 20, 0] : 0,
      rotateY: rotate ? [0, 15, 0] : 0,
      rotateZ: rotate ? [0, 360, 0] : 0,
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
  />
);

/* Enhanced Starburst Effect with glow */
const Starburst = () => (
  <motion.div
    className="absolute rounded-full backdrop-blur-sm overflow-hidden"
    animate={{
      scale: [1, 4, 1],
      opacity: [0.8, 0.2, 0.8],
    }}
    transition={{
      repeat: Infinity,
      duration: Math.random() * 2 + 2,
      ease: "easeInOut",
      delay: Math.random() * 3,
    }}
    style={{
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      width: `${Math.random() * 10 + 10}px`,
      height: `${Math.random() * 10 + 10}px`,
      background: `radial-gradient(circle at center, 
        rgba(137,247,254,1) 0%, 
        rgba(102,166,255,0.8) 50%, 
        rgba(0,0,0,0) 100%)`,
      boxShadow: "0 0 15px rgba(137,247,254,0.6)"
    }}
  />
);

/* Enhanced Particle Background with varying sizes and speeds */
const EnhancedParticleBackground = () => (
  <div className="absolute inset-0 z-0">
    {[...Array(40)].map((_, i) => {
      const size = Math.random() * 3 + 1;
      return (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
            boxShadow: size > 2 ? "0 0 4px rgba(255,255,255,0.8)" : "none"
          }}
          animate={{
            y: [0, -(Math.random() * 100 + 50)],
            x: [0, (Math.random() * 40 - 20)],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 4 + 3,
            ease: "easeOut",
            delay: Math.random() * 5,
          }}
        />
      );
    })}
  </div>
);

/* New Glowing Orbs component */
const GlowingOrbs = () => (
  <>
    {[...Array(6)].map((_, i) => {
      const size = Math.random() * 60 + 40;
      return (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-40"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            background: `radial-gradient(circle at center, 
              rgba(255,255,255,0.8) 0%, 
              rgba(137,247,254,0.4) 40%, 
              rgba(0,0,0,0) 70%)`,
            filter: "blur(5px)"
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      );
    })}
  </>
);

export default HeroSection;
