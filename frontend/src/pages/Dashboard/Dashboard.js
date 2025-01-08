import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getUserData } from '../../services/userService';
import { getUserGames } from '../../services/gameService';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from 'framer-motion';
import { FaUser, FaGamepad } from 'react-icons/fa';

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
        console.error('Failed to fetch data:', error);
        setError('There was an issue retrieving data. Please try again later.');
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

  // Group sessions by gameName
  const groupedGames = userGames.reduce((acc, game) => {
    game.sessions.forEach(session => {
      if (!acc[session.gameName]) {
        acc[session.gameName] = [];
      }
      acc[session.gameName].push(session);
    });
    return acc;
  }, {});

  const getGameScoreData = (sessions) => {
    const labels = sessions.map((session) => new Date(session.datePlayed).toLocaleDateString());
    const scores = sessions.map((session) => session.score);
    const highestScore = Math.max(...scores);
    const averageScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;

    return {
      labels,
      datasets: [
        {
          label: 'Scores Over Time',
          data: scores,
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,0.4)',
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: 'rgba(75,192,192,1)',
          pointBorderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Highest Score',
          data: new Array(scores.length).fill(highestScore),
          fill: false,
          backgroundColor: 'rgba(255,99,132,1)',
          borderColor: 'rgba(255,99,132,0.4)',
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: 'Average Score',
          data: new Array(scores.length).fill(averageScore),
          fill: false,
          backgroundColor: 'rgba(54,162,235,1)',
          borderColor: 'rgba(54,162,235,0.4)',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };
  };

  const getGameBarData = (sessions) => {
    const highestScore = Math.max(...sessions.map(session => session.score));
    const currentScore = sessions[sessions.length - 1]?.score || 0;

    return {
      labels: ['Highest Score vs Current Score'],
      datasets: [
        {
          label: 'Highest Score',
          data: [highestScore],
          backgroundColor: 'rgba(255,99,132,0.6)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
        {
          label: 'Current Score',
          data: [currentScore],
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#ffeb3b',
        bodyColor: '#000',
        callbacks: {
          title: (tooltipItems) => {
            return `Score on ${tooltipItems[0].label}`;
          },
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        position: 'top',
        labels: {
          boxWidth: 5,
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          borderDash: [2, 2],
          color: '#bbb',
        },
      },
      y: {
        grid: {
          borderDash: [2, 2],
          color: '#bbb',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#1e3c72] to-[#2a5298] p-10 pt-20 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl bg-white p-8 shadow-lg rounded-lg relative">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 flex items-center gap-2">
          <FaUser className="text-yellow-400" /> User Dashboard
        </h1>

        {/* User Information */}
        {userData && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">User Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-100 p-4 rounded-lg shadow-md">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>City:</strong> {userData.city || 'N/A'}</p>
              <p><strong>Country:</strong> {userData.country || 'N/A'}</p>
              <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
              <p><strong>Contact:</strong> {userData.contact || 'N/A'}</p>
            </div>
          </div>
        )}

        
          {Object.keys(groupedGames).length > 0 && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                <FaGamepad className="text-yellow-500" /> Games Played
              </h2>
              {Object.entries(groupedGames).map(([gameName, sessions]) => (
                <div key={gameName} className="mb-8">
            <h3 className="text-2xl font-bold text-gray-700">{gameName}</h3>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
              <h4 className="text-xl font-semibold text-gray-700 mb-4">Score Improvement Over Time</h4>
              <div className="w-full md:w-1/2 mx-auto">
                <Line data={getGameScoreData(sessions)} options={chartOptions} />
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
              <h4 className="text-xl font-semibold text-gray-700 mb-4">Highest vs Current Score</h4>
              <div className="w-full md:w-1/2 mx-auto">
                <Bar data={getGameBarData(sessions)} options={chartOptions} />
              </div>
            </div>

            {/* Game Statistics */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4">Detailed Results for {gameName}</h4>
                  <p><strong>Highest Score:</strong> {Math.max(...sessions.map(session => session.score))}</p>
                  <p><strong>Current Score:</strong> {sessions[sessions.length - 1]?.score || 0}</p>
                  <p><strong>Total Sessions Played:</strong> {sessions.length}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
