import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { getBlogs } from "../../../services/blogService";
import { motion } from "framer-motion";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="w-20 h-20 border-t-4 border-blue-500 rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="border-b-8 border-yellow-500 relative py-20 bg-gradient-to-tr from-indigo-300 via-purple-400 to-pink-400 min-h-screen overflow-hidden">
      {/* Background Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white bg-opacity-20 rounded-full shadow-xl filter blur-lg"
            style={{
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <motion.h2
          className="p-8 bg-gradient-to-b from-[#ffffff1a] to-[#ffffff08] rounded-2xl shadow-xl backdrop-blur-xl text-4xl md:text-6xl font-extrabold text-white mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Hidden Gems ✨
        </motion.h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="relative bg-gradient-to-bl from-white/10 to-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-110"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              whileHover={{
                rotateX: [0, 10, -10, 0],
                rotateY: [0, -10, 10, 0],
                boxShadow: "0px 25px 40px rgba(0, 0, 0, 0.3)",
              }}
              onClick={() => handleBlogClick(blog._id)}
            >
              <BlogCard {...blog} />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-10 hover:opacity-30 transition-all duration-300 rounded-lg pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Decor Elements */}
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-300 to-blue-500 rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-600 rounded-full animate-bounce" />
    </section>
  );
};

export default BlogSection;
