import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

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

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (category === 'all' || blog.category === category)
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen  pb-20 bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-hidden">
      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${8 + Math.floor(Math.random() * 16)} h-${8 + Math.floor(Math.random() * 16)} bg-${Math.random() > 0.5 ? 'pink' : 'blue'}-400 rounded-full blur-xl opacity-${20 + Math.floor(Math.random() * 30)}`}
            animate={{ 
              y: [Math.random() * -20, Math.random() * 20, Math.random() * -20], 
              x: [Math.random() * -20, Math.random() * 20, Math.random() * -20] 
            }}
            transition={{ repeat: Infinity, duration: 8 + Math.random() * 10 }}
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              zIndex: 0 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <motion.h1
          className="text-center text-3xl mt-14 sm:text-4xl md:text-6xl font-extrabold text-white mb-6 md:mb-10 p-3 md:p-4 bg-black bg-opacity-30 rounded-2xl md:rounded-full shadow-lg backdrop-blur-md"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore Inspiring Stories
        </motion.h1>

        {/* Search and Filter Bar */}
        <motion.div 
          className="mb-8 md:mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pl-10 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-gray-300 border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="py-3 px-4 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-gray-300 border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all" className="bg-gray-800">All Categories</option>
            <option value="health" className="bg-gray-800">Health</option>
            <option value="wellness" className="bg-gray-800">Wellness</option>
            <option value="therapy" className="bg-gray-800">Therapy</option>
          </select>
        </motion.div>

        {error ? (
          <div className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl">
            <div className="text-red-400 text-xl mb-4">{error}</div>
            <motion.button 
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Refresh
            </motion.button>
          </div>
        ) : (
          <>
            {/* Blog count display */}
            <motion.p 
              className="text-center mb-6 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </motion.p>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                hidden: { opacity: 0 },
              }}
            >
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  className="relative group border-l-4 border-cyan-200 hover:border-l-8 hover:border-pink-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-xl overflow-hidden transition-all transform hover:scale-102 hover:translate-y-[-5px] hover:shadow-2xl"
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 50 },
                  }}
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={`/blog/${blog._id}`} onClick={() => handleBlogClick(blog._id)}>
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={blog.coverImageUrl || 'https://via.placeholder.com/400x200'}
                        alt={blog.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 m-3 bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs text-white">
                        {blog.category || 'Uncategorized'}
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-pink-500 transition-all duration-500 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="mt-3 md:mt-4 text-gray-200 md:text-gray-300 text-sm md:text-base line-clamp-3">{blog.summary}</p>

                      <div className="flex flex-wrap items-center mt-4 space-x-3 text-xs md:text-sm">
                        <span className="bg-black bg-opacity-30 px-2 py-1 rounded-full text-gray-300 flex items-center">
                          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {blog.author || 'Anonymous'}
                        </span>
                        <span className="bg-black bg-opacity-30 px-2 py-1 rounded-full text-gray-300 flex items-center whitespace-nowrap">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-black bg-opacity-30 px-2 py-1 rounded-full text-gray-300 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {blog.views || 0}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <motion.p
                          className="text-blue-400 font-semibold cursor-pointer hover:text-blue-600 transition-colors duration-500 text-sm md:text-base flex items-center"
                          whileHover={{ textShadow: '0px 0px 8px rgba(0, 204, 255, 0.8)' }}
                        >
                          Read more
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.p>
                        <motion.div
                          className="p-2 md:p-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full shadow-lg hover:shadow-purple-500/50 text-white cursor-pointer"
                          whileHover={{ scale: 1.15, rotate: 90 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            {filteredBlogs.length === 0 && !error && (
              <motion.div 
                className="text-center p-10 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-lg text-gray-300">No blogs matching your search</p>
                <button 
                  onClick={() => {setSearchTerm(''); setCategory('all');}}
                  className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-full text-white transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </>
        )}
        
        {/* Back to Top Button */}
        <motion.button
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default BlogList;
