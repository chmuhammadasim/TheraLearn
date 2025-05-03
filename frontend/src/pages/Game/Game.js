import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

const games = [
  {
    id: 1,
    link: "/numberguessinggame",
    name: 'Number Guessing Game',
    description: 'Guess the number and improve your counting skills!',
    image: 'https://jr.ibocchurch.org/wp-content/uploads/2018/06/math-games.png',
    ageRecommendation: 'Ages 7+',
  },
  {
    id: 2,
    name: 'Better Aim',
    link: "/betteraim",
    description: 'Pop the balloons and improve your aiming skills!',
    image: 'https://www.quiz4y.com/assets/images/balloon-pop.jpg',
    ageRecommendation: 'Ages 9+',
  },
  {
    id: 3,
    link: "/objectguessinggame",
    name: 'Object Guessing Game',
    description: 'Guess the object and improve your vocabulary!',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81FbxXJwZVL.png',
    ageRecommendation: 'Ages 8+',
  },
  {
    id: 4,
    link: "/handposedetector",
    name: 'Hand Pose Detector',
    description: 'Detect hand poses and learn about gestures!',
    image: 'https://th.bing.com/th/id/OIP.RdDbifQVJcsqF7ZDRNxk2wHaFn?rs=1&pid=ImgDetMain',
    ageRecommendation: 'Ages 10+',
  },
  {
    id: 5,
    link: "/emotiondetection",
    name: 'Emotion Detection',
    description: 'Detect emotions and learn about feelings!',
    image: 'https://th.bing.com/th/id/OIP.9r0v1X2a3bqk4g7x6c8m1wHaE8?pid=ImgDet&rs=1',
    ageRecommendation: 'Ages 10+',
  },
];

function GamePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = games.filter((game) => {
      const matchesQuery = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAge = selectedAge ? game.ageRecommendation.includes(selectedAge) : true;
      return matchesQuery && matchesAge;
    });
    setFilteredGames(filtered);
  }, [searchQuery, selectedAge]);

  const handleGameClick = (link) => {
    window.location.href = link;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF057C] via-[#8D0B93] to-[#321575] px-6 py-20 relative overflow-hidden">
      {/* Background Effects */}
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

      {/* Header */}
      <motion.header
        className="text-center mb-2 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="p-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-6xl font-extrabold text-white mb-4 rounded-xl shadow-lg transform hover:skew-y-6 transition-all duration-500">
          🎮 Explore Fun Games 🎮
        </h1>
        <p className="text-xl mb-4 text-white font-medium">
          Play, Learn, and Challenge Yourself with Fun and Educational Games!
        </p>
      </motion.header>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 relative z-10">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-4 rounded-lg shadow-md focus:outline-none text-gray-700"
        />
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="w-full md:w-1/3 p-4 rounded-lg shadow-md text-gray-700"
        >
          <option value="">Filter by Age</option>
          <option value="7+">Ages 7+</option>
          <option value="8+">Ages 8+</option>
          <option value="9+">Ages 9+</option>
          <option value="10+">Ages 10+</option>
        </select>
      </div>

      {/* Game Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 relative z-10">
        {filteredGames.map((game) => (
          <motion.div
            key={game.id}
            className="group relative bg-gradient-to-bl from-[#f9d423] to-[#ff8863] p-6 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:ring-4 ring-pink-300 ring-offset-4"
            onClick={() => handleGameClick(game.link)}
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
            <motion.div className="relative z-10 mt-2 text-center">
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-yellow-200">
                {game.name}
              </h3>
              <p className="text-white mt-2 text-lg group-hover:text-yellow-100 transition-colors duration-300">
                {game.description}
              </p>
              <p className="text-black mt-1 text-lg group-hover:text-yellow-200">
                {game.ageRecommendation}
              </p>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-indigo-600 text-white text-center rounded-full px-6 py-3 font-bold shadow-xl hover:shadow-2xl transition-all duration-300">
                Play Now
              </div>
            </motion.div>
          </motion.div>
        ))}
        {filteredGames.length === 0 && (
          <p className="text-center text-white col-span-full">
            No games match your search or filter criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default GamePage;
