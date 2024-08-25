import React from 'react';

function BlogCard({ blog, onDelete, onPreview, onSelect, onToggleActive }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-sm mb-4">{blog.summary}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={onPreview}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105"
        >
          Preview
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition transform hover:scale-105"
        >
          Delete
        </button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <label>
          <input
            type="checkbox"
            checked={blog.isActive}
            onChange={() => onToggleActive(blog._id, !blog.isActive)}
          />
          Active
        </label>
      </div>
    </div>
  );
}

export default BlogCard;
