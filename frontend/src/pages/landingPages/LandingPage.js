import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading'; // Adjust the path as needed

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or some asynchronous operation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Welcome to Our Application</h1>
      <p>This is the landing page.</p>
    </div>
  );
}

export default LandingPage;
