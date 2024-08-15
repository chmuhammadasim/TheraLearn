import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!blog) return <div className="text-center text-gray-500">Blog not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blogs" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Blog List
      </Link>
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={blog.image || 'https://via.placeholder.com/800x400'}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-6">{blog.content}</p>
          <div className="mt-6">
            <p className="text-gray-500">Published on: {new Date(blog.publishedAt).toDateString()}</p>
          </div>
          <div className="flex items-center mt-4">
            <img
              src={blog.authorProfilePicture || 'https://via.placeholder.com/50'}
              alt={blog.author}
              className="w-12 h-12 rounded-full mr-3"
            />
            <p className="text-gray-700">{blog.author}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
