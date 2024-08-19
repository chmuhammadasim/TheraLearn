import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getUserData } from '../../services/userService';
import { getUserGames } from '../../services/gameService' 
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [user, games] = await Promise.all([getUserData(), getUserGames()]);
        setUserData(user);
        setUserGames(games);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const gameData = {
    labels: userGames.length > 0 ? userGames.map(game => new Date(game.datePlayed).toLocaleDateString()) : [],
    datasets: [
      {
        label: 'Game Scores Over Time',
        data: userGames.length > 0 ? userGames.map(game => game.score) : [],
        fill: false,
        backgroundColor: '#fc3a52',
        borderColor: '#0e2431',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>

        {userData ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">User Information</h2>
            <p><strong>Username:</strong> {userData.username || 'N/A'}</p>
            <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
            <p><strong>Full Name:</strong> {userData.firstName ? `${userData.firstName} ${userData.lastName}` : 'N/A'}</p>
            <p><strong>Address:</strong> {userData.address ? `${userData.address}, ${userData.city}, ${userData.country}` : 'N/A'}</p>
            <p><strong>Contact:</strong> {userData.contact || 'N/A'}</p>
            <p><strong>Bio:</strong> {userData.bio || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">Games Played</h2>
          {userGames.length > 0 ? (
            <ul className="list-disc list-inside">
              {userGames.map((game) => (
                <li key={game.id} className="mb-4">
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
          <h2 className="text-2xl font-semibold text-gray-700">Game Score Trend</h2>
          {userGames.length > 0 ? (
            <Line data={gameData} />
          ) : (
            <p>No game data available to display chart.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
