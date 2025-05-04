import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { getUserData } from '../../services/userService';
import 'chart.js/auto';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { FaUser, FaGamepad, FaArrowLeft, FaChild, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';

function Dashboard() {
  const [loading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedChildIndex, setSelectedChildIndex] = useState(null);
  const [overallTrend, setOverallTrend] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData();
        setUserData(user.data);
        console.log(user.data)
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
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userData) {
      const allSessions = [];
      userData.children?.forEach((child) => {
        child.games?.forEach((game) => {
          game.sessions?.forEach((s) => allSessions.push(s));
        });
      });
      const byDate = {};
      allSessions.forEach((s) => {
        const d = new Date(s.datePlayed).toLocaleDateString();
        if (!byDate[d]) byDate[d] = [];
        byDate[d].push(s.score);
      });
      const labels = Object.keys(byDate).sort((a, b) => new Date(a) - new Date(b));
      const data = labels.map((d) => {
        const scores = byDate[d];
        return scores.reduce((p, c) => p + c, 0) / scores.length;
      });
      setOverallTrend({ labels, data });
    }
  }, [userData]);

  if (loading) return <Loading />;
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

  const allChildrenSessions =
    userData?.children?.map((child) => ({
      childName: `${child.firstName} ${child.lastName}`,
      games: child.games || [],
    })) || [];

  const compareGames = {};
  allChildrenSessions.forEach((childItem) => {
    childItem.games.forEach((game) => {
      game.sessions?.forEach((session) => {
        const { gameName, datePlayed, score } = session;
        if (!compareGames[gameName]) compareGames[gameName] = [];
        let existingChild = compareGames[gameName].find(
          (c) => c.childName === childItem.childName
        );
        if (!existingChild) {
          existingChild = {
            childName: childItem.childName,
            labels: [],
            scores: [],
          };
          compareGames[gameName].push(existingChild);
        }
        existingChild.labels.push(new Date(datePlayed).toLocaleDateString());
        existingChild.scores.push(score);
      });
    });
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#ffeb3b',
        bodyColor: '#000',
        callbacks: {
          title: (tooltipItems) => `Score on ${tooltipItems[0].label}`,
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
      legend: {
        position: 'top',
        labels: {
          boxWidth: 5,
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        grid: { display: true, borderDash: [2, 2], color: '#bbb' },
      },
      y: {
        grid: { borderDash: [2, 2], color: '#bbb' },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  const getComparativeLineData = (gameSessions) => {
    const allLabels = Array.from(
      new Set(gameSessions.flatMap((child) => child.labels))
    ).sort((a, b) => new Date(a) - new Date(b));
    return {
      labels: allLabels,
      datasets: gameSessions.map((childData, idx) => {
        const filledScores = allLabels.map((label) => {
          const i = childData.labels.indexOf(label);
          return i >= 0 ? childData.scores[i] : null;
        });
        // Assign a color for each child
        const colors = [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
          'rgba(153,102,255,1)',
          'rgba(255,159,64,1)',
        ];
        return {
          label: childData.childName,
          data: filledScores,
          borderWidth: 2,
          borderColor: colors[idx % colors.length],
          backgroundColor: colors[idx % colors.length],
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 6,
        };
      }),
    };
  };

  const allGames = Object.keys(compareGames);
  const averageScores = allGames.map((gameName) => {
    let sum = 0;
    let count = 0;
    compareGames[gameName].forEach((child) => {
      child.scores.forEach((score) => {
        sum += score;
        count++;
      });
    });
    return count > 0 ? sum / count : 0;
  });
  const allGamesData = {
    labels: allGames,
    datasets: [
      {
        label: 'Average Score',
        data: averageScores,
        backgroundColor: 'rgba(54,162,235,0.6)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };
  const sessionCounts = allGames.map((g) =>
    compareGames[g].reduce((acc, child) => acc + child.scores.length, 0)
  );
  const sessionDistData = {
    labels: allGames,
    datasets: [
      {
        label: 'Sessions',
        data: sessionCounts,
        backgroundColor: [
          '#f94144',
          '#f3722c',
          '#f8961e',
          '#f9c74f',
          '#90be6d',
          '#43aa8b',
          '#577590',
          '#742774',
        ],
      },
    ],
  };

  const singleChild =
    selectedChildIndex !== null && userData?.children
      ? userData.children[selectedChildIndex]
      : null;

  const singleChildGames = {};
  if (singleChild) {
    singleChild.games?.forEach((game) => {
      game.sessions?.forEach((session) => {
        const { gameName, datePlayed, score } = session;
        if (!singleChildGames[gameName]) {
          singleChildGames[gameName] = { labels: [], scores: [] };
        }
        singleChildGames[gameName].labels.push(
          new Date(datePlayed).toLocaleDateString()
        );
        singleChildGames[gameName].scores.push(score);
      });
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 pt-24">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 bg-white/90 shadow-lg z-20 p-4 flex justify-between items-center backdrop-blur">
        <h1 className="text-2xl font-extrabold text-blue-700 flex items-center gap-3 tracking-tight">
          <FaUser className="text-yellow-400 text-3xl" />
          TheraLearn Dashboard
        </h1>
        <span className="hidden md:inline text-gray-500 font-medium">
          Welcome, {userData?.firstName}
        </span>
      </header>

      <motion.div
        className="p-4 md:p-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-6xl bg-white/80 p-6 md:p-10 mt-4 shadow-2xl rounded-3xl border border-blue-100">
          {/* Parent Info */}
          {userData && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center gap-2 border-b-4 border-blue-400 pb-2">
                <FaUser className="text-blue-400" /> Parent Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-inner">
                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-400" />
                  <span><strong>First Name:</strong> {userData.firstName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-400" />
                  <span><strong>Last Name:</strong> {userData.lastName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-400" />
                  <span><strong>Email:</strong> {userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span><strong>City:</strong> {userData.city || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span><strong>Country:</strong> {userData.country || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-400" />
                  <span><strong>Username:</strong> {userData.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {userData.role || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBirthdayCake className="text-blue-400" />
                  <span><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>Active:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${userData.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{userData.isActive ? 'Yes' : 'No'}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>Emergency Authorization:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${userData.emergencyAuthorization ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{userData.emergencyAuthorization ? 'Yes' : 'No'}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>Policy #:</strong> {userData.insurancePolicy?.policyNumber || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>Coverage:</strong> {userData.insurancePolicy?.coverageDetails || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>Policy Valid Until:</strong> {userData.insurancePolicy?.validUntil ? new Date(userData.insurancePolicy.validUntil).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Children Section */}
          {userData?.children && userData.children.length > 0 && !singleChild && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4 flex items-center gap-2 border-b-4 border-green-400 pb-2">
                <FaChild className="text-green-400" /> Children
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[600px] overflow-y-auto pr-2">
                {userData.children.map((child, idx) => (
                  <motion.div
                    key={child._id}
                    className="bg-white border-l-8 border-blue-300 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col gap-2 relative min-h-[320px]"
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedChildIndex(idx)}
                  >
                    <div className="absolute top-4 right-4">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow">
                        {child.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <FaChild className="text-blue-400 text-xl" />
                      <span className="text-lg font-semibold">{child.firstName} {child.lastName}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1 truncate max-w-[180px]" title={child.dateOfBirth}><FaBirthdayCake className="text-pink-400" /> {new Date(child.dateOfBirth).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]" title={child.gender}>Gender: {child.gender}</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]" title={child.bloodType}>Blood: {child.bloodType || 'N/A'}</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]" title={child.school}>School: {child.school || 'N/A'}</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]" title={child.grade}>Grade: {child.grade || 'N/A'}</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]" title={child.height}>Height: {child.height || 'N/A'} cm</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]" title={child.weight}>Weight: {child.weight || 'N/A'} kg</span>
                      <span className="flex items-center gap-1 truncate max-w-[120px]" title={child.bmi}>BMI: {child.bmi || 'N/A'}</span>
                      <span className="flex items-center gap-1 truncate max-w-[220px]" title={child.emergencyContact?.name ? `${child.emergencyContact.name} (${child.emergencyContact.relationship}) ${child.emergencyContact.phone}` : 'N/A'}>
                        Emergency Contact: {child.emergencyContact?.name || 'N/A'} ({child.emergencyContact?.relationship || 'N/A'}) {child.emergencyContact?.phone || ''}
                      </span>
                      <span className="flex items-center gap-1 truncate max-w-[160px]" title={child.specialNeeds}>Special Needs: {child.specialNeeds || 'N/A'}</span>
                    <div className="flex flex-wrap gap-2 mt-2 max-h-16 overflow-y-auto">
                      {child.medicalConditions?.length > 0 && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.medicalConditions.join(', ')}>Medical: {child.medicalConditions.join(', ')}</span>
                      )}
                      {child.allergies?.length > 0 && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.allergies.join(', ')}>Allergies: {child.allergies.join(', ')}</span>
                      )}
                      {child.medications?.length > 0 && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.medications.join(', ')}>Medications: {child.medications.join(', ')}</span>
                      )}
                      {child.geneticDisorders?.length > 0 && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.geneticDisorders.join(', ')}>Genetic Disorders: {child.geneticDisorders.join(', ')}</span>
                      )}
                      {child.familyMedicalHistory?.length > 0 && (
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.familyMedicalHistory.join(', ')}>Family History: {child.familyMedicalHistory.join(', ')}</span>
                      )}
                      {child.behavioralIssues?.length > 0 && (
                        <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.behavioralIssues.join(', ')}>Behavioral Issues: {child.behavioralIssues.join(', ')}</span>
                      )}
                      {child.developmentalMilestones?.length > 0 && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.developmentalMilestones.join(', ')}>Milestones: {child.developmentalMilestones.join(', ')}</span>
                      )}
                      {child.dietRestrictions?.length > 0 && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.dietRestrictions.join(', ')}>Diet: {child.dietRestrictions.join(', ')}</span>
                      )}
                      {child.activityPreferences?.length > 0 && (
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.activityPreferences.join(', ')}>Activities: {child.activityPreferences.join(', ')}</span>
                      )}
                      {child.hobbies?.length > 0 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.hobbies.join(', ')}>Hobbies: {child.hobbies.join(', ')}</span>
                      )}
                      {child.favoriteSubjects?.length > 0 && (
                        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.favoriteSubjects.join(', ')}>Favorite Subjects: {child.favoriteSubjects.join(', ')}</span>
                      )}
                      {child.extracurricularActivities?.length > 0 && (
                        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.extracurricularActivities.join(', ')}>Extracurricular: {child.extracurricularActivities.join(', ')}</span>
                      )}
                      {child.languageSpoken?.length > 0 && (
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.languageSpoken.join(', ')}>Languages: {child.languageSpoken.join(', ')}</span>
                      )}
                      {child.parentalConcerns?.length > 0 && (
                        <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-semibold truncate" title={child.parentalConcerns.join(', ')}>Parental Concerns: {child.parentalConcerns.join(', ')}</span>
                      )}
                    </div>
                      
                    </div>
                    {/* Doctor Notes */}
                    {child.doctorNotes?.length > 0 && (
                      <div className="mt-2 w-full">
                        <strong>Doctor Notes:</strong>
                        <ul className="list-disc ml-6 text-xs">
                          {child.doctorNotes.map((note, i) => (
                            <li key={i}>
                              {note.prescriptions?.length > 0 && (
                                <span> | Prescriptions: {note.prescriptions.map((p) => `${p.medication} (${p.dosage})`).join(', ')}</span>
                              )}
                                <span> | Prescriptions: {note.prescriptions.map((p, idx) => `${p.medication} (${p.dosage})`).join(', ')}</span>
                              
                              {note.followUpDate && <span> | Follow Up: {new Date(note.followUpDate).toLocaleDateString()}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Mental Health Notes */}
                    {child.mentalHealthNotes?.length > 0 && (
                        <ul className="list-disc ml-6 text-xs max-h-16 overflow-y-auto">
                          {child.mentalHealthNotes.map((note, i) => (
                            <li key={i}>
                              <span>Date: {note.date ? new Date(note.date).toLocaleDateString() : 'N/A'}</span>
                              {note.notes && <span> | Notes: <span className="truncate inline-block max-w-[120px]" title={note.notes}>{note.notes}</span></span>}
                            </li>
                          ))}
                        </ul>
                        
                        
                      
                    )}
                    {/* Hospital Visits */}
                    {child.hospitalVisits?.length > 0 && (
                        <ul className="list-disc ml-6 text-xs max-h-16 overflow-y-auto">
                          {child.hospitalVisits.map((visit, i) => (
                            <li key={i}>
                              <span>Date: {visit.date ? new Date(visit.date).toLocaleDateString() : 'N/A'}</span>
                              {visit.hospital && <span> | Hospital: <span className="truncate inline-block max-w-[100px]" title={visit.hospital}>{visit.hospital}</span></span>}
                              {visit.reason && <span> | Reason: <span className="truncate inline-block max-w-[100px]" title={visit.reason}>{visit.reason}</span></span>}
                            </li>
                          ))}
                        </ul>
                         
                    )}
                    {/* Lab Tests */}
                    {child.labTests?.length > 0 && (
                        <ul className="list-disc ml-6 text-xs max-h-16 overflow-y-auto">
                          {child.labTests.map((test, i) => (
                            <li key={i}>
                              <span>Date: {test.date ? new Date(test.date).toLocaleDateString() : 'N/A'}</span>
                              {test.testName && <span> | Test: <span className="truncate inline-block max-w-[100px]" title={test.testName}>{test.testName}</span></span>}
                              {test.result && <span> | Result: <span className="truncate inline-block max-w-[100px]" title={test.result}>{test.result}</span></span>}
                            </li>
                          ))}
                        </ul>
                          
                    )}
                    {/* Therapy Sessions */}
                    {child.therapySessions?.length > 0 && (
                        <ul className="list-disc ml-6 text-xs max-h-16 overflow-y-auto">
                          {child.therapySessions.map((session, i) => (
                            <li key={i}>
                              <span>Date: {session.date ? new Date(session.date).toLocaleDateString() : 'N/A'}</span>
                              {session.type && <span> | Type: <span className="truncate inline-block max-w-[100px]" title={session.type}>{session.type}</span></span>}
                              {session.notes && <span> | Notes: <span className="truncate inline-block max-w-[100px]" title={session.notes}>{session.notes}</span></span>}
                            </li>
                          ))}
                        </ul>
                         
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Single Child View */}
          {singleChild && (
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full shadow transition"
                  onClick={() => setSelectedChildIndex(null)}
                >
                  <FaArrowLeft /> Back to All Children
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-700 border-b-4 border-purple-400 pb-2 flex items-center gap-2">
                  <FaChild className="text-purple-400" />
                  {singleChild.firstName} {singleChild.lastName} - Game Scores
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(singleChildGames).map(([childGame, data]) => (
                  <div
                    key={childGame}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl shadow-xl flex flex-col items-center"
                  >
                    <h4 className="text-xl font-semibold text-gray-700 mb-4 underline">
                      {childGame}
                    </h4>
                    <div className="w-full h-72">
                      <Line
                        data={{
                          labels: data.labels,
                          datasets: [
                            {
                              label: `${singleChild.firstName}'s Scores`,
                              data: data.scores,
                              borderColor: 'rgba(75,192,192,1)',
                              borderWidth: 2,
                              fill: false,
                              pointRadius: 4,
                              pointHoverRadius: 6,
                            },
                          ],
                        }}
                        options={chartOptions}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Games Comparison */}
          {allGames.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2 border-b-4 border-indigo-400 pb-2">
                <FaGamepad className="text-indigo-400" /> All Games Comparison
              </h2>
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start justify-around gap-8">
                <div className="w-full md:w-1/2 h-72">
                  <Bar data={allGamesData} options={chartOptions} />
                </div>
                <div className="w-full md:w-1/2 h-72">
                  <Doughnut data={sessionDistData} />
                </div>
              </div>
            </div>
          )}

          {/* Overall Score Trend */}
          {overallTrend && overallTrend.labels.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 flex items-center gap-2 border-b-4 border-red-400 pb-2">
                <FaGamepad className="text-red-400" /> Overall Score Trend
              </h2>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl shadow-xl w-full md:w-2/3 mx-auto h-72">
                <Line
                  data={{
                    labels: overallTrend.labels,
                    datasets: [
                      {
                        label: 'Average Score (All Children)',
                        data: overallTrend.data,
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          )}

          {/* Child Comparisons */}
          {Object.keys(compareGames).length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-700 mb-6 flex items-center gap-2 border-b-4 border-yellow-400 pb-2">
                <FaGamepad className="text-yellow-500" /> Child Comparisons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(compareGames).map(([gameName, sessions]) => (
                  <div key={gameName} className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-xl flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 underline">
                      {gameName}
                    </h3>
                    <div className="w-full h-72">
                      <Line
                        data={getComparativeLineData(sessions)}
                        options={chartOptions}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
