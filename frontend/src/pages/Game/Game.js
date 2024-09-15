import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

const games = [
  {
    id: 1,
    name: 'Puzzle Master',
    description: 'Challenge your mind with intricate puzzles!',
    image: 'https://example.com/puzzle.jpg',
  },
  {
    id: 2,
    name: 'Trivia Challenge',
    description: 'Test your knowledge with fun trivia questions!',
    image: 'https://example.com/trivia.jpg',
  },
  {
    id: 3,
    name: 'Adventure Quest',
    description: 'Embark on thrilling adventures and quests!',
    image: 'https://example.com/adventure.jpg',
  },
  {
    id: 4,
    name: 'Memory Match',
    description: 'Enhance your memory with exciting matching games!',
    image: 'https://example.com/memory.jpg',
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
    <div className="min-h-screen bg-gradient-to-r from-emerald-400 via-lime-300 to-green-200 px-6 py-20 relative overflow-hidden">
      {/* Animated background bubbles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-72 h-72 bg-purple-300 rounded-full absolute top-5 left-5 filter blur-xl opacity-20"
          animate={{ x: [0, 40, -40, 0], y: [0, -40, 40, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        />
        <motion.div
          className="w-56 h-56 bg-pink-300 rounded-full absolute bottom-5 right-5 filter blur-xl opacity-20"
          animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.header
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 mb-6 drop-shadow-2xl">
          Explore Fun Games
        </h1>
        <p className="text-lg text-gray-700">Discover exciting games to play and challenge yourself!</p>
      </motion.header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105"
            onClick={() => handleGameClick(game.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.img
              src={game.image}
              alt={game.name}
              className="w-full h-48 object-cover rounded-lg transition-opacity duration-300"
              whileHover={{ opacity: 0.85 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            />
            <motion.div className="relative z-10 mt-4 text-center">
              <h3 className="text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-yellow-500">
                {game.name}
              </h3>
              <p className="text-gray-600 mt-2 group-hover:text-gray-800 transition-colors duration-300">
                {game.description}
              </p>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-indigo-600 bg-opacity-80 text-white text-center rounded-full px-6 py-2 font-bold shadow-lg">
                Play Now
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default GamePage;
