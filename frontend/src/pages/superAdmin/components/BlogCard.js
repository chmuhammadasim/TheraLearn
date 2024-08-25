import React from 'react';
import {  FaTrash, FaEye, FaThumbsUp, FaCheckCircle } from 'react-icons/fa';

function BlogCard({ blog, onDelete, onPreview, onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-900 truncate">{blog.title}</h2>
        <input
          type="checkbox"
          className="absolute top-4 right-4"
          onChange={(e) => onSelect(e.target.checked)}
        />
      </div>
      <p className="text-gray-600 mt-2 line-clamp-3">{blog.summary}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <p>By {blog.author}</p>
          <p>{new Date(blog.publishedDate).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-3">
          <span className="flex items-center text-blue-500">
            <FaEye className="mr-1" /> {blog.viewCount}
          </span>
          <span className="flex items-center text-green-500">
            <FaThumbsUp className="mr-1" /> {blog.likes}
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={onPreview}
            className="bg-indigo-500 text-white px-3 py-1 rounded-lg flex items-center space-x-1 hover:bg-indigo-600 transition"
          >
            <FaEye /> <span>Preview</span>
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center space-x-1 hover:bg-red-600 transition"
          >
            <FaTrash /> <span>Delete</span>
          </button>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {blog.status === 'published' ? <FaCheckCircle className="inline mr-1" /> : 'Draft'}
        </span>
      </div>
    </div>
  );
}

export default BlogCard;
