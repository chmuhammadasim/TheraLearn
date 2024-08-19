import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getUserData, getUserGames } from '../../services/userService';

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h1>

        {userData && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700">User Information</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Full Name:</strong> {userData.firstName} {userData.lastName}</p>
            <p><strong>Address:</strong> {userData.address}, {userData.city}, {userData.country}</p>
            <p><strong>Contact:</strong> {userData.contact}</p>
            <p><strong>Bio:</strong> {userData.bio}</p>
            <p><strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Games Played</h2>
          {userGames.length > 0 ? (
            <ul className="list-disc list-inside">
              {userGames.map((game) => (
                <li key={game.id} className="mb-2">
                  <p><strong>Game Name:</strong> {game.name}</p>
                  <p><strong>Score:</strong> {game.score}</p>
                  <p><strong>Date Played:</strong> {new Date(game.datePlayed).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No games played yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
