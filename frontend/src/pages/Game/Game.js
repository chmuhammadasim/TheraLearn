import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100 px-6 py-20">
      <header className="text-center py-8 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Choose Your Game</h1>
        <p className="text-xl text-gray-700 animate-pulse">Click on a game to start playing!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {games.map((game) => (
          <div
            key={game.id}
            className="group relative bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleGameClick(game.id)}
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-64 object-cover rounded-lg group-hover:opacity-75 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative z-10 mt-4 text-center">
              <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">{game.name}</h3>
              <p className="text-gray-300 mt-2 group-hover:text-white transition-colors duration-300">{game.description}</p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-50 text-white text-center rounded-full px-6 py-3 font-bold animate-bounce">
                Start Game
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
          </div>
        ))}
      </div>

      <footer className="text-center py-8 mt-12 text-gray-700">
        <p>&copy; 2024 TheraLearn. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default GamePage;
