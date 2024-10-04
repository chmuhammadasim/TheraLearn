import React, { useState, useEffect } from 'react';
import { getBlogs, deleteBlog, updateBlogStatus, toggleBlogActiveStatus } from '../../services/blogService';
import BlogCard from './components/BlogCard';
import BlogPreviewModal from './components/BlogPreviewModal';
import Pagination from './components/Pagination';

function AdminBlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9); // Number of blogs to show per page
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [previewBlog, setPreviewBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    await deleteBlog(blogId);
    setBlogs(blogs.filter(blog => blog._id !== blogId));
  };

  const handleBulkDelete = () => {
    selectedBlogs.forEach(blogId => handleDelete(blogId));
    setSelectedBlogs([]);
  };

  const handleBulkStatusChange = (status) => {
    selectedBlogs.forEach(async blogId => {
      await updateBlogStatus(blogId, status);
    });
    setSelectedBlogs([]);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleActive = async (blogId, isActive) => {
    await toggleBlogActiveStatus(blogId, isActive);
    setBlogs(blogs.map(blog =>
      blog._id === blogId ? { ...blog, isActive } : blog
    ));
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const filteredBlogs = currentBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterStatus === 'all' || blog.status === filterStatus)
  );

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto mt-16 mb-16"> {/* Added margin for navbar and footer */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold text-indigo-600">Admin Blog Dashboard</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded-lg px-4 py-2 w-1/3 shadow-md focus:ring-2 focus:ring-indigo-500 transition"
          />
          <select
            className="border rounded-lg px-4 py-2 shadow-md focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white border-l-4 border-indigo-500 shadow-lg rounded-lg p-4 relative hover:shadow-xl transition-shadow duration-300"
            >
              <BlogCard
                blog={blog}
                onDelete={() => handleDelete(blog._id)}
                onPreview={() => {
                  setPreviewBlog(blog);
                  setShowPreview(true);
                }}
                onSelect={(isSelected) => {
                  setSelectedBlogs(isSelected
                    ? [...selectedBlogs, blog._id]
                    : selectedBlogs.filter(id => id !== blog._id)
                  );
                }}
                onToggleActive={handleToggleActive}
              />
            </div>
          ))}
        </div>

        {/* Improved Pagination Design */}
        <Pagination 
          totalItems={blogs.length} 
          itemsPerPage={blogsPerPage} 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
        />

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg mr-4 hover:bg-red-600 transition transform hover:scale-105"
            disabled={selectedBlogs.length === 0}
          >
            Delete Selected
          </button>
          <button
            onClick={() => handleBulkStatusChange('published')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-105"
            disabled={selectedBlogs.length === 0}
          >
            Publish Selected
          </button>
        </div>
      </div>

      {showPreview && (
        <BlogPreviewModal
          blog={previewBlog}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default AdminBlogDashboard;
