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
    subtitle: 'The best platform to learn and play games.',
    buttonText: 'Lets play',
  },
  features: [
    {
      icon: 'rocket',
      title: 'Fast Performance',
      description: 'Boost your workflow with lightning-fast speeds.',
      image: '/LOGO.png',
    },
    {
      icon: 'puzzle-piece',
      title: 'Customizable',
      description: 'Easily adapt features to suit your preferences.',
      image: '/LOGO.png',
    },
    {
      icon: 'robot',
      title: 'Automation',
      description: 'Smart tools to automate your tasks.',
      image: '/LOGO.png',
    },
    {
      icon: 'gamepad',
      title: 'Interactive UI',
      description: 'Engage with an immersive and fun UI.',
      image: '/LOGO.png',
    },
  ],
  cta: {
    title: 'Ready to Get Started?',
  description: 'Join us today and experience the best of our services.',
  buttonText: 'Sign Up Now',
  benefits: [
    { title: '24/7 Support', description: 'We provide round-the-clock support for all your needs.' },
    { title: 'Seamless Integration', description: 'Easily integrate with our platform without any hassle.' },
    { title: 'Top-notch Security', description: 'Your data is protected with the highest security standards.' },
    { title: 'Affordable Pricing', description: 'Enjoy our services at competitive pricing plans.' }
  ],
  },
};

export default LandingPage;
