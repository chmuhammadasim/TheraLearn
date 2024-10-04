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
      <div className="flex justify-center items-center min-h-screen">
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className=" text-4xl md:text-5xl font-bold mb-12 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          From Our Blog
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }} // Adds a subtle zoom effect on hover
              className="cursor-pointer"
              onClick={() => handleBlogClick(blog._id)} // Ensures navigation works on click
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
