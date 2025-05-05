import React, { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from 'axios';
import MusicComponent from './music.js';

// Card levels for the game
const levels = [
  [
    { src: "/img/2.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
    { src: "/img/6.jpg", matched: false },
  ],
  [
    { src: "/img/6.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/8.jpg", matched: false },
    { src: "/img/9.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
  ],
  [
    { src: "/img/3.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/9.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
    { src: "/img/13.jpg", matched: false },
  ],
  [
    { src: "/img/4.jpg", matched: false },
    { src: "/img/5.jpg", matched: false },
    { src: "/img/6.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
    { src: "/img/14.jpg", matched: false },
    { src: "/img/15.jpg", matched: false },
  ],
  [
    { src: "/img/2.jpg", matched: false },
    { src: "/img/3.jpg", matched: false },
    { src: "/img/4.jpg", matched: false },
    { src: "/img/8.jpg", matched: false },
    { src: "/img/9.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/13.jpg", matched: false },
    { src: "/img/15.jpg", matched: false },
    { src: "/img/17.jpg", matched: false },
  ],
  [
    { src: "/img/5.jpg", matched: false },
    { src: "/img/6.jpg", matched: false },
    { src: "/img/7.jpg", matched: false },
    { src: "/img/10.jpg", matched: false },
    { src: "/img/11.jpg", matched: false },
    { src: "/img/12.jpg", matched: false },
    { src: "/img/15.jpg", matched: false },
    { src: "/img/16.jpg", matched: false },
    { src: "/img/17.jpg", matched: false },
    { src: "/img/18.jpg", matched: false },
    { src: "/img/19.jpg", matched: false },
  ],
];

function Game() {
  const [username, setUsername] = useState(''); // State for username input
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(0);
  const [levelTime, setLevelTime] = useState(0);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [completionMessage, setCompletionMessage] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

  // Function to handle username submission
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      alert('Please enter a username');
      return;
    }

    try {
      // Fetch the latest session for the entered username
      const response = await axios.get(`/api/sessions/${username}`);
      if (response.data) {
        const { level, score, turns, duration } = response.data;
        setLevel(level - 1); // Set level (subtract 1 because levels are 0-indexed in the game)
        setScore(score);
        setTurns(turns);
        setTime(duration);
      }
      setGameStarted(true); // Start the game
    } catch (error) {
      console.error('Error fetching latest session:', error);
      setGameStarted(true); 
    }
  };

  const shuffleCards = () => {
    const safeLevel = Math.max(0, Math.min(level, levels.length - 1));
    const currentLevelCards = levels[safeLevel];

    const duplicatedCards = currentLevelCards.map(card => ({ ...card }));
    const allCards = [...duplicatedCards, ...duplicatedCards].map((card, idx) => ({
      ...card,
      id: `${safeLevel}-${idx}-${Date.now()}-${Math.random()}`
    }));
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(allCards);
    setTurns(0);
    setLevelTime(0);
    setLevelStartTime(Date.now());
    setTransitioning(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        setScore((prevScore) => prevScore + 10);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      if (level < levels.length - 1) {
        setTransitioning(true);
        setCompletionMessage(`Level ${level + 1} Completed! Moving to Level ${level + 2}...`);
        setTimeout(() => {
          setLevel((prevLevel) => prevLevel + 1);
          setCompletionMessage('');
        }, 2000);
      } else {
        saveSession(); // Save session when the game is completed
      }
    }
  }, [cards]);

  const saveSession = async () => {
    try {
      const response = await axios.post('/api/sessions', {
        username: username,
        level: level + 1,
        score: score,
        turns: turns,
        duration: time,
        status: 'completed',
      });
      setHistory([...history, response.data]); // Appending session data to history
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };


  useEffect(() => {
    if (gameStarted) {
      shuffleCards();
    }
  }, [gameStarted, level]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
      setLevelTime((prevLevelTime) => prevLevelTime + 1);

      if (levelTime >= 60 && !cards.every(card => card.matched)) {
        alert('Time is up! Restarting level...');
        shuffleCards();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [levelTime, cards]);

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-white">
      <div className="w-full max-w-md bg-white/90 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-700 drop-shadow">Magic Match</h1>
        <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-purple-400 px-4 py-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 border-2 border-white px-4 py-2 rounded-lg text-white font-bold cursor-pointer text-base shadow-md hover:from-pink-500 hover:to-purple-600 transition"
        >
          Start Game
        </button>
        </form>
      </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-20 bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 flex flex-col items-center justify-start py-12 overflow-x-hidden">
      {/* Floating Puzzle Pieces */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 opacity-40 rounded-3xl rotate-12 blur-2xl animate-float-slow z-0" />
      <div className="absolute top-10 right-0 w-24 h-24 bg-purple-300 opacity-30 rounded-2xl -rotate-12 blur-2xl animate-float-fast z-0" />
      <div className="absolute bottom-0 left-10 w-28 h-28 bg-yellow-200 opacity-30 rounded-2xl rotate-6 blur-2xl animate-float-mid z-0" />
      <div className="absolute bottom-10 right-10 w-36 h-36 bg-pink-200 opacity-30 rounded-3xl blur-2xl animate-float-slow z-0" />

      {/* Music & Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 z-10 w-full max-w-5xl">
        <MusicComponent />
        <div className="flex-1">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-500 to-yellow-500 drop-shadow-2xl tracking-tight mb-2">
            Puzzle Memory
          </h1>
          <p className="text-center text-purple-700 font-medium mt-1 text-lg tracking-wide">Flip and match all the puzzle cards!</p>
        </div>
      </div>

      {/* Controls & Score */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6  w-full max-w-4xl z-10">
        <button
          className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 border-2 border-white px-8 py-3 rounded-2xl text-white font-bold cursor-pointer text-xl shadow-xl hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
          onClick={shuffleCards}
        >
          <span className="inline-block text-2xl animate-spin-slow">🧩</span> Restart Level
        </button>
        <div className="score flex flex-wrap gap-6 text-lg sm:text-2xl font-semibold text-purple-900 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg justify-center border-2 border-pink-200">
          <p className="flex flex-col items-center">
            <span className="font-bold text-pink-600">Level</span>
            <span className="text-3xl">{level + 1}</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="font-bold text-yellow-500">Score</span>
            <span className="text-3xl">{score}</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="font-bold text-purple-600">Turns</span>
            <span className="text-3xl">{turns}</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="font-bold text-pink-500">Time</span>
            <span className="text-3xl">{levelTime}s</span>
          </p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="card-grid mt-8 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 px-1 sm:px-0 justify-center">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex justify-center items-center transform hover:scale-105 transition-transform duration-200"
            >
              <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-2xl shadow-xl border-4 border-white p-1 sm:p-2 transition-all duration-200 hover:border-yellow-400">
                <SingleCard
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled || transitioning}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      {completionMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-500 text-white px-12 py-16 rounded-3xl text-3xl sm:text-4xl text-center shadow-2xl border-4 border-white animate-pulse max-w-xs sm:max-w-md mx-auto flex flex-col items-center">
            <div className="animate-bounce inline-block mb-6 text-6xl">🧩🎉</div>
            <div>{completionMessage}</div>
          </div>
        </div>
      )}

      {/* Game History */}
      {/* <div className="history mt-20 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-2 border-purple-200 w-full max-w-3xl z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-center tracking-tight">Game History</h2>
        {history.length === 0 ? (
          <p className="text-center text-purple-600 italic">No game history yet. Complete levels to see your progress!</p>
        ) : (
          <div className="overflow-x-auto">
            <ul className="space-y-4 min-w-[320px]">
              {history.map((session, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-base sm:text-lg shadow-md hover:shadow-xl transition-shadow border-2 border-pink-100"
                >
                  <div>
                    <span className="font-semibold text-purple-700">Level:</span> {session.level}
                  </div>
                  <div>
                    <span className="font-semibold text-yellow-600">Score:</span> {session.score}
                  </div>
                  <div>
                    <span className="font-semibold text-purple-700">Status:</span>
                    <span className={`ml-1 ${session.status === 'completed' ? 'text-green-600 font-medium' : 'text-orange-500'}`}>
                      {session.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-pink-600">Date:</span>{" "}
                    {new Date(session.datePlayed).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div> */}

      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); } }
        @keyframes float-mid { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-float-mid { animation: float-mid 5.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Game;