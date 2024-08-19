import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getUserData } from '../../services/userService';
import { getUserGames } from '../../services/gameService';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userGames, setUserGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user, games] = await Promise.all([getUserData(), getUserGames()]);
        setUserData(user);
        setUserGames(games);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("There was an issue retrieving data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
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
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const gameData = {
    labels: userGames.length > 0 ? userGames.map(game => new Date(game.datePlayed).toLocaleDateString()) : [],
    datasets: [
      {
        label: 'Game Scores Over Time',
        data: userGames.length > 0 ? userGames.map(game => game.score) : [],
        fill: true,
        backgroundColor: 'rgba(252, 58, 82, 0.2)',
        borderColor: '#fc3a52',
        pointBackgroundColor: '#0e2431',
        pointBorderColor: '#fc3a52',
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
          color: '#0e2431',
        },
      },
      tooltip: {
        backgroundColor: '#fc3a52',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#0e2431',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#0e2431',
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
          color: '#e8e8e8',
        },
        ticks: {
          color: '#0e2431',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>

        {userData ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><strong>Username:</strong> {userData.username || 'N/A'}</p>
              <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
              <p><strong>Full Name:</strong> {userData.firstName ? `${userData.firstName} ${userData.lastName}` : 'N/A'}</p>
              <p><strong>Address:</strong> {userData.address ? `${userData.address}, ${userData.city}, ${userData.country}` : 'N/A'}</p>
              <p><strong>Contact:</strong> {userData.contact || 'N/A'}</p>
              <p><strong>Bio:</strong> {userData.bio || 'N/A'}</p>
              <p><strong>Date of Birth:</strong> {userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Games Played</h2>
          {userGames.length > 0 ? (
            <ul className="space-y-4">
              {userGames.map((game) => (
                <li key={game.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <p><strong>Game Name:</strong> {game.name || 'N/A'}</p>
                  <p><strong>Score:</strong> {game.score || 'N/A'}</p>
                  <p><strong>Date Played:</strong> {game.datePlayed ? new Date(game.datePlayed).toLocaleDateString() : 'N/A'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No games played yet.</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Game Score Trend</h2>
          {userGames.length > 0 ? (
            <Line data={gameData} options={chartOptions} className="rounded-lg shadow-md" />
          ) : (
            <p>No game data available to display chart.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
