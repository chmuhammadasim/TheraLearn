import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

function AboutUsPage() {
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
      <h1>Welcome to Our Application</h1>
      <p>This is the About us page.</p>
    </div>
  );
}

export default AboutUsPage;
