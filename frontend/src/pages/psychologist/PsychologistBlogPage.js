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
    axios.get(`http://localhost:5000/api/psychologist/${psychologistId}/blogs`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => setBlogs(response.data))
    .catch(error => console.error('Error fetching blogs:', error));
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewBlog({ ...newBlog, additionalImages: files });
  };

  const createBlog = () => {
    axios.post(`http://localhost:5000/api/psychologist/${psychologistId}/blogs`, newBlog, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      setBlogs([...blogs, response.data]);
      resetBlogForm();
      setMessage('Blog created successfully!');
    })
    .catch(error => setMessage('Error creating blog.'));
  };

  const updateBlog = (blogId, updatedData) => {
    axios.put(`http://localhost:5000/api/psychologist/${psychologistId}/blogs/${blogId}`, updatedData, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      setBlogs(blogs.map(blog => blog._id === blogId ? response.data : blog));
      setEditingBlog(null);
      setMessage('Blog updated successfully!');
    })
    .catch(error => setMessage('Error updating blog.'));
  };

  const deleteBlog = (blogId) => {
    axios.delete(`http://localhost:5000/api/psychologist/${psychologistId}/blogs/${blogId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      setMessage('Blog deleted successfully!');
    })
    .catch(error => setMessage('Error deleting blog.'));
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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Manage Your Blogs</h1>

      {message && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{message}</div>}

      <button 
        onClick={() => setIsCreating(true)} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 flex items-center space-x-2 hover:bg-blue-600 transition">
        <AiOutlinePlusCircle size={24} />
        <span>Create New Blog</span>
      </button>

      {isCreating && (
        <motion.div 
          className="p-4 bg-gray-100 rounded-lg mb-6 shadow-lg relative"
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
        >
          <button 
            onClick={() => setIsCreating(false)} 
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition">
            X
          </button>
          <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['title', 'slug', 'summary', 'content', 'tags', 'coverImageUrl', 'videoUrl', 'audioUrl', 'seoTitle', 'seoDescription'].map((field, index) => (
              <input
                key={index}
                name={field}
                value={newBlog[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="p-2 border rounded-md focus:ring focus:ring-blue-500 transition"
              />
            ))}
            <input
              type="file"
              multiple
              onChange={handleAdditionalImagesChange}
              className="p-2 border rounded-md focus:ring focus:ring-blue-500 transition"
            />
          </div>
          <button 
            onClick={createBlog} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition">
            Create Blog
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {blogs.map(blog => (
          <div key={blog._id} className="p-4 bg-white shadow-lg rounded-lg transition transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="mb-4">{blog.summary}</p>
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
          </div>
        ))}
      </div>

      {editingBlog && (
        <motion.div 
          className="p-4 bg-gray-100 rounded-lg mt-6 shadow-lg relative"
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
        >
          <button 
            onClick={() => setEditingBlog(null)} 
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition">
            X
          </button>
          <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['title', 'slug', 'summary', 'content', 'tags', 'coverImageUrl', 'videoUrl', 'audioUrl', 'seoTitle', 'seoDescription'].map((field, index) => (
              <input
                key={index}
                name={field}
                value={editingBlog[field]}
                onChange={(e) => setEditingBlog({ ...editingBlog, [field]: e.target.value })}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="p-2 border rounded-md focus:ring focus:ring-blue-500 transition"
              />
            ))}
            <input
              type="file"
              multiple
              onChange={(e) => setEditingBlog({ ...editingBlog, additionalImages: Array.from(e.target.files) })}
              className="p-2 border rounded-md focus:ring focus:ring-blue-500 transition"
            />
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
