import React from "react";
import BlogCard from "./BlogCard";

const BlogSection = ({ blogs }) => {
  return (
    <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800">
          From Our Blog
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
