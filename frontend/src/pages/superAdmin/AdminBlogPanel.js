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
    <div className="bg-gray-100 text-gray-800 min-h-screen p-8">
      <div className="max-w-7xl mx-auto mt-16 mb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Blog Dashboard</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded-lg px-4 py-2 w-full sm:w-1/3 shadow-md"
          />
          <select
            className="border rounded-lg px-4 py-2 shadow-md"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-lg">Loading blogs...</div>
        ) : (
          <>
            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
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
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              totalItems={blogs.length}
              itemsPerPage={blogsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* Bulk Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
            disabled={selectedBlogs.length === 0 || bulkActionLoading}
          >
            {bulkActionLoading ? "Deleting..." : "Delete Selected"}
          </button>
          <button
            onClick={() => handleBulkStatusChange("published")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
            disabled={selectedBlogs.length === 0 || bulkActionLoading}
          >
            {bulkActionLoading ? "Updating..." : "Publish Selected"}
          </button>
        </div>
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
