import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

const PsychologistBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '', slug: '', content: '', summary: '', category: 'Education',
    tags: '', coverImageUrl: '', additionalImages: [], videoUrl: '', audioUrl: '',
    seoTitle: '', seoDescription: '', isPublished: false, allowComments: true,
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const psychologistId = 'psychologist-id'; // Get from context
  const token = localStorage.getItem("authToken");
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/psychologist/${psychologistId}/blogs`, {
          headers: { 'authorization': `Bearer ${token}`,"Content-Type": "application/json", }
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
 
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewBlog({ ...newBlog, additionalImages: files });
  };

  const createBlog = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologist/${psychologistId}/blogs`, newBlog, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBlogs([...blogs, response.data]);
      resetBlogForm();
      setMessage('Blog created successfully!');
    } catch (error) {
      setMessage('Error creating blog.');
    }
  };

  const updateBlog = async (blogId, updatedData) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_KEY}/psychologist/${psychologistId}/blogs/${blogId}`, updatedData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBlogs(blogs.map(blog => blog._id === blogId ? response.data : blog));
      setEditingBlog(null);
      setMessage('Blog updated successfully!');
    } catch (error) {
      setMessage('Error updating blog.');
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_KEY}/psychologist/${psychologistId}/blogs/${blogId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      setMessage('Blog deleted successfully!');
    } catch (error) {
      setMessage('Error deleting blog.');
    }
  };

  const resetBlogForm = () => {
    setNewBlog({
      title: '', slug: '', content: '', summary: '', category: 'Education',
      tags: '', coverImageUrl: '', additionalImages: [], videoUrl: '', audioUrl: '',
      seoTitle: '', seoDescription: '', isPublished: false, allowComments: true,
    });
    setIsCreating(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 mb-24 md:p-10 bg-gradient-to-r from-gray-50 to-gray-100 space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Manage Your Blogs</h1>

      {message && <div className="bg-gray-100 text-gray-800 p-4 rounded-lg shadow-md">{message}</div>}

      <button 
        onClick={() => setIsCreating(true)} 
        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
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
            onClick={() => setIsCreating(false)} 
            className="top-2 right-2 text-red-600 hover:text-red-800 transition">
            X
          </button>
          <h2 className="text-3xl font-bold mb-4 text-gray-700">Create New Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['title', 'slug', 'summary', 'content', 'tags', 'coverImageUrl', 'videoUrl', 'audioUrl', 'seoTitle', 'seoDescription'].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  name={field}
                  value={newBlog[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 transition"
                />
              </div>
            ))}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Additional Images</label>
              <input
                type="file"
                multiple
                onChange={handleAdditionalImagesChange}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 transition"
              />
            </div>
          </div>
          <button 
            onClick={createBlog} 
            className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-800 transition">
            Create Blog
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <motion.div 
            key={blog._id} 
            className="p-4 bg-gray-100 shadow-lg rounded-lg transition transform hover:scale-105"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{blog.title}</h2>
            <p className="mb-4 text-gray-600">{blog.summary}</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setEditingBlog(blog)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-600 transition">
                <FiEdit className="mr-2" /> Edit
              </button>
              <button 
                onClick={() => deleteBlog(blog._id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-600 transition">
                <FiTrash className="mr-2" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {editingBlog && (
        <motion.div 
          className="p-6 bg-gray-100 rounded-lg shadow-lg border-l-4 border-gray-500"
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
        >
          <button 
            onClick={() => setEditingBlog(null)} 
            className="top-2 right-2 text-red-600 hover:text-red-800 transition">
            X
          </button>
          <h2 className="text-3xl font-bold mb-4 text-gray-700">Edit Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['title', 'slug', 'summary', 'content', 'tags', 'coverImageUrl', 'videoUrl', 'audioUrl', 'seoTitle', 'seoDescription'].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  name={field}
                  value={editingBlog[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 transition"
                />
              </div>
            ))}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Additional Images</label>
              <input
                type="file"
                multiple
                onChange={handleAdditionalImagesChange}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-500 transition"
              />
            </div>
          </div>
          <button 
            onClick={() => updateBlog(editingBlog._id, editingBlog)} 
            className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-800 transition">
            Save Changes
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PsychologistBlogPage;
