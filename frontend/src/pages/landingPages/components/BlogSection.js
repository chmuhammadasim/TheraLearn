import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { getBlogs } from "../../../services/blogService"; // Service to fetch blogs
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
        const recentBlogs = await getBlogs(); // Fetch recent blogs from API
        setBlogs(recentBlogs.slice(0, 4)); // Display only the latest 4 blogs
        setLoading(false);
      } catch (error) {
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`); // Navigate to the blog detail page
  };

  if (loading) {
    return (
      <div className="border-b-8 border-neutral-500 flex justify-center items-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Floating Decorative Shapes */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-200 rounded-full animate-pulse"></div>
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-purple-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Fun Blogs!
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.1, rotate: 3 }} // Adds a playful zoom and tilt effect
              className="cursor-pointer transform hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden bg-white p-4 relative z-20"
              onClick={() => handleBlogClick(blog._id)}
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </div>
      </div>
      {/* More Floating Decorations */}
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-purple-200 rounded-full animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-300 rounded-full animate-float"></div>
    </section>
  );
};

export default BlogSection;
