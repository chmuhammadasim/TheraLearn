import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";

const PsychologistBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    summary: "",
    category: "Education",
    tags: "",
    coverImageUrl: "",
    additionalImages: [],
    videoUrl: "",
    audioUrl: "",
    seoTitle: "",
    seoDescription: "",
    isPublished: false,
    allowComments: true,
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");
  const psychologistId = "psychologist-id"; // replace with actual ID
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/psychologist/${psychologistId}/blogs`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setBlogs(response.data);
      } catch (error) {
        setMessage("Error fetching blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [token, psychologistId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, additionalImages: files }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // replace with your upload preset

      setIsUploading(true);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/do7z15tdv/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          setUploadedImage(data.secure_url);
          setFormData((prev) => ({ ...prev, coverImageUrl: data.secure_url }));
          console.log("Image uploaded successfully:", data);
        } else {
          console.error("Image upload failed:", data);
          setMessage("Image upload failed, please try again.");
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        setMessage("Image upload failed, please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmitCreate = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/psychologist/${psychologistId}/blogs`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      resetForm();
      setMessage("Blog created successfully!");
    } catch (error) {
      setMessage("Error creating blog. Please try again.");
    }
  };
  const handleSubmit = async () => {
    if (editingBlogId) {
      await handleSubmitUpdate(); // Call update function if editing
    } else {
      await handleSubmitCreate(); // Call create function if creating
    }
  };
  const handleSubmitUpdate = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/psychologist/${psychologistId}/blogs/${editingBlogId}`;
    try {
      const response = await axios.put(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === editingBlogId ? response.data : blog
        )
      );
      resetForm();
      setMessage("Blog updated successfully!");
    } catch (error) {
      setMessage("Error updating blog. Please try again.");
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/psychologist/${psychologistId}/blogs/${blogId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      setMessage("Blog deleted successfully!");
    } catch (error) {
      setMessage("Error deleting blog. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      summary: "",
      category: "Education",
      tags: "",
      coverImageUrl: "",
      additionalImages: [],
      videoUrl: "",
      audioUrl: "",
      seoTitle: "",
      seoDescription: "",
      isPublished: false,
      allowComments: true,
    });
    setUploadedImage(null);
    setEditingBlogId(null);
    setIsCreating(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 mb-24 md:p-10 bg-gradient-to-r from-gray-50 to-gray-100 space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
        Manage Your Blogs
      </h1>

      {message && (
        <div className="bg-gray-100 text-gray-800 p-4 rounded-lg shadow-md">
          {message}
        </div>
      )}

      <button
        onClick={() => setIsCreating(true)}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition"
      >
        <AiOutlinePlusCircle size={24} />
        <span>Create New Blog</span>
      </button>

      {isCreating && (
        <motion.div
          className="p-6 bg-gray-100 rounded-lg shadow-lg border-l-4 border-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <button
            onClick={resetForm}
            className="top-2 right-2 text-red-600 hover:text-red-800 transition"
          >
            X
          </button>
          <h2 className="text-3xl font-bold mb-4 text-gray-700">
            Create New Blog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "title",
              "slug",
              "summary",
              "content",
              "tags",
              "videoUrl",
              "audioUrl",
              "seoTitle",
              "seoDescription",
            ].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 transition"
                />
              </div>
            ))}
            <div className="form-group flex flex-col">
              <label className="block text-left text-lg font-medium text-[#2c3e50]">
                Cover Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ff8b]"
              />
              {isUploading && (
                <p className="text font-semibold text-cyan-950">
                  Uploading Image...
                </p>
              )}
              {uploadedImage && (
                <p className="text font-semibold text-cyan-950">
                  Image Uploaded Successfully!
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                Additional Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleAdditionalImagesChange}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 transition"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit} // Use the unified submit handler
            className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-800 transition"
          >
            {editingBlogId ? "Update Blog" : "Create Blog"}{""}
            {/* Change button text based on mode */}
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
          >
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-sm text-gray-600">{blog.summary}</p>
            <p className="text-sm text-gray-600">Tags: {blog.slug}</p>
            <p className="text-sm text-gray-600">Content: {blog.content}</p>
            <p className="text-sm text-gray-600">
              Published: {blog.isPublished ? "Yes" : "No"}
            </p>

            <img
              src={blog.coverImageUrl}
              alt={blog.title}
              className="mt-2 rounded-md"
            />
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => {
                  setEditingBlogId(blog._id);
                  setFormData({ ...blog });
                  setIsCreating(true);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center"
              >
                <FiEdit size={16} /> Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center"
              >
                <FiTrash size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PsychologistBlogPage;
