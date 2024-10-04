import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog/all');
        setBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = async (blogId) => {
    try {
      await axios.post(`http://localhost:5000/api/blog/increment-views/${blogId}`);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  return (
    <div className="relative min-h-screen pt-20 bg-gradient-to-r from-[#f9d423] via-[#ff6338] to-[#f9d423] overflow-hidden">
      {/* Full-screen background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      >
        <motion.div
          className="w-96 h-96 bg-blue-500 rounded-full absolute top-10 left-10 filter blur-xl opacity-20"
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        />
        <motion.div
          className="w-80 h-80 bg-pink-500 rounded-full absolute bottom-10 right-10 filter blur-xl opacity-20"
          animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="p-6 bg-black bg-opacity-20 rounded-full text-5xl font-extrabold text-white mb-12 text-center relative z-10">
          Our Blog
        </h1>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {blogs.map(blog => (
              <motion.div
                key={blog._id}
                className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/blog/${blog._id}`} onClick={() => handleBlogClick(blog._id)}>
                  <motion.img
                    src={blog.coverImageUrl || 'https://via.placeholder.com/400x200'}
                    alt={blog.title}
                    className="w-full h-48 object-cover filter brightness-90 hover:brightness-110 transition-all duration-500"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h2>
                    <p className="text-gray-600 mb-6">{blog.summary}</p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-blue-500 font-semibold cursor-pointer hover:underline">Read more...</p>
                      <motion.div
                        className="bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
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
    </div>
  );
};

export default BlogList;
