import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/blog/all`);
        if (response.data.data.length === 0) {
          setError('No blogs found.');
        } else {
          setBlogs(response.data.data);
        }
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = async (blogId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_KEY}/blog/increment-views/${blogId}`);
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen pt-20 bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-10 h-10 bg-pink-400 rounded-full blur-xl opacity-40"
          animate={{ y: [0, -20, 0], x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 10 }}
          style={{ top: '15%', left: '5%' }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-blue-400 rounded-full blur-xl opacity-40"
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 12 }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.h1
          className="text-center text-6xl font-extrabold text-white mb-16 p-4 bg-black bg-opacity-30 rounded-full shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore Inspiring Stories
        </motion.h1>

        {error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
              hidden: { opacity: 0 },
            }}
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="relative group border-l-4 border-cyan-200 hover:border-l-8 hover:border-pink-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transition-all transform hover:scale-110 hover:rotate-3 hover:shadow-2xl"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 },
                }}
              >
                <Link to={`/blog/${blog._id}`} onClick={() => handleBlogClick(blog._id)}>
                  <motion.img
                    src={blog.coverImageUrl || 'https://via.placeholder.com/400x200'}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-t-3xl transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105"
                  />

                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-white group-hover:text-pink-500 transition-all duration-500">
                      {blog.title}
                    </h2>
                    <p className="mt-4 text-gray-300 line-clamp-3">{blog.summary}</p>

                    <div className="flex justify-between items-center mt-8">
                      <motion.p
                        className="text-blue-400 font-semibold cursor-pointer hover:text-blue-600 transition-colors duration-500"
                        whileHover={{ textShadow: '0px 0px 8px rgba(0, 204, 255, 0.8)' }}
                      >
                        Read more
                      </motion.p>
                      <motion.div
                        className="p-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full shadow-lg hover:shadow-purple-500/50 text-white cursor-pointer"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 1 }}
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
