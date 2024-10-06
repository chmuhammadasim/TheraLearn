import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminContentPanel = () => {
  const [hero, setHero] = useState({ title: '', subtitle: '', buttonText: '' });
  const [features, setFeatures] = useState([]);
  const [cta, setCta] = useState({ title: '', description: '', buttonText: '', features: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/content`);
        if (data) {
          setHero(data.content.hero || { title: '', subtitle: '', buttonText: '' });
          setFeatures(data.content.features || []);
          setCta(data.content.cta || { title: '', description: '', buttonText: '' });
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Validate input fields
  const validateHero = () => {
    return hero.title && hero.subtitle && hero.buttonText;
  };

  const validateFeature = (feature) => {
    return feature.icon && feature.title && feature.description && feature.image;
  };

  const validateCta = () => {
    return cta.title && cta.description && cta.buttonText;
  };

  // Update Hero Section
  const updateHero = async () => {
    if (!validateHero()) {
      alert('All hero fields are required.');
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_KEY}/content/update-hero`, hero);
      alert('Hero section updated successfully!');
    } catch (err) {
      alert('Error updating hero section: ' + err.message);
    }
  };

  // Update Features Section
  const updateFeature = async (index) => {
    if (!validateFeature(features[index])) {
      alert('All feature fields are required.');
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_KEY}/content/update-feature/${index}`, features[index]);
      alert('Feature updated successfully!');
    } catch (err) {
      alert('Error updating feature: ' + err.message);
    }
  };

  // Delete Feature
  const deleteFeature = async (index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_KEY}/content/delete-feature/${index}`);
      setFeatures(features.filter((_, i) => i !== index));
      alert('Feature deleted successfully!');
    } catch (err) {
      alert('Error deleting feature: ' + err.message);
    }
  };

  // Update CTA Section
  const updateCta = async () => {
    if (!validateCta()) {
      alert('All CTA fields are required.');
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_KEY}/content/update-cta`, cta);
      alert('CTA section updated successfully!');
    } catch (err) {
      alert('Error updating CTA section: ' + err.message);
    }
  };

  // Add a new Feature
  const addFeature = () => {
    setFeatures([...features, { icon: '', title: '', description: '', image: '' }]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className=" p-8 mt-16 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">Super Admin Panel</h2>

      {/* Hero Section */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Hero Section</h3>
        <input
          type="text"
          value={hero.title}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
          placeholder="Hero Title"
          className="block w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={hero.subtitle}
          onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
          placeholder="Hero Subtitle"
          className="block w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={hero.buttonText}
          onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
          placeholder="Hero Button Text"
          className="block w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={updateHero}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Update Hero
        </button>
      </section>

      {/* Features Section */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Features Section</h3>
        {features.map((feature, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <input
              type="text"
              value={feature.icon}
              onChange={(e) => {
                const updatedFeature = { ...feature, icon: e.target.value };
                setFeatures(features.map((f, i) => (i === index ? updatedFeature : f)));
              }}
              placeholder="Icon"
              className="block w-full mb-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={feature.title}
              onChange={(e) => {
                const updatedFeature = { ...feature, title: e.target.value };
                setFeatures(features.map((f, i) => (i === index ? updatedFeature : f)));
              }}
              placeholder="Title"
              className="block w-full mb-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={feature.description}
              onChange={(e) => {
                const updatedFeature = { ...feature, description: e.target.value };
                setFeatures(features.map((f, i) => (i === index ? updatedFeature : f)));
              }}
              placeholder="Description"
              className="block w-full mb-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={feature.image}
              onChange={(e) => {
                const updatedFeature = { ...feature, image: e.target.value };
                setFeatures(features.map((f, i) => (i === index ? updatedFeature : f)));
              }}
              placeholder="Image URL"
              className="block w-full mb-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => updateFeature(index)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
              >
                Update Feature
              </button>
              <button
                onClick={() => deleteFeature(index)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
              >
                Delete Feature
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addFeature}
          className="mt-4 w-full px-4 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-200"
        >
          Add New Feature
        </button>
      </section>

      {/* CTA Section */}
      <section className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">CTA Section</h3>
        <input
          type="text"
          value={cta.title}
          onChange={(e) => setCta({ ...cta, title: e.target.value })}
          placeholder="CTA Title"
          className="block w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={cta.description}
          onChange={(e) => setCta({ ...cta, description: e.target.value })}
          placeholder="CTA Description"
          className="block w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={cta.buttonText}
          onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
          placeholder="CTA Button Text"
          className="block w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={updateCta}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Update CTA
        </button>
        
      </section>
    </div>
  );
};

export default SuperAdminContentPanel;
