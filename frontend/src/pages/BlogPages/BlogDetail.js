import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getBlogById,
  likeBlog,
  dislikeBlog,
  submitComment,
} from "../../services/blogService";
import { motion } from "framer-motion";
import { FiShare2 } from "react-icons/fi";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load the blog. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (token) {
      try {
        setBlog((prevBlog) => ({ ...prevBlog, likes: prevBlog.likes + 1 }));
        await likeBlog(id);
      } catch (error) {
        setError("Error liking blog.");
      }
    }
  };

  const handleDislike = async () => {
    if (token) {
      try {
        setBlog((prevBlog) => ({
          ...prevBlog,
          dislikes: prevBlog.dislikes + 1,
        }));
        await dislikeBlog(id);
      } catch (error) {
        setError("Error disliking blog.");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (token && comment.trim()) {
      try {
        const newComment = await submitComment(id, comment);
        setBlog((prevBlog) => ({
          ...prevBlog,
          comments: [...prevBlog.comments, newComment],
        }));
        setComment("");
      } catch (error) {
        setError("Error submitting comment.");
      }
    }
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

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!blog)
    return <div className="text-center text-gray-500">Blog not found</div>;

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-96 h-96 bg-blue-300 rounded-full absolute top-0 left-10 blur-xl opacity-20"
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />
        <motion.div
          className="w-80 h-80 bg-pink-300 rounded-full absolute bottom-0 right-10 blur-xl opacity-20"
          animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        />
      </motion.div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link
          to="/bloglist"
          className="text-blue-600 hover:underline mb-4 inline-block font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          &larr; Back to Blog List
        </Link>
        <motion.div
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={blog.coverImageUrl || "https://via.placeholder.com/800x400"}
            alt={blog.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-8 text-gray-800">
            <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
            <p className="text-lg leading-relaxed mb-6">{blog.content}</p>
            <div className="mt-6">
              <p className="text-gray-600">
                Published on: {new Date(blog.publishedAt).toDateString()}
              </p>
              <p className="text-gray-600">Views: {blog.viewCount}</p>
            </div>
            <div className="flex items-center mt-8 space-x-4">
              {token ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="flex items-center px-4 py-2 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 transition duration-300"
                  >
                    👍 Like ({blog.likes})
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDislike}
                    className="flex items-center px-4 py-2 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition duration-300"
                  >
                    👎 Dislike ({blog.dislikes})
                  </motion.button>
                </>
              ) : (
                <p className="text-gray-600">Login to like or dislike</p>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center px-4 py-2 bg-gray-500 rounded-full text-white shadow-lg hover:bg-gray-600 transition duration-300"
              >
                <FiShare2 className="mr-2" /> Share
              </motion.button>
            </div>
            {/* Comment Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6">Comments</h2>
              {blog.comments.length > 0 ? (
                <ul className="space-y-6">
                  {blog.comments.map((comment, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-t border-gray-300 pt-4"
                    >
                      <p className="text-gray-800 text-lg">{comment.comment}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(comment.date).toDateString()}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  No comments yet. Be the first to comment!
                </p>
              )}
              {token ? (
                <form onSubmit={handleCommentSubmit} className="mt-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus
                    focus
                    focus
                    focus
                    "
                    rows="4"
                    placeholder="Write your comment here..."
                  />{" "}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover
                    transition duration-300"
                  >
                    {" "}
                    Submit Comment{" "}
                  </motion.button>{" "}
                </form>
              ) : (
                <p className="text-gray-600">Login to comment</p>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </motion.div>{" "}
      </div>{" "}
    </div>
  );
};

export default BlogDetail;
