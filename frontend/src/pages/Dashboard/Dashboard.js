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
    console.log(userData);
    
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
      className="min-h-screen bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 p-10 pt-20 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-6xl bg-white p-8 shadow-2xl rounded-2xl relative ring ring-indigo-300 ring-offset-4">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 flex items-center gap-2 transition duration-300 hover:text-yellow-400">
          <FaUser className="text-yellow-400" /> User Dashboard
        </h1>

        {/* Parent Information */}
        {userData && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-4 border-b-4 border-blue-500 pb-2">
              Parent Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-blue-100 p-4 rounded-xl shadow-md">
              <p><strong>First Name:</strong> {userData.firstName}</p>
              <p><strong>Last Name:</strong> {userData.lastName}</p>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Role:</strong> {userData.role || 'N/A'}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>City:</strong> {userData.city || 'N/A'}</p>
              <p><strong>Country:</strong> {userData.country || 'N/A'}</p>
              <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
              <p><strong>Contact:</strong> {userData.contact || 'N/A'}</p>
              <p><strong>Address:</strong> {userData.address || 'N/A'}</p>
              <p><strong>Active:</strong> {userData.isActive ? 'Yes' : 'No'}</p>
              <p><strong>Emergency Authorization:</strong> {userData.emergencyAuthorization ? 'Yes' : 'No'}</p>
              <p><strong>Policy #:</strong> {userData.insurancePolicy?.policyNumber || 'N/A'}</p>
              <p><strong>Coverage:</strong> {userData.insurancePolicy?.coverageDetails || 'N/A'}</p>
              <p><strong>Policy Valid Until:</strong> {userData.insurancePolicy?.validUntil ?
                new Date(userData.insurancePolicy.validUntil).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        )}

        {userData?.children && userData.children.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-4 border-b-4 border-green-500 pb-2">
              Children
            </h2>
            <div className="space-y-4 ">
              {userData.children.map((child) => (
                <div key={child._id} className="bg-blue-50 p-4 grid grid-cols-1 md:grid-cols-3 rounded-xl shadow-md space-y-2 hover:bg-blue-100 transition">
                  <p><strong>Name:</strong> {child.firstName} {child.lastName}</p>
                  <p><strong>Role:</strong> {child.role}</p>
                  <p><strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {child.gender}</p>
                  <p><strong>Blood Type:</strong> {child.bloodType || 'N/A'}</p>
                  <p><strong>Medical Conditions:</strong> {child.medicalConditions?.join(', ') || 'N/A'}</p>
                  <p><strong>Allergies:</strong> {child.allergies?.join(', ') || 'N/A'}</p>
                  <p><strong>Medications:</strong> {child.medications?.join(', ') || 'N/A'}</p>
                  {child.doctorNotes && child.doctorNotes.length > 0 && (
                    <div>
                      <strong>Doctor Notes:</strong>
                      <ul className="list-disc pl-5">
                        {child.doctorNotes.map((note, idx) => (
                          <li key={idx}>
                            Date: {new Date(note.date).toLocaleDateString()} | Notes: {note.notes || 'N/A'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p><strong>Genetic Disorders:</strong> {child.geneticDisorders?.join(', ') || 'N/A'}</p>
                  <p><strong>Family Medical History:</strong> {child.familyMedicalHistory?.join(', ') || 'N/A'}</p>
                  <p><strong>Height:</strong> {child.height || 'N/A'}</p>
                  <p><strong>Weight:</strong> {child.weight || 'N/A'}</p>
                  <p><strong>BMI:</strong> {child.bmi || 'N/A'}</p>
                  {child.mentalHealthNotes && child.mentalHealthNotes.length > 0 && (
                    <div>
                      <strong>Mental Health Notes:</strong>
                      <ul className="list-disc pl-5">
                        {child.mentalHealthNotes.map((mhNote, idx) => (
                          <li key={idx}>
                            Date: {new Date(mhNote.date).toLocaleDateString()} | Notes: {mhNote.notes || 'N/A'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {child.hospitalVisits && child.hospitalVisits.length > 0 && (
                    <div>
                      <strong>Hospital Visits:</strong>
                      <ul className="list-disc pl-5">
                        {child.hospitalVisits.map((visit, idx) => (
                          <li key={idx}>
                            Date: {new Date(visit.date).toLocaleDateString()} | Reason: {visit.reason || 'N/A'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {child.labTests && child.labTests.length > 0 && (
                    <div>
                      <strong>Lab Tests:</strong>
                      <ul className="list-disc pl-5">
                        {child.labTests.map((test, idx) => (
                          <li key={idx}>
                            Date: {new Date(test.date).toLocaleDateString()} | Test: {test.testName} | Result: {test.result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {child.emergencyContact && (
                    <p>
                      <strong>Emergency Contact:</strong> {child.emergencyContact.name} (Relationship: {child.emergencyContact.relationship}, Phone: {child.emergencyContact.phone})
                    </p>
                  )}
                  <p><strong>School:</strong> {child.school || 'N/A'}</p>
                  <p><strong>Grade:</strong> {child.grade || 'N/A'}</p>
                  {child.behavioralIssues?.length > 0 && (
                    <p><strong>Behavioral Issues:</strong> {child.behavioralIssues.join(', ')}</p>
                  )}
                  {child.developmentalMilestones?.length > 0 && (
                    <p><strong>Developmental Milestones:</strong> {child.developmentalMilestones.join(', ')}</p>
                  )}
                  {child.dietRestrictions?.length > 0 && (
                    <p><strong>Diet Restrictions:</strong> {child.dietRestrictions.join(', ')}</p>
                  )}
                  {child.activityPreferences?.length > 0 && (
                    <p><strong>Activity Preferences:</strong> {child.activityPreferences.join(', ')}</p>
                  )}
                  {child.hobbies?.length > 0 && (
                    <p><strong>Hobbies:</strong> {child.hobbies.join(', ')}</p>
                  )}
                  {child.favoriteSubjects?.length > 0 && (
                    <p><strong>Favorite Subjects:</strong> {child.favoriteSubjects.join(', ')}</p>
                  )}
                  {child.extracurricularActivities?.length > 0 && (
                    <p><strong>Extracurricular Activities:</strong> {child.extracurricularActivities.join(', ')}</p>
                  )}
                  {child.languageSpoken?.length > 0 && (
                    <p><strong>Languages Spoken:</strong> {child.languageSpoken.join(', ')}</p>
                  )}
                  <p><strong>Special Needs:</strong> {child.specialNeeds || 'N/A'}</p>
                  {child.sleepSchedule && (
                    <p><strong>Sleep Schedule:</strong> Bedtime: {child.sleepSchedule.bedtime || 'N/A'}, Wake Up: {child.sleepSchedule.wakeUpTime || 'N/A'}</p>
                  )}
                  {child.parentalConcerns?.length > 0 && (
                    <p><strong>Parental Concerns:</strong> {child.parentalConcerns.join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(groupedGames).length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-4 flex items-center gap-2 border-b-4 border-yellow-500 pb-2">
              <FaGamepad className="text-yellow-500" /> Games Played
            </h2>
            {Object.entries(groupedGames).map(([gameName, sessions]) => (
              <div key={gameName} className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 underline">{gameName}</h3>

                <div className="bg-gray-100 p-4 rounded-xl shadow-lg mb-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4">Score Improvement Over Time</h4>
                  <div className="w-full md:w-1/2 mx-auto">
                    <Line data={getGameScoreData(sessions)} options={chartOptions} />
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl shadow-lg mb-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4">Highest vs Current Score</h4>
                  <div className="w-full md:w-1/2 mx-auto">
                    <Bar data={getGameBarData(sessions)} options={chartOptions} />
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl shadow-lg">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4">
                    Detailed Results for {gameName}
                  </h4>
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
