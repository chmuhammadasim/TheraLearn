import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById, likeBlog, dislikeBlog, submitComment } from '../../services/blogService';
import { motion } from 'framer-motion';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (token) {
      try {
        await likeBlog(id, token);
        setBlog(prevBlog => ({ ...prevBlog, likes: prevBlog.likes + 1 }));
      } catch (error) {
        console.error('Error liking blog:', error);
      }
    }
  };

  const handleDislike = async () => {
    if (token) {
      try {
        await dislikeBlog(id, token);
        setBlog(prevBlog => ({ ...prevBlog, dislikes: prevBlog.dislikes + 1 }));
      } catch (error) {
        console.error('Error disliking blog:', error);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (token && comment.trim()) {
      try {
        const newComment = await submitComment(id, comment, token);
        setBlog(prevBlog => ({
          ...prevBlog,
          comments: [...prevBlog.comments, newComment]
        }));
        setComment('');
      } catch (error) {
        console.error('Error commenting on the blog:', error);
      }
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!blog) return <div className="text-center text-gray-500">Blog not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blogs" className="text-blue-600 hover:underline mb-4 inline-block font-semibold transition duration-300 ease-in-out transform hover:scale-105">
        &larr; Back to Blog List
      </Link>
      <motion.div
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img
          src={blog.coverImageUrl || 'https://via.placeholder.com/800x400'}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-8 text-white">
          <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
          <p className="text-lg leading-relaxed mb-6">{blog.content}</p>
          <div className="mt-6">
            <p className="text-gray-400">Published on: {new Date(blog.publishedAt).toDateString()}</p>
            <p className="text-gray-400">Views: {blog.viewCount}</p>
          </div>
          {token && (
            <div className="flex items-center mt-8 space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className="flex items-center px-4 py-2 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                👍 Like ({blog.likes})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDislike}
                className="flex items-center px-4 py-2 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition duration-300 ease-in-out"
              >
                👎 Dislike ({blog.dislikes})
              </motion.button>
            </div>
          )}
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
                    className="border-t border-gray-700 pt-4"
                  >
                    <p className="text-white text-lg">{comment.comment}</p>
                    <p className="text-sm text-gray-400">{new Date(comment.date).toDateString()}</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            )}
            {token && (
              <form onSubmit={handleCommentSubmit} className="mt-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-600 rounded-lg p-4 text-black focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  placeholder="Write a comment..."
                  rows="4"
                ></textarea>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Submit Comment
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
