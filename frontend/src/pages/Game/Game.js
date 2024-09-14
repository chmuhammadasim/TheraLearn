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
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-green-200 to-green-300 px-6 py-20 relative">
      {/* Animated background bubbles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-64 h-64 bg-purple-500 rounded-full absolute top-10 left-20 filter blur-xl opacity-20"
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        />
        <motion.div
          className="w-48 h-48 bg-pink-500 rounded-full absolute bottom-10 right-20 filter blur-xl opacity-20"
          animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.header
        className="text-center py-8 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-6xl font-extrabold text-indigo-900 mb-6 drop-shadow-lg">
          Choose Your Game
        </h1>
        <motion.p
          className="text-2xl text-gray-700"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          Click on a game to start playing!
        </motion.p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 relative z-10">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className="group relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden"
            onClick={() => handleGameClick(game.id)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.img
              src={game.image}
              alt={game.name}
              className="w-full h-64 object-cover rounded-lg transition-opacity duration-300"
              whileHover={{ opacity: 0.8 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-300"
            ></motion.div>
            <motion.div className="relative z-10 mt-4 text-center">
              <h3 className="text-3xl font-bold text-white transition-colors duration-300 group-hover:text-yellow-400">
                {game.name}
              </h3>
              <p className="text-gray-300 mt-2 group-hover:text-white transition-colors duration-300">
                {game.description}
              </p>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-indigo-700 bg-opacity-80 text-white text-center rounded-full px-8 py-3 font-bold animate-bounce">
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
