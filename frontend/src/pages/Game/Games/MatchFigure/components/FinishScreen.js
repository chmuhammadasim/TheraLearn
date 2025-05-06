import React, { useEffect } from "react";

const FinishScreen = ({ score, onRestart }) => {
  useEffect(() => {
    // Trigger confetti on component mount
    if (typeof window !== "undefined" && window.confetti) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        window.confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff0000", "#00ff00", "#0000ff"],
        });

        window.confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff9a9e", "#fad0c4", "#ffecd2"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, []);

  // Calculate stars based on score
  const maxScore = 150;
  const starCount = Math.min(5, Math.max(1, Math.ceil((score / maxScore) * 5)));

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 rounded-3xl shadow-2xl p-10 mx-auto max-w-xl border-4 border-white/60 relative overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-pink-200 rounded-full opacity-40 animate-bounce-slow z-0"></div>
      <div className="absolute bottom-8 right-8 w-20 h-20 bg-yellow-200 rounded-full opacity-30 animate-bounce-slower z-0"></div>
      <div className="absolute top-1/2 left-0 w-10 h-10 bg-blue-200 rounded-full opacity-30 animate-bounce-slowest z-0"></div>

      <h1 className="relative z-10 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 mb-6 drop-shadow-2xl tracking-tight">
        🎊 Game Over! 🎊
      </h1>

      <div className="relative z-10 flex items-center mb-8">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`transition-all duration-300 ${
              index < starCount ? "scale-125" : "opacity-40"
            }`}
            style={{
              animation:
                index < starCount ? "pulse 1s infinite alternate" : "none",
              animationDelay: `${index * 0.15}s`,
            }}
          >
            <svg
              className={`w-14 h-14 mx-2 ${
                index < starCount
                  ? "text-yellow-400 drop-shadow-xl"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.505l6.914-1.005L12 2.25l3.086 6.25L22 9.505l-5.007 4.617 1.179 6.873z" />
            </svg>
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center mb-6">
        <h2 className="text-3xl font-bold mb-1 text-gray-800 drop-shadow">
          Your Score
        </h2>
        <span className="text-5xl font-extrabold text-blue-600 bg-white/70 px-6 py-2 rounded-2xl shadow-lg border-2 border-blue-200">
          {score}
        </span>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/90 rounded-xl shadow-lg p-6 mb-8 text-center border-2 border-pink-100">
        {score >= 100 ? (
          <p className="text-xl font-semibold text-green-600 flex items-center justify-center gap-2">
            <span role="img" aria-label="party">🎉</span>
            Amazing job! You're a shape-matching master!
          </p>
        ) : score >= 50 ? (
          <p className="text-xl font-semibold text-yellow-600 flex items-center justify-center gap-2">
            <span role="img" aria-label="thumbs up">👍</span>
            Great effort! Keep practicing to become a shape expert!
          </p>
        ) : (
          <p className="text-xl font-semibold text-pink-600 flex items-center justify-center gap-2">
            <span role="img" aria-label="light bulb">💡</span>
            Good try! Play again to improve your score!
          </p>
        )}
      </div>

      <button
        onClick={onRestart}
        className="relative z-10 mt-2 px-10 py-4 bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 text-white font-extrabold rounded-full shadow-xl hover:scale-110 hover:from-pink-500 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300 text-lg tracking-wide"
      >
        🔄 Play Again!
      </button>

      {/* Custom keyframes for slow bounce */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-20px);}
        }
        .animate-bounce-slow { animation: bounce-slow 3s infinite; }
        @keyframes bounce-slower {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-30px);}
        }
        .animate-bounce-slower { animation: bounce-slower 5s infinite; }
        @keyframes bounce-slowest {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
        .animate-bounce-slowest { animation: bounce-slowest 7s infinite; }
      `}</style>
    </div>
  );
};

export default FinishScreen;
