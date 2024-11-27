import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

const games = [
  {
    id: 1,
    name: 'Puzzle Master',
    description: 'Challenge your mind with intricate puzzles!',
    image: 'https://th.bing.com/th/id/R.b685cebf59d7d19516025b287efd5ec3?rik=tlqaJIb1SnaAsQ&pid=ImgRaw&r=0',
  },
  {
    id: 2,
    name: 'Trivia Challenge',
    description: 'Test your knowledge with fun trivia questions!',
    image: 'https://th.bing.com/th/id/R.b685cebf59d7d19516025b287efd5ec3?rik=tlqaJIb1SnaAsQ&pid=ImgRaw&r=0',
  },
  {
    id: 3,
    name: 'Adventure Quest',
    description: 'Embark on thrilling adventures and quests!',
    image: 'https://th.bing.com/th/id/R.b685cebf59d7d19516025b287efd5ec3?rik=tlqaJIb1SnaAsQ&pid=ImgRaw&r=0',
  },
  {
    id: 4,
    name: 'Memory Match',
    description: 'Enhance your memory with exciting matching games!',
    image: 'https://th.bing.com/th/id/R.b685cebf59d7d19516025b287efd5ec3?rik=tlqaJIb1SnaAsQ&pid=ImgRaw&r=0',
  },
  // Add more games here
];

function GamePage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-r from-[#FF057C] via-[#8D0B93] to-[#321575] px-6 py-20 relative overflow-hidden">
      {/* Dynamic Floating Stars and Bubbles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-80 h-80 bg-white rounded-full absolute top-10 left-10 filter blur-xl opacity-20"
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        />
        <motion.div
          className="w-72 h-72 bg-white rounded-full absolute bottom-10 right-10 filter blur-xl opacity-15"
          animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Header Section */}
      <motion.header
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="p-8 bg-gradient-to-r from-pink-500 to-yellow-500 text-7xl font-extrabold text-white mb-8 rounded-xl shadow-lg transform  hover:skew-y-6 transition-all duration-500">
          Explore Fun Games 🎮
        </h1>
        <p className="text-xl text-white font-medium mb-6">Play, Learn, and Challenge Yourself with Fun and Educational Games!</p>
      </motion.header>

      {/* Parallax Scrolling Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://example.com/space-background.jpg)' }}
        animate={{ backgroundPosition: ['0px 0px', '0px 50px', '0px 0px'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      />

      {/* Game Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 relative z-10">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className="group relative bg-gradient-to-bl from-[#f9d423] to-[#ff8863] p-6 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:ring-4 ring-pink-300 ring-offset-4"
            onClick={() => handleGameClick(game.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.img
              src={game.image}
              alt={game.name}
              className="w-full h-56 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-70"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            />
            <motion.div className="relative z-10 mt-4 text-center">
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-yellow-200">
                {game.name}
              </h3>
              <p className="text-white mt-2 text-lg group-hover:text-yellow-100 transition-colors duration-300">
                {game.description}
              </p>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-indigo-600 text-white text-center rounded-full px-6 py-3 font-bold shadow-lg">
                Play Now
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Easter Egg Animation (Floating Heart) */}
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        <motion.div className="w-16 h-16 bg-pink-500 rounded-full animate-pulse"></motion.div>
      </motion.div>

      {/* Interactive Hover Effects (Floating Bubbles) */}
      <motion.div
        className="absolute top-10 right-10 w-12 h-12 bg-blue-300 rounded-full animate-ping opacity-40"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1.5 }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-10 h-10 bg-yellow-400 rounded-full animate-ping opacity-30"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1.5 }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default GamePage;
