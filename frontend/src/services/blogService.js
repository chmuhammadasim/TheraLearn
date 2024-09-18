import axios from "axios";

const token = localStorage.getItem("authToken");
// Fetch all blogs
export const getBlogs = async () => {

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/blog/all`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);

    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    throw new Error("Failed to fetch blogs: " + error.message);
  }
};

// Delete a blog by ID
export const deleteBlog = async (blogId) => {

  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_KEY}/blog/delete/${blogId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to delete blog: " + error.message);
  }
};

export const updateBlogStatus = async (blogId, status) => {
  try {
    const response = await axios.put(`/api/blogs/${blogId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating blog status", error);
    throw error;
  }
};

export const toggleBlogActiveStatus = async (blogId, isActive) => {
  try {
    const response = await axios.put(`/api/blogs/${blogId}/toggle-active`, {
      isActive,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling blog active status", error);
    throw error;
  }
};
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/blog/getbyid/${id}`);
    console.log(response.data.data);
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

export const likeBlog = async (id) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_KEY}/blog/like/${id}`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
};

export const dislikeBlog = async (id) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_KEY}/blog/dislike/${id}`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error disliking blog:", error);
    throw error;
  }
};

export const submitComment = async (id, comment) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}/blog/comment/${id}`,
      { comment },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return response.data.comment;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};
