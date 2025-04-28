import React, { useState, useEffect } from "react";
import axios from "axios";

const SuperAdminContentPanel = () => {
  const [hero, setHero] = useState({ title: "", subtitle: "", buttonText: "" });
  const [features, setFeatures] = useState([]);
  const [cta, setCta] = useState({ title: "", description: "", buttonText: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const token = localStorage.getItem("authToken");

  const handleError = (err, defaultMessage) => {
    console.error(err);
    setError(err.response?.data?.message || defaultMessage);
  };

  const fetchContent = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/content`);
      const content = data.content || {};
      if (!content.hero || !content.features?.length || !content.cta) {
        setError("Content is missing. Please update the content.");
      } else {
        setHero(content.hero);
        setFeatures(content.features);
        setCta(content.cta);
      }
    } catch {
      setError("Content is missing. Please update the content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const validateFeature = (feature) =>
    feature.title && feature.description && feature.image;
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
    makeApiRequest(async () =>
      axios.put(`${process.env.REACT_APP_API_KEY}/content/update-hero`, hero, {
        headers: { authorization: `Bearer ${token}` },
      })
    );
  };

  const updateFeature = (index) => {
    const feature = features[index];
    if (!validateFeature(feature)) {
      setError("All feature fields are required.");
      return;
    }
    makeApiRequest(async () =>
      axios.put(
        `${process.env.REACT_APP_API_KEY}/content/update-feature/${index}`,
        feature,
        { headers: { authorization: `Bearer ${token}` } }
      )
    );
  };

  const deleteFeature = (index) => {
    makeApiRequest(async () => {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/content/delete-feature/${index}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setFeatures((prev) => prev.filter((_, i) => i !== index));
    });
  };

  const addFeature = () => {
    setFeatures((prev) => [...prev, { icon: "", title: "", description: "", image: "" }]);
  };

  const updateCta = () => {
    if (!validateCta()) {
      setError("All CTA fields are required.");
      return;
    }
    makeApiRequest(async () =>
      axios.put(`${process.env.REACT_APP_API_KEY}/content/update-cta`, cta, {
        headers: { authorization: `Bearer ${token}` },
      })
    );
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    setIsUploading(true);
    setUploadError(null);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/do7z15tdv/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        const updated = features.map((f, i) => (i === index ? { ...f, image: data.secure_url } : f));
        setFeatures(updated);
        await axios.put(
          `${process.env.REACT_APP_API_KEY}/content/update-feature/${index}`,
          updated[index],
          { headers: { authorization: `Bearer ${token}` } }
        );
      } else {
        setUploadError("Image upload failed, please try again.");
      }
    } catch {
      setUploadError("Image upload failed, please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500"></div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-8 mt-20 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]"></div>
      <div className="mb-12 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow-lg bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
          Super Admin Content Panel
        </h2>
        <p className="text-base sm:text-lg text-gray-500">
          Manage your landing page content easily
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 text-white bg-red-600 border border-red-500 rounded-lg shadow relative z-10">
          {error}
        </div>
      )}

      {/* Hero */}
      <section className="mb-16 p-4 sm:p-8 bg-white/90 rounded-2xl shadow-2xl border border-indigo-100 relative z-10 hover:shadow-indigo-200 transition-shadow duration-300">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mr-2"></span>
          Hero Section
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              placeholder="Title"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-indigo-50/50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Subtitle</label>
            <input
              type="text"
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              placeholder="Subtitle"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-indigo-50/50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Button Text</label>
            <input
              type="text"
              value={hero.buttonText}
              onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
              placeholder="Button Text"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-indigo-50/50"
            />
          </div>
        </div>
        <button
          onClick={updateHero}
          disabled={actionLoading}
          className={`w-full mt-6 px-4 py-3 rounded-lg text-lg font-semibold shadow flex items-center justify-center gap-2 transition ${
            actionLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          }`}
        >
          <span className="material-icons">save</span>
          {actionLoading ? "Updating..." : "Update Hero"}
        </button>
      </section>

      {/* Divider */}
      <div className="flex items-center mb-12 relative z-10">
        <div className="flex-grow border-t border-indigo-200"></div>
        <span className="mx-4 text-indigo-400 font-bold text-lg">Features</span>
        <div className="flex-grow border-t border-indigo-200"></div>
      </div>

      {/* Features */}
      <section className="mb-16 p-4 sm:p-8 bg-white/90 rounded-2xl shadow-2xl border border-indigo-100 relative z-10">
        <div className="space-y-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-xl border border-gray-200 bg-indigo-50/60 shadow-lg flex flex-col md:flex-row gap-6 items-start hover:shadow-indigo-200 transition-shadow duration-300 group relative"
            >
              <span className="absolute -top-4 -left-4 bg-gradient-to-br from-indigo-500 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Feature #{index + 1}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1 w-full">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">Icon</label>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) =>
                      setFeatures((prev) =>
                        prev.map((f, i) => (i === index ? { ...f, icon: e.target.value } : f))
                      )
                    }
                    placeholder="Icon"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-white/80"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      setFeatures((prev) =>
                        prev.map((f, i) => (i === index ? { ...f, title: e.target.value } : f))
                      )
                    }
                    placeholder="Title"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-white/80"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">Description</label>
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) =>
                      setFeatures((prev) =>
                        prev.map((f, i) => (i === index ? { ...f, description: e.target.value } : f))
                      )
                    }
                    placeholder="Description"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-white/80"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">Feature Image</label>
                  <label className="flex flex-col items-center px-4 py-2 bg-white border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
                    <span className="material-icons text-indigo-400 mb-1">cloud_upload</span>
                    <span className="text-xs text-indigo-500">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                    />
                  </label>
                  {isUploading && <p className="text-gray-500 text-xs mt-1">Uploading...</p>}
                  {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
                  {feature.image && (
                    <img
                      src={feature.image}
                      alt="Uploaded"
                      className="w-20 h-20 mt-2 rounded-lg object-cover border border-indigo-200 shadow"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
                <button
                  onClick={() => updateFeature(index)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold shadow flex items-center gap-1 transition"
                  title="Update Feature"
                >
                  <span className="material-icons text-base">save</span>
                  Update
                </button>
                <button
                  onClick={() => deleteFeature(index)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 font-semibold shadow flex items-center gap-1 transition"
                  title="Delete Feature"
                >
                  <span className="material-icons text-base">delete</span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addFeature}
          className="w-full mt-10 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 font-semibold text-lg shadow flex items-center justify-center gap-2 transition"
        >
          <span className="material-icons">add_circle</span>
          Add New Feature
        </button>
      </section>

      {/* Divider */}
      <div className="flex items-center mb-12 relative z-10">
        <div className="flex-grow border-t border-indigo-200"></div>
        <span className="mx-4 text-indigo-400 font-bold text-lg">CTA Section</span>
        <div className="flex-grow border-t border-indigo-200"></div>
      </div>

      {/* CTA */}
      <section className="mb-10 p-4 sm:p-8 bg-white/90 rounded-2xl shadow-2xl border border-indigo-100 relative z-10 hover:shadow-indigo-200 transition-shadow duration-300">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mr-2"></span>
          CTA Section
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={cta.title}
              onChange={(e) => setCta({ ...cta, title: e.target.value })}
              placeholder="Title"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-indigo-50/50"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Button Text</label>
            <input
              type="text"
              value={cta.buttonText}
              onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
              placeholder="Button Text"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full bg-indigo-50/50"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
          <textarea
            value={cta.description}
            onChange={(e) => setCta({ ...cta, description: e.target.value })}
            placeholder="Description"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[100px] bg-indigo-50/50"
          />
        </div>
        <button
          onClick={updateCta}
          disabled={actionLoading}
          className={`w-full mt-6 px-4 py-3 rounded-lg text-lg font-semibold shadow flex items-center justify-center gap-2 transition ${
            actionLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          }`}
        >
          <span className="material-icons">save</span>
          {actionLoading ? "Updating..." : "Update CTA"}
        </button>
      </section>
    </div>
  );
};

export default SuperAdminContentPanel;
