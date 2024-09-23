import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash, FiSave } from 'react-icons/fi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/psychologist/${psychologistId}/blogs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

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
      const response = await axios.post(`http://localhost:5000/api/psychologist/${psychologistId}/blogs`, newBlog, {
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
      const response = await axios.put(`http://localhost:5000/api/psychologist/${psychologistId}/blogs/${blogId}`, updatedData, {
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
      await axios.delete(`http://localhost:5000/api/psychologist/${psychologistId}/blogs/${blogId}`, {
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

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 mb-24 md:p-10 bg-gradient-to-r from-blue-50 to-purple-50 space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-700">Manage Your Blogs</h1>

      {message && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{message}</div>}

      <button 
        onClick={() => setIsCreating(true)} 
        className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition">
        <AiOutlinePlusCircle size={24} />
        <span>Create New Blog</span>
      </button>

      {isCreating && (
        <motion.div 
          className="p-6 bg-white rounded-lg shadow-xl border-l-4 border-purple-500"
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
        >
          <button 
            onClick={() => setIsCreating(false)} 
            className="top-2 right-2 text-red-600 hover:text-red-800 transition">
            X
          </button>
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Create New Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['title', 'slug', 'summary', 'content', 'tags', 'coverImageUrl', 'videoUrl', 'audioUrl', 'seoTitle', 'seoDescription'].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  name={field}
                  value={newBlog[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-500 transition"
                />
              </div>
            ))}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Additional Images</label>
              <input
                type="file"
                multiple
                onChange={handleAdditionalImagesChange}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-500 transition"
              />
            </div>
          </div>
          <button 
            onClick={createBlog} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition">
            Create Blog
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <motion.div 
            key={blog._id} 
            className="p-4 bg-white shadow-lg rounded-lg transition transform hover:scale-105"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-purple-600">{blog.title}</h2>
            <p className="mb-4 text-gray-600">{blog.summary}</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setEditingBlog(blog)} 
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-yellow-600 transition">
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
          className="p-6 bg-white rounded-lg shadow-xl border-l-4 border-purple-500"
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
        >
          <button 
            onClick={() => setEditingBlog(null)} 
            className="top-2 right-2 text-red-600 hover:text-red-800 transition">
            X
          </button>
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Edit Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['title', 'slug', 'summary', 'content', 'tags', 'coverImageUrl', 'videoUrl', 'audioUrl', 'seoTitle', 'seoDescription'].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  name={field}
                  value={editingBlog[field]}
                  onChange={(e) => setEditingBlog({ ...editingBlog, [field]: e.target.value })}
                  placeholder={`Edit ${field}`}
                  className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-500 transition"
                />
              </div>
            ))}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Additional Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setEditingBlog({ ...editingBlog, additionalImages: Array.from(e.target.files) })}
                className="p-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-500 transition"
              />
            </div>
          </div>
          <button 
            onClick={() => updateBlog(editingBlog._id, editingBlog)} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition">
            <FiSave className="mr-2" /> Save Changes
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PsychologistBlogPage;
