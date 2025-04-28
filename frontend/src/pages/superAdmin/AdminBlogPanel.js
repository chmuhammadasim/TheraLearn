import React, { useState, useEffect } from "react";
import {
  getBlogs,
  deleteBlog,
  updateBlogStatus,
  toggleBlogActiveStatus,
} from "../../services/blogService";
import BlogCard from "./components/BlogCard";
import BlogPreviewModal from "./components/BlogPreviewModal";
import Pagination from "./components/Pagination";

function AdminBlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPreview, setShowPreview] = useState(false);
  const [previewBlog, setPreviewBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }
  };

  const handleBulkDelete = async () => {
    setBulkActionLoading(true);
    try {
      await Promise.all(selectedBlogs.map((blogId) => deleteBlog(blogId)));
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => !selectedBlogs.includes(blog._id))
      );
      setSelectedBlogs([]);
    } catch (error) {
      console.error("Error deleting selected blogs:", error.message);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkStatusChange = async (status) => {
    setBulkActionLoading(true);
    try {
      await Promise.all(
        selectedBlogs.map((blogId) => updateBlogStatus(blogId, status))
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          selectedBlogs.includes(blog._id) ? { ...blog, status } : blog
        )
      );
      setSelectedBlogs([]);
    } catch (error) {
      console.error("Error updating blog statuses:", error.message);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleToggleActive = async (blogId, isActive) => {
    try {
      await toggleBlogActiveStatus(blogId, isActive);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, isActive } : blog
        )
      );
    } catch (error) {
      console.error("Error toggling active status:", error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination and Filtering
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const filteredBlogs = currentBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterStatus === "all" || blog.status === filterStatus)
  );

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen p-0">
      <div className="max-w-7xl mx-auto mt-20 mb-8 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-4 sm:mb-0">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Admin Blog Dashboard
            </span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="transition bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md font-semibold disabled:opacity-50"
              disabled={selectedBlogs.length === 0 || bulkActionLoading}
            >
              {bulkActionLoading ? "Deleting..." : "Delete Selected"}
            </button>
            <button
              onClick={() => handleBulkStatusChange("published")}
              className="transition bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md font-semibold disabled:opacity-50"
              disabled={selectedBlogs.length === 0 || bulkActionLoading}
            >
              {bulkActionLoading ? "Updating..." : "Publish Selected"}
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white/70 rounded-xl shadow-lg p-6">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 shadow-sm focus:ring-2 focus:ring-blue-300 transition"
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-300 transition"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-600 py-20">
            <svg className="animate-spin h-8 w-8 mx-auto mb-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Loading blogs...
          </div>
        ) : (
          <>
            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 text-lg py-16">
                  No blogs found.
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    onDelete={() => handleDelete(blog._id)}
                    onPreview={() => {
                      setPreviewBlog(blog);
                      setShowPreview(true);
                    }}
                    onSelect={(isSelected) =>
                      setSelectedBlogs((prev) =>
                        isSelected
                          ? [...prev, blog._id]
                          : prev.filter((id) => id !== blog._id)
                      )
                    }
                    onToggleActive={handleToggleActive}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="mt-10">
              <Pagination
                totalItems={blogs.length}
                itemsPerPage={blogsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Blog Preview Modal */}
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
