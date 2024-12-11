import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getUserData } from '../../services/userService';
import { getUserGames } from '../../services/gameService';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from 'framer-motion';
import { FaStar, FaGamepad, FaTrophy } from 'react-icons/fa';

function Dashboard() {
  const [loading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  const [userGames, setUserGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user, games] = await Promise.all([getUserData(), getUserGames()]);
        setUserData(user.data);
        setUserGames(games.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("There was an issue retrieving data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-6">
        <div className="max-w-md bg-white p-6 shadow-lg rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const gameData = {
    labels: userGames.length > 0 ? userGames.map(game => new Date(game.sessions[0].datePlayed).toLocaleDateString()) : [],
    datasets: [
      {
        label: 'Game Scores Over Time',
        data: userGames.length > 0 ? userGames.map(game => game.overallResults.totalScore) : [],
        fill: true,
        backgroundColor: 'rgba(253, 184, 19, 0.2)',
        borderColor: '#FDB813',
        pointBackgroundColor: '#FF6347',
        pointBorderColor: '#FDB813',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#FF6347',
        },
      },
      tooltip: {
        backgroundColor: '#FDB813',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#FF6347',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          color: '#FF6347',
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
          color: '#FFD700',
        },
        ticks: {
          color: '#FF6347',
        },
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#8BC6EC] to-[#9599E2] p-10 pt-16 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-16 w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-40 rounded-lg"></div>
        <h1 className="text-4xl font-extrabold text-pink-600 mb-6 flex items-center gap-2 z-10 relative">
          <FaGamepad className="text-yellow-400" /> User Dashboard
        </h1>

        {userData ? (
          <motion.div
            className="mb-8 z-10 relative"
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-700 mb-4">User Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-pink-100 p-4 rounded-lg shadow-md">
              <p><strong>Username:</strong> {userData.username || 'N/A'}</p>
              <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
              <p><strong>First Name:</strong> {userData.firstName || 'N/A'}</p>
              <p><strong>Last Name:</strong> {userData.lastName || 'N/A'}</p>
              <p><strong>Contact:</strong> {userData.contact || 'N/A'}</p>
              <p><strong>City:</strong> {userData.city || 'N/A'}</p>
              <p><strong>Country:</strong> {userData.country || 'N/A'}</p>
              <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString() || 'N/A'}</p>
            </div>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-gray-600 z-10 relative"
          >
            No user data available.
          </motion.p>
        )}

        <motion.div
          className="mb-8 z-10 relative"
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <FaTrophy className="text-yellow-400" /> Games Played
          </h2>
          {userGames.length > 0 ? (
            <ul className="space-y-4">
              {userGames.map((game) => (
                <li key={game._id} className="p-4 bg-slate-300 rounded-lg shadow-sm flex items-center gap-4 transition-transform transform hover:scale-105">
                  <FaStar className="text-yellow-500" />
                  <div>
                    <p><strong>Game Name:</strong> {game.gameName || 'N/A'}</p>
                    <p><strong>Highest Score:</strong> {game.overallResults.highestScore || 'N/A'}</p>
                    <p><strong>Total Score:</strong> {game.overallResults.totalScore || 'N/A'}</p>
                    <p><strong>total Attempts:</strong> {game.overallResults.totalAttempts || 'N/A'}</p>
                      {game.sessions.map((sessions) => (
                        <li key={sessions._id} className="m-2 p-2 bg-yellow-100 rounded-lg shadow-sm flex items-center gap-4 transition-transform transform hover:scale-105">
                          <div className="text-gray-800">
                            <p><strong>Date Played:</strong> {new Date(sessions.datePlayed).toLocaleDateString() || 'N/A'}</p>
                            <p><strong>Score:</strong> {sessions.score || 'N/A'}</p>
                            <p><strong>Attempts:</strong> {sessions.attempts || 'N/A'}</p>
                          </div>
                        </li>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-600">No games played yet.</p>
          )}
        </motion.div>

        <motion.div
          className="mb-8 z-10 relative"
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Game Score Trends</h2>
          {userGames.length > 0 ? (
            <Line data={gameData} options={chartOptions} />
          ) : (
            <p>No game data available to display trends.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
