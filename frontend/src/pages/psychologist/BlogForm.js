import React, { useState } from "react";
import { motion } from "framer-motion";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    content: "",
    summary: "",
    category: "",
    tags: "",
    coverImageUrl: "",
    additionalImages: "",
    videoUrl: "",
    audioUrl: "",
    likes: 0,
    relatedBlogs: "",
    publishedAt: "",
    isPublished: false,
    viewCount: 0,
    estimatedReadTime: "",
    seoTitle: "",
    seoDescription: "",
    featured: false,
    allowComments: true,
    language: "English",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to your backend API
    console.log("Form Data:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
      >
        Create Blog Post
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.textarea
          whileFocus={{ scale: 1.05 }}
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
          rows="6"
        />
        <motion.textarea
          whileFocus={{ scale: 1.05 }}
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
          rows="3"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="url"
          name="coverImageUrl"
          placeholder="Cover Image URL"
          value={formData.coverImageUrl}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="additionalImages"
          placeholder="Additional Image URLs (comma separated)"
          value={formData.additionalImages}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="url"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="url"
          name="audioUrl"
          placeholder="Audio URL"
          value={formData.audioUrl}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="number"
          name="likes"
          placeholder="Likes"
          value={formData.likes}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="relatedBlogs"
          placeholder="Related Blog IDs (comma separated)"
          value={formData.relatedBlogs}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="datetime-local"
          name="publishedAt"
          value={formData.publishedAt}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <div className="flex items-center mb-2">
          <motion.input
            whileHover={{ scale: 1.1 }}
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="isPublished">Publish</label>
        </div>
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="number"
          name="viewCount"
          placeholder="View Count"
          value={formData.viewCount}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="number"
          name="estimatedReadTime"
          placeholder="Estimated Read Time (minutes)"
          value={formData.estimatedReadTime}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          name="seoTitle"
          placeholder="SEO Title"
          value={formData.seoTitle}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        />
        <motion.textarea
          whileFocus={{ scale: 1.05 }}
          name="seoDescription"
          placeholder="SEO Description"
          value={formData.seoDescription}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
          rows="2"
        />
        <div className="flex items-center mb-2">
          <motion.input
            whileHover={{ scale: 1.1 }}
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="featured">Featured</label>
        </div>
        <div className="flex items-center mb-4">
          <motion.input
            whileHover={{ scale: 1.1 }}
            type="checkbox"
            name="allowComments"
            checked={formData.allowComments}
            onChange={handleChange}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="allowComments">Allow Comments</label>
        </div>
        <motion.select
          whileFocus={{ scale: 1.05 }}
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          {/* Add more language options as needed */}
        </motion.select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition"
        >
          Submit Blog Post
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default BlogForm;
