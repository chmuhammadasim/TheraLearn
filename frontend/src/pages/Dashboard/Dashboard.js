import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

function Dashboard() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
   <div>
        <h1>Dashboard Page</h1>
   </div>
  );
}

export default Dashboard;
