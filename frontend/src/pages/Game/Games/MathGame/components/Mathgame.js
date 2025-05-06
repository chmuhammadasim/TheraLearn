import { useState, useEffect } from "react";
import { Star, Heart, Trophy, Volume2, Home, RefreshCw } from "lucide-react";

const OPERATORS = {
  1: ["+"],
  2: ["-"],
  3: ["*"],
  4: ["/"],
};

const LEVELS = {
  1: {
    name: "Addition Fun",
    color: "bg-pink-500",
    icon: "➕",
    description: "Let's add numbers together!",
    questions: [
      { maxNum1: 5, maxNum2: 3 }, // Very easy: 1-5 + 1-3
      { maxNum1: 5, maxNum2: 3 }, // Very easy: 1-5 + 1-3
      { maxNum1: 5, maxNum2: 5 }, // Easy: 1-5 + 1-5
      { maxNum1: 7, maxNum2: 3 }, // Easy: 1-7 + 1-3
      { maxNum1: 8, maxNum2: 4 }, // Easy: 1-8 + 1-4
      { maxNum1: 10, maxNum2: 5 }, // Medium: 1-10 + 1-5
      { maxNum1: 10, maxNum2: 7 }, // Medium: 1-10 + 1-7
      { maxNum1: 12, maxNum2: 8 }, // Harder: 1-12 + 1-8
      { maxNum1: 15, maxNum2: 8 }, // Harder: 1-15 + 1-8
      { maxNum1: 15, maxNum2: 10 }, // Hardest: 1-15 + 1-10
    ],
  },
  2: {
    name: "Subtraction Time",
    color: "bg-purple-500",
    icon: "➖",
    description: "Find the difference!",
    questions: [
      { maxNum1: 5, maxNum2: 2 }, // Very easy: 5-2
      { maxNum1: 6, maxNum2: 2 }, // Very easy: 6-2
      { maxNum1: 7, maxNum2: 3 }, // Easy: 7-3
      { maxNum1: 8, maxNum2: 3 }, // Easy: 8-3
      { maxNum1: 10, maxNum2: 4 }, // Easy: 10-4
      { maxNum1: 12, maxNum2: 5 }, // Medium: 12-5
      { maxNum1: 15, maxNum2: 7 }, // Medium: 15-7
      { maxNum1: 18, maxNum2: 9 }, // Harder: 18-9
      { maxNum1: 20, maxNum2: 10 }, // Harder: 20-10
      { maxNum1: 25, maxNum2: 12 }, // Hardest: 25-12
    ],
  },
  3: {
    name: "Multiplication Magic",
    color: "bg-blue-500",
    icon: "✖️",
    description: "Multiply the fun!",
    questions: [
      { maxNum1: 2, maxNum2: 2 }, // Very easy: 2×2
      { maxNum1: 2, maxNum2: 3 }, // Very easy: 2×3
      { maxNum1: 3, maxNum2: 2 }, // Easy: 3×2
      { maxNum1: 3, maxNum2: 3 }, // Easy: 3×3
      { maxNum1: 4, maxNum2: 2 }, // Easy: 4×2
      { maxNum1: 4, maxNum2: 3 }, // Medium: 4×3
      { maxNum1: 5, maxNum2: 2 }, // Medium: 5×2
      { maxNum1: 5, maxNum2: 3 }, // Harder: 5×3
      { maxNum1: 6, maxNum2: 2 }, // Harder: 6×2
      { maxNum1: 6, maxNum2: 3 }, // Hardest: 6×3
    ],
  },
  4: {
    name: "Division Adventure",
    color: "bg-green-500",
    icon: "➗",
    description: "Share equally!",
    questions: [
      { maxNum1: 4, maxNum2: 2 }, // Very easy: 4÷2
      { maxNum1: 6, maxNum2: 2 }, // Very easy: 6÷2
      { maxNum1: 8, maxNum2: 2 }, // Easy: 8÷2
      { maxNum1: 6, maxNum2: 3 }, // Easy: 6÷3
      { maxNum1: 8, maxNum2: 4 }, // Easy: 8÷4
      { maxNum1: 10, maxNum2: 2 }, // Medium: 10÷2
      { maxNum1: 9, maxNum2: 3 }, // Medium: 9÷3
      { maxNum1: 12, maxNum2: 3 }, // Harder: 12÷3
      { maxNum1: 12, maxNum2: 4 }, // Harder: 12÷4
      { maxNum1: 15, maxNum2: 3 }, // Hardest: 15÷3
    ],
  },
};

