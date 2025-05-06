import React from "react";

const shapes = [
  { name: "square", color: "bg-blue-400" },
  { name: "triangle", color: "bg-pink-400" },
  { name: "circle", color: "bg-yellow-400" },
];

const StartScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white/80 rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center max-w-lg w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6 text-center drop-shadow">
          Welcome to <span className="text-blue-500">Matching Figures!</span>
        </h1>
        <div className="flex gap-8 mb-8">
          {shapes.map((shape, index) => (
            <div
              key={shape.name}
              className={`w-16 h-16 flex items-center justify-center animate-bounce`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <img
                src={`/src/assets/shapes/${shape.name}.svg`}
                alt={shape.name}
                className={`w-14 h-14 drop-shadow-lg ${shape.color} rounded-full p-2`}
                style={{
                  background:
                    shape.name === "triangle"
                      ? "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
                      : undefined,
                }}
              />
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Match the shapes to their correct spots before the time runs out!
          <br />
          <span className="text-purple-500 font-semibold">
            Drag the colorful shapes and drop them into the matching outlines.
          </span>
        </p>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 text-xl"
        >
          Let's Play!
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
