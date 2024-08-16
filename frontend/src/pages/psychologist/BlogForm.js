import React, { useState } from "react";
import { motion } from "framer-motion";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    summary: "",
    category: "",
    tags: "",
    coverImageUrl: "",
    additionalImages: "",
    videoUrl: "",
    audioUrl: "",
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

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.author) tempErrors.author = "Author is required";
    if (!formData.content) tempErrors.content = "Content is required";
    if (!formData.category) tempErrors.category = "Category is required";
    if (!formData.tags) tempErrors.tags = "Tags are required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit the form data to your backend API
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f8c731] to-[#fc3a52] py-12 px-4 sm:px-6 lg:px-8">
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
          <div>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>

          <div>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
            />
            {errors.author && (
              <span className="text-red-500 text-sm">{errors.author}</span>
            )}
          </div>

          <div>
            <motion.textarea
              whileFocus={{ scale: 1.05 }}
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
              rows="6"
            />
            {errors.content && (
              <span className="text-red-500 text-sm">{errors.content}</span>
            )}
          </div>

          <motion.textarea
            whileFocus={{ scale: 1.05 }}
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
            rows="3"
          />

          <div>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 transition"
            />
            {errors.tags && (
              <span className="text-red-500 text-sm">{errors.tags}</span>
            )}
          </div>

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
            rows="3"
          />

          <div className="flex items-center mb-2">
            <motion.input
              whileHover={{ scale: 1.1 }}
              type="checkbox"
              name="allowComments"
              checked={formData.allowComments}
              onChange={handleChange}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded transition"
            />
            <label
              htmlFor="allowComments"
              className="ml-2 block text-sm text-gray-900"
            >
              Allow Comments
            </label>
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
            className="w-full p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold rounded-lg transition"
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    
    </div>
  );
};

export default BlogForm;