const Game = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const generateQuestion = (level, questionIndex) => {
    const operator = OPERATORS[level][0];
    const questionConfig = LEVELS[level].questions[questionIndex];
    let num1, num2, answer;

    switch (operator) {
      case "+":
        num1 = Math.floor(Math.random() * questionConfig.maxNum1) + 1;
        num2 = Math.floor(Math.random() * questionConfig.maxNum2) + 1;
        answer = num1 + num2;
        break;
      case "-":
        num2 = Math.floor(Math.random() * questionConfig.maxNum2) + 1;
        num1 =
          Math.floor(Math.random() * (questionConfig.maxNum1 - num2)) + num2;
        answer = num1 - num2;
        break;
      case "*":
        num1 = Math.floor(Math.random() * questionConfig.maxNum1) + 1;
        num2 = Math.floor(Math.random() * questionConfig.maxNum2) + 1;
        answer = num1 * num2;
        break;
      case "/":
        num2 = questionConfig.maxNum2;
        answer = Math.floor(Math.random() * questionConfig.maxNum1) + 1;
        num1 = num2 * answer;
        break;
    }

    const options = generateOptions(answer, level, questionIndex);

    return {
      num1,
      num2,
      operator,
      answer,
      options,
      visualAid: generateVisualAid(answer),
    };
  };

  const generateOptions = (answer, level, questionIndex) => {
    const options = [answer];
    const maxDifference = Math.min(5, Math.ceil(answer * 0.5)); // Smaller range for easier questions

    while (options.length < 4) {
      let option;
      if (questionIndex < 5) {
        // Easier questions have closer options
        option =
          answer +
          (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      } else {
        option =
          answer +
          (Math.random() < 0.5 ? 1 : -1) *
            (Math.floor(Math.random() * maxDifference) + 1);
      }

      if (!options.includes(option) && option >= 0) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateVisualAid = (num) => {
    return Array(num).fill("⭐").join(" ");
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!showMenu) {
      setQuestion(generateQuestion(level, currentQuestionIndex));
    }
  }, [level, showMenu, currentQuestionIndex]);

  const handleAnswer = (selectedAnswer) => {
    const correct = selectedAnswer === question.answer;
    setIsCorrect(correct);
    setTotalQuestions((prev) => prev + 1);

    if (correct) {
      speak("Great job! That's correct!");
      setScore((prev) => prev + 1);

      setTimeout(() => {
        if (currentQuestionIndex === 9) {
          // Completed all questions in the level
          setShowCelebration(true);
          speak("Amazing! You've completed this level!");
          setTimeout(() => {
            setShowCelebration(false);
            if (level < 4) {
              setLevel((prev) => prev + 1);
              setCurrentQuestionIndex(0);
            } else {
              setShowMenu(true); // Return to menu if all levels complete
            }
          }, 3000);
        } else {
          // Move to next question
          setCurrentQuestionIndex((prev) => prev + 1);
        }
        setIsCorrect(null);
      }, 1500);
    } else {
      speak("Let's try again!");
      setTimeout(() => {
        setQuestion(generateQuestion(level, currentQuestionIndex));
        setIsCorrect(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setStreak(0);
    setTotalQuestions(0);
    setCurrentQuestionIndex(0);
    setShowMenu(true);
    setIsCorrect(null);
    setQuestion(null);
  };

  const startLevel = (selectedLevel) => {
    setLevel(selectedLevel);
    setCurrentQuestionIndex(0);
    setShowMenu(false);
    speak(`Let's start ${LEVELS[selectedLevel].name}!`);
  };

  if (showMenu) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-purple-800 mb-8">
            Math Adventure! 🎮
          </h1>
          <div className="grid gap-6">
            {Object.entries(LEVELS).map(([key, level]) => (
              <button
                key={key}
                onClick={() => startLevel(parseInt(key))}
                className={`${level.color} p-6 rounded-xl text-white text-left transform transition hover:scale-105`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{level.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{level.name}</h2>
                    <p className="text-lg opacity-90">{level.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowMenu(true)}
            className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600"
          >
            <Home className="w-6 h-6" />
          </button>
          <div className="flex gap-4">
            <button
              onClick={resetGame}
              className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                speak(
                  `${question.num1} ${question.operator} ${question.num2} equals what?`
                )
              }
              className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="text-center mb-8">
          <div
            className={`${LEVELS[level].color} rounded-lg p-4 text-white inline-block`}
          >
            <h2 className="text-xl font-bold">{LEVELS[level].name}</h2>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-6 h-6" />
              <span>Question {currentQuestionIndex + 1} of 10</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-gray-800 flex justify-center items-center gap-4 mb-4">
              <span>{question.num1}</span>
              <span className="text-purple-500">{question.operator}</span>
              <span>{question.num2}</span>
              <span>=</span>
              <span>?</span>
            </div>
            <div className="text-3xl overflow-hidden">{question.visualAid}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`p-6 text-3xl font-bold rounded-lg transform transition-all ${
                  isCorrect === null ? "hover:scale-105" : ""
                } ${
                  isCorrect !== null && option === question.answer
                    ? "bg-green-500 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">
            Question: {currentQuestionIndex + 1}/10
          </div>
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">
            Score: {score}/{totalQuestions}
          </div>
        </div>
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-8 text-center animate-bounce">
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                🎉 Amazing Job! 🎉
              </h2>
              <p className="text-xl text-gray-600">
                {level < 4
                  ? "You're ready for the next level!"
                  : "Congratulations! You've completed all levels!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
