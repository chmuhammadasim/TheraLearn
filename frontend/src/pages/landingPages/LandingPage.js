import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Header from './components/Header';

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
      <Header />
      <h1>Welcome to Our Application</h1>
      <p>This is the landing page.</p>
    </div>
  );
}

export default LandingPage;
