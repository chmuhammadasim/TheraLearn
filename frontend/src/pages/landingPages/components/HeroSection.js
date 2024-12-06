import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ title, subtitle, buttonText }) => {
  return (
    <section className="border-b-8 border-blue-600 bg-gradient-to-b from-[#330867] to-[#30cfd0] text-white py-20 md:py-28 px-6 md:px-12 min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background with a Smooth Glow Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-[-1] backdrop-blur-md"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1592194996307-3c1b4509d847?auto=format&fit=crop&w=1740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Floating Emojis */}
      {[
        {
          emoji: "🎉",
          xRange: [0, 20, -20, 0],
          yRange: [0, -30, 30, 0],
          rotateRange: [0, 360, 0],
          duration: 5,
        },
        {
          emoji: "🦄",
          xRange: [0, 10, -10, 0],
          yRange: [0, -40, 20, 0],
          rotateRange: [0, 180, 0],
          duration: 6,
        },
        {
          emoji: "🍭",
          xRange: [0, 30, -30, 0],
          yRange: [0, -20, 20, 0],
          rotateRange: [0, -360, 0],
          duration: 4,
        },
        {
          emoji: "🌈",
          xRange: [0, 40, -40, 0],
          yRange: [0, -25, 25, 0],
          rotateRange: [0, 360, 0],
          duration: 5.5,
        },
        {
          emoji: "🎂",
          xRange: [0, 25, -25, 0],
          yRange: [0, -35, 35, 0],
          rotateRange: [0, 360, 0],
          duration: 5,
        },
      ].map((item, index) => (
        <FloatingEmoji key={index} {...item} />
      ))}

      {/* Confetti Rain */}
      {/* {Array.from({ length: 40 }).map((_, index) => (
        <Confetti key={index} />
      ))} */}

      {/* Main Content */}
      <div className="text-center z-10">
        <motion.h1
          className="bg-black bg-opacity-30 p-8 md:p-12 rounded-2xl text-5xl md:text-7xl font-extrabold mb-6 tracking-wider leading-tight shadow-lg transition-transform hover:scale-105"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          🎈 {title} 🎉
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-10 font-light px-6 md:px-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {subtitle} 😊
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.a
          href="/games"
          className="bg-gradient-to-r from-[#89f7fe] to-[#66a6ff] text-white px-8 py-4 rounded-full text-xl font-semibold shadow-xl hover:shadow-[0_0_40px_#ff6ec7] transition-transform hover:scale-110"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.5, rotate: [0, 15, -15, 0] }}
          transition={{ duration: 0.4 }}
        >
          🚀 {buttonText} 🚀
        </motion.a>
      </div>

      {/* Floating Colorful Shapes */}
      <FloatingShape size="w-32 h-32" color="#fbe7c6" />
      <FloatingShape size="w-44 h-44" color="#9fc1ff" rotate />
      <FloatingShape size="w-52 h-52" color="#ffdbac" />

      {/* Starburst Effect */}
      <Starburst />
    </section>
  );
};

/* Floating Emoji Component */
const FloatingEmoji = ({ emoji, xRange, yRange, rotateRange, duration }) => (
  <motion.div
    className="absolute text-6xl"
    animate={{
      x: xRange,
      y: yRange,
      rotate: rotateRange,
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    style={{
      top: `${Math.random() * 85}%`,
      left: `${Math.random() * 85}%`,
    }}
  >
    {emoji}
  </motion.div>
);

/* Confetti Component */
// const colors = [
//   "#FF5733",
//   "#33FF57",
//   "#3357FF",
//   "#FF33A1",
//   "#FFD633",
//   "#33FFF9",
//   "#FF3333",
//   "#A133FF",
// ];

// const Confetti = () => {
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];

//   return (
//     <motion.div
//       className="absolute w-2 h-2 rounded-full"
//       style={{
//         backgroundColor: randomColor,
//         top: `${Math.random() * 10}%`,
//         left: `${Math.random() * 100}%`,
//       }}
//       initial={{ y: -10 }}
//       animate={{ y: [0, 800], x: [0, Math.random() * 800 - 400] }}
//       transition={{
//         repeat: Infinity,
//         duration: Math.random() * 6 + 4,
//         ease: "linear",
//       }}
//     />
//   );
// };

/* Floating Shape Component */
const FloatingShape = ({ size, color, rotate = false }) => (
  <motion.div
    className={`absolute ${size} rounded-full opacity-30`}
    style={{
      backgroundColor: color,
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    }}
    animate={{
      y: [0, 25, 0],
      rotate: rotate ? [0, 360, 0] : 0,
    }}
    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
  />
);

/* Starburst Effect */
const Starburst = () => (
  <motion.div
    className="absolute bg-blue-300 w-12 h-12 rounded-full"
    animate={{
      scale: [1, 3, 1],
      opacity: [1, 0.5, 1],
    }}
    transition={{
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    }}
    style={{
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    }}
  />
);

export default HeroSection;
