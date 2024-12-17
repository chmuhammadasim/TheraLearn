import React, { useState, useEffect } from "react";
import axios from "axios";

const SuperAdminContentPanel = () => {
  const [hero, setHero] = useState({ title: "", subtitle: "", buttonText: "" });
  const [features, setFeatures] = useState([]);
  const [cta, setCta] = useState({
    title: "",
    description: "",
    buttonText: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const token = localStorage.getItem("authToken");

  const handleError = (error, defaultMessage) => {
    console.error(error);
    setError(error?.response?.data?.message || defaultMessage);
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_KEY}/content`
        );
        const content = data.content;
        if (!content.hero || !content.features.length || !content.cta) {
          setError("Content is missing. Please update the content.");
        } else {
          setHero(content.hero);
          setFeatures(content.features);
          setCta(content.cta);
        }
      } catch (err) {
        setError("Content is missing. Please update the content.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const validateFeature = (feature) => feature.title && feature.description && feature.image;

  const validateHero = () => hero.title && hero.subtitle && hero.buttonText;
  const validateCta = () => cta.title && cta.description && cta.buttonText;

  const makeApiRequest = async (callback) => {
    setActionLoading(true);
    try {
      await callback();
      setError(null);
    } catch (err) {
      handleError(err, "Action failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const updateHero = () => {
    if (!validateHero()) {
      setError("All hero fields are required.");
      return;
    }
    makeApiRequest(async () => {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/content/update-hero`,
        hero,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setError("Hero section updated successfully!");
    });
  };

  const updateFeature = (index) => {
    const feature = features[index];
    if (!validateFeature(feature)) {
      setError("All feature fields are required.");
      return;
    }
    makeApiRequest(async () => {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/content/update-feature/${index}`,
        feature,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setError("Feature updated successfully!");
    });
  };

  const deleteFeature = (index) => {
    makeApiRequest(async () => {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/content/delete-feature/${index}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setFeatures((prev) => prev.filter((_, i) => i !== index));
      setError("Feature deleted successfully!");
    });
  };

  const addFeature = () => {
    setFeatures((prev) => [
      ...prev,
      { icon: "", title: "", description: "", image: "" },
    ]);
  };

  const updateCta = () => {
    if (!validateCta()) {
      setError("All CTA fields are required.");
      return;
    }
    makeApiRequest(async () => {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/content/update-cta`,
        cta,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setError("CTA section updated successfully!");
    });
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      setIsUploading(true);
      setUploadError(null);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/do7z15tdv/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (data.secure_url) {
          const updatedFeature = features.map((f, i) =>
            i === index ? { ...f, image: data.secure_url } : f
          );
          setFeatures(updatedFeature);
          await axios.put(
            `${process.env.REACT_APP_API_KEY}/content/update-feature/${index}`,
            updatedFeature[index],
            { headers: { authorization: `Bearer ${token}` } }
          );
          setUploadError("Image uploaded successfully!");
        } else {
          setUploadError("Image upload failed, please try again.");
        }
      } catch (error) {
        setUploadError("Image upload failed, please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 pt-20 bg-gray-100 min-h-screen">
      <h2 className="text-4xl text-center font-semibold text-gray-900 mb-12">
        Super Admin Content Panel
      </h2>

      {error && (
        <div className="mb-6 p-4 text-white bg-red-600 border border-red-500 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* Hero Section */}
      <section className="mb-10 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Hero Section</h3>
        <input
          type="text"
          value={hero.title}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
          placeholder="Hero Title"
          className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          value={hero.subtitle}
          onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
          placeholder="Hero Subtitle"
          className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          value={hero.buttonText}
          onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
          placeholder="Hero Button Text"
          className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={updateHero}
          disabled={actionLoading}
          className={`w-full px-4 py-3 rounded-md transition ${
            actionLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {actionLoading ? "Updating..." : "Update Hero"}
        </button>
      </section>

      {/* Features Section */}
      <section className="mb-10 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Features Section</h3>
        {features.map((feature, index) => (
          <div key={index} className="mb-6 pb-6 border-b border-gray-200">
            <input
              type="text"
              value={feature.icon}
              onChange={(e) =>
                setFeatures((prev) =>
                  prev.map((f, i) => (i === index ? { ...f, icon: e.target.value } : f))
                )
              }
              placeholder="Feature Icon"
              className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="text"
              value={feature.title}
              onChange={(e) =>
                setFeatures((prev) =>
                  prev.map((f, i) => (i === index ? { ...f, title: e.target.value } : f))
                )
              }
              placeholder="Feature Title"
              className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="text"
              value={feature.description}
              onChange={(e) =>
                setFeatures((prev) =>
                  prev.map((f, i) => (i === index ? { ...f, description: e.target.value } : f))
                )
              }
              placeholder="Feature Description"
              className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Feature Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                className="block w-full mb-4 p-4 border border-gray-300 rounded-md"
              />
              {isUploading && <p className="text-gray-500">Uploading...</p>}
              {uploadError && <p className="text-red-500">{uploadError}</p>}
              {feature.image && (
                <img
                  src={feature.image}
                  alt="Uploaded Feature"
                  className="w-32 h-32 mt-2 rounded-md object-cover"
                />
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => updateFeature(index)}
                className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Update Feature
              </button>
              <button
                onClick={() => deleteFeature(index)}
                className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Feature
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addFeature}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New Feature
        </button>
      </section>

      {/* CTA Section */}
      <section className="mb-10 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">CTA Section</h3>
        <input
          type="text"
          value={cta.title}
          onChange={(e) => setCta({ ...cta, title: e.target.value })}
          placeholder="CTA Title"
          className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          value={cta.description}
          onChange={(e) => setCta({ ...cta, description: e.target.value })}
          placeholder="CTA Description"
          className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          value={cta.buttonText}
          onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
          placeholder="CTA Button Text"
          className="block w-full mb-4 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={updateCta}
          disabled={actionLoading}
          className={`w-full px-4 py-3 rounded-md transition ${
            actionLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {actionLoading ? "Updating..." : "Update CTA"}
        </button>
      </section>
    </div>
  );
};

export default SuperAdminContentPanel;
