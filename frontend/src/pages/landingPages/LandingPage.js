import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import BlogSection from './components/BlogSection';
import { motion } from "framer-motion";

function LandingPage() {
  const [data, setData] = useState({
    hero: {},
    features: [],
    cta: {},
    blogs: [],
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFD633",
    "#33FFF9",
    "#FF3333",
    "#A133FF",
  ];
  const Confetti = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return (
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
          backgroundColor: randomColor,
          top: `${Math.random() * 10}%`,
          left: `${Math.random() * 100}%`,
        }}
        initial={{ y: -10 }}
        animate={{ y: [0, 800], x: [0, Math.random() * 800 - 400] }}
        transition={{
          repeat: Infinity,
          duration: Math.random() * 6 + 4,
          ease: "linear",
        }}
      />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/content`);
        if (response.ok) {
          const result = await response.json();
          setData(result.content);
        } else {
          setData(defaultData);
        }
      } catch (error) {
        setData(defaultData);
      }
    };
    fetchData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 overflow-x-hidden">
      <HeroSection
        title={data.hero.title || defaultData.hero.title}
        subtitle={data.hero.subtitle || defaultData.hero.subtitle}
        buttonText={data.hero.buttonText || defaultData.hero.buttonText}
      />
      
      <FeaturesSection features={data.features.length > 0 ? data.features : defaultData.features} />
      <CTASection
        title={data.cta.title || defaultData.cta.title}
        description={data.cta.description || defaultData.cta.description}
        buttonText={data.cta.buttonText || defaultData.cta.buttonText}
        benefits={data.cta.features || defaultData.cta.benefits}
      />
      <BlogSection />
      <div className="fixed inset-0 overflow-hidden z-50 pointer-events-none">
      {[...Array(20)].map((_, index) => (
        <Confetti key={index} />
      ))}
    </div>
    </div>
  );
}
// Default data to show when no data is found
const defaultData = {
  hero: {
    title: 'Welcome to TheraLearn',
    subtitle: 'An educational platform with games and therapy designed for children with Down syndrome.',
    buttonText: 'Let\'s Play and Learn',
  },
  features: [
    {
      icon: 'puzzle-piece',
      title: 'Therapeutic Games',
      description: 'Fun and engaging games that support cognitive development and motor skills.',
      image: '/therapygame.png', // Replace with actual image
    },
    {
      icon: 'child',
      title: 'Specialized Therapy',
      description: 'Therapeutic activities tailored to the needs of children with Down syndrome.',
      image: '/therapy.png', // Replace with actual image
    },
    {
      icon: 'brain',
      title: 'Cognitive Development',
      description: 'Games designed to improve memory, problem-solving, and other cognitive skills.',
      image: '/brain.png', // Replace with actual image
    },
    {
      icon: 'hand-holding-heart',
      title: 'Emotional Support',
      description: 'Tools and games focused on boosting emotional intelligence and social skills.',
      image: '/emotionalsupport.png', // Replace with actual image
    },
  ],
  cta: {
    title: 'Ready to Start the Journey?',
    description: 'Join TheraLearn and support your child’s development through play and therapy.',
    buttonText: 'Sign Up Now',
    benefits: [
      { title: 'Personalized Learning', description: 'Each child gets a customized therapy and learning experience.' },
      { title: 'Fun & Educational', description: 'The best way to learn through interactive and enjoyable games.' },
      { title: 'Expert-Curated Activities', description: 'Therapy and games designed by experts for children with special needs.' },
    ],
  },
};


export default LandingPage;
