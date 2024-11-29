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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          className="w-16 h-16 border-t-4 border-indigo-500 rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  if (error) return <div className="text-center text-red-400">{error}</div>;
  if (!blog)
    return <div className="text-center text-gray-400">Blog not found</div>;

  return (
    <div className="relative py-20 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Animated Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="w-72 h-72 bg-purple-700 rounded-full absolute top-10 left-20 blur-3xl opacity-30"
          animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 18 }}
        />
        <motion.div
          className="w-64 h-64 bg-blue-600 rounded-full absolute bottom-0 right-20 blur-2xl opacity-30"
          animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0] }}
          transition={{ repeat: Infinity, duration: 22 }}
        />
      </motion.div>

      <div className="container mx-auto px-8 relative z-10">
        <Link
          to="/bloglist"
          className="text-indigo-400 hover:underline mb-4 inline-block font-bold text-lg transform hover:scale-110 transition duration-300"
        >
          &larr; Back to Blog List
        </Link>

        <motion.div
          className="backdrop-blur-lg bg-white rounded-lg shadow-xl p-8 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={blog.coverImageUrl || "https://via.placeholder.com/800x400"}
            alt={blog.title}
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="mt-6">
            <h1 className="text-5xl font-extrabold text-black">{blog.title}</h1>
            <p className="text-black text-lg mt-4 leading-relaxed">
              {blog.content}
            </p>
          </div>

          <div className="mt-8  flex items-center space-x-4">
            {token ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #00FF00" }}
                  onClick={handleLike}
                  className="bg-green-500 text-black px-6 py-2 rounded-full hover:bg-green-600 transition-all"
                >
                  👍 Like ({blog.likes})
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #FF0000" }}
                  onClick={handleDislike}
                  className="bg-red-500 text-black px-6 py-2 rounded-full hover:bg-red-600 transition-all"
                >
                  👎 Dislike ({blog.dislikes})
                </motion.button>
              </>
            ) : (
              <p className="text-black">Login to like or dislike</p>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-gray-700 text-black px-6 py-2 rounded-full shadow-lg hover:bg-gray-600"
            >
              <FiShare2 className="mr-2" /> Share
            </motion.button>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-black">Comments</h2>

            {blog.comments.length > 0 ? (
              <ul className="mt-6 space-y-6">
                {blog.comments.map((comment, index) => (
                  <motion.li
                    key={index}
                    className="bg-gray-800/60 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <p className="text-black">{comment.comment}</p>
                    <p className="text-black text-sm">
                      {new Date(comment.date).toDateString()}
                    </p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-black mt-4">No comments yet. Be the first!</p>
            )}

            {token ? (
              <form onSubmit={handleCommentSubmit} className="mt-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write your comment..."
                  rows="4"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-4 bg-indigo-500 px-6 py-2 text-black rounded-lg hover:bg-indigo-600 transition-all"
                >
                  Submit Comment
                </motion.button>
              </form>
            ) : (
              <p className="text-gray-400 mt-4">Login to comment</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
