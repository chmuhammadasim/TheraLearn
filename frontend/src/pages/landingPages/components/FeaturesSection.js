import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = ({ features }) => {
  return (
    <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center bg-gradient-to-r from-white via-gray-100 to-white relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Our Amazing Games
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
