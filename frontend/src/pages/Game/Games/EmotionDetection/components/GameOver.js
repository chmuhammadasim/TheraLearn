const GameOver = ({ player, gameResult, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-400 to-blue-500 p-4 sm:p-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} 
               className="absolute rounded-full bg-white/10 animate-float"
               style={{
                 width: `${Math.random() * 100 + 50}px`,
                 height: `${Math.random() * 100 + 50}px`,
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 animationDuration: `${Math.random() * 10 + 10}s`,
                 animationDelay: `${Math.random() * 5}s`
               }}
          />
        ))}
      </div>
      
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-8 max-w-md w-full mx-auto transform transition-all duration-300 hover:scale-[1.02] border border-blue-100 z-10">
        <div className="relative mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-3">Game Over</h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center bg-gray-50/80 p-5 rounded-xl hover:bg-white transition-colors duration-200 border-l-4 border-primary shadow-sm">
            <span className="font-semibold text-gray-700">Player:</span>
            <span className="font-medium text-gray-900">{player.name}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50/80 p-5 rounded-xl hover:bg-white transition-colors duration-200 border-l-4 border-blue-500 shadow-sm">
            <span className="font-semibold text-gray-700">Final Score:</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{gameResult.score}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50/80 p-5 rounded-xl hover:bg-white transition-colors duration-200 border-l-4 border-purple-500 shadow-sm">
            <span className="font-semibold text-gray-700">Level Reached:</span>
            <span className="font-medium text-gray-900">{gameResult.level}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50/80 p-5 rounded-xl hover:bg-white transition-colors duration-200 border-l-4 border-indigo-500 shadow-sm">
            <span className="font-semibold text-gray-700">Total Attempts:</span>
            <span className="font-medium text-gray-900">{gameResult.attempts}</span>
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105 font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Play Again
        </button>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          Thanks for playing! Challenge yourself to beat your high score.
        </div>
      </div>
    </div>
  );
};

export default GameOver;