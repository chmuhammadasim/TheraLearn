import React from 'react';
import { FaTimes } from 'react-icons/fa';

function BlogPreviewModal({ blog, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-4">By {blog.author} | {new Date(blog.publishedDate).toLocaleDateString()}</p>
        <div className="text-gray-800 space-y-4">
          <p>{blog.content}</p>
          {blog.additionalImages && blog.additionalImages.map((url, index) => (
            <img key={index} src={url} alt={`Blog Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" />
          ))}
          {blog.videoUrl && (
            <div className="mt-6">
              <video controls className="w-full rounded-lg shadow-lg">
                <source src={blog.videoUrl} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPreviewModal;
