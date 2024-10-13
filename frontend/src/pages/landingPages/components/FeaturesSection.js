import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = ({ features }) => {
  return (
    <section className="border-b-8 border-pink-500 py-16 md:py-24 min-h-screen flex flex-col justify-center bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full opacity-50 blur-xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-400 rounded-full opacity-50 blur-xl animate-bounce"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-purple-700 drop-shadow-lg animate-wiggle">
          🎮 Our Amazing Games 🎉
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-700 animate-fadeIn">
          Fun, educational, and entertaining games that spark creativity!
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Floating playful shapes */}
      <div className="absolute -top-10 right-10 w-16 h-16 bg-yellow-500 rounded-full blur-md opacity-70 animate-spin-slow"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-green-400 rounded-full blur-md opacity-60 animate-bounce-slow"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-blue-400 rounded-full blur-md opacity-60 animate-pulse"></div>
    </section>
  );
};

export default FeaturesSection;
