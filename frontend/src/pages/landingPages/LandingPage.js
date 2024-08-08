import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import MainPage from './components/Header';

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <MainPage />
    </div>
  );
}

export default LandingPage;
