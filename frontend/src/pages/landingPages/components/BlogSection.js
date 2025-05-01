import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { getBlogs } from "../../../services/blogService";
import { motion, AnimatePresence } from "framer-motion";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        setLoading(true);
        const recentBlogs = await getBlogs();
        setBlogs(recentBlogs.slice(0, 4));
        setLoading(false);
      } catch (error) {
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
        <div className="relative">
          <motion.div
            className="w-24 h-24 border-t-4 border-b-4 border-white rounded-full"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
        <motion.div 
          className="text-center p-8 bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">Oops!</h3>
          <p className="text-white">{error}</p>
          <button 
            className="mt-4 px-6 py-2 bg-white text-purple-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white bg-opacity-20 rounded-full shadow-xl filter blur-lg"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() * 0.3 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glass morphism divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-cyan-500 bg-opacity-30 backdrop-blur-md z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="inline-block p-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="p-6 bg-gradient-to-b from-[#ffffff30] to-[#ffffff10] rounded-xl backdrop-blur-xl text-5xl md:text-6xl font-extrabold text-white">
              Discover Hidden Gems ✨
            </h2>
          </motion.div>
          <motion.p 
            className="mt-6 text-white text-xl max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore our collection of insightful articles written by therapy experts
          </motion.p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleBlogClick(blog._id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 via-pink-500/70 to-red-500/70 opacity-70 group-hover:opacity-90 transition-all duration-300 z-10" />
              
              <div className="relative bg-white/20 backdrop-blur-lg p-6 h-full z-20 border border-white/30 transition-all duration-500">
                <BlogCard {...blog} />
                
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div 
                      className="absolute bottom-4 right-4 bg-white text-purple-600 px-4 py-2 rounded-full font-bold"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      Read More →
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Glow effect on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-40 blur-xl z-0"
                animate={{ 
                  opacity: hoveredIndex === index ? 0.7 : 0,
                  scale: hoveredIndex === index ? 1.1 : 1
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* View all blogs button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button 
            className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/bloglist")}
          >
            View All Blogs
          </button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-r from-teal-300 to-blue-500 rounded-full blur-xl opacity-40" />
      <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-gradient-to-r from-orange-400 to-red-600 rounded-full blur-xl opacity-40" />
    </section>
  );
};

export default BlogSection;