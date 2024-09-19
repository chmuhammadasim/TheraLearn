import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import BlogSection from './components/BlogSection';

function LandingPage() {
  const [data, setData] = useState({
    hero: {},
    features: [],
    cta: {},
    blogs: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Default data to show when no data is found
  const defaultData = {
    hero: {
      title: 'Welcome to TheraLearn',
      subtitle: 'The best platform to learn and play games.',
      buttonText: 'Let\'s play',
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
    },
    blogs: [
      {
        title: 'Healthy Lifestyle',
        summary: 'Tips for maintaining a healthy diet.',
        image: '/LOGO.png',
      },
      {
        title: 'Pet Care',
        summary: 'How to take care of your furry friends.',
        image: '/LOGO.png',
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/mainPageData'); // Assuming the endpoint
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setData(defaultData); // Use default data if the API call fails
        }
      } catch (error) {
        setData(defaultData); // Fallback to default data in case of error
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
      />
      <BlogSection blogs={data.blogs.length > 0 ? data.blogs : defaultData.blogs} />
    </div>
  );
}

export default LandingPage;
