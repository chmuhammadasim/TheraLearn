import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog/all');
        setBlogs(response.data.data);
        setFilteredBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100">
      <h1 className="text-5xl font-bold text-center text-blue-900 mb-12">Our Blog</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {filteredBlogs.map(blog => (
            <motion.div
              key={blog._id}
              className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to={`/blog/${blog._id}`}>
                <motion.img
                  src={blog.image || 'https://via.placeholder.com/400x200'}
                  alt={blog.title}
                  className="w-full h-48 object-cover filter brightness-90 hover:brightness-110 transition-all duration-500"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="p-6">
                  <h2 className="text-3xl font-semibold text-gray-800">{blog.title}</h2>
                  <p className="text-gray-600 mt-4">{blog.excerpt}</p>
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-blue-500 font-semibold">Read more...</p>
                    <motion.div
                      className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;
