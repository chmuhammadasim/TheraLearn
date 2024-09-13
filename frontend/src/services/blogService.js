import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blog';

// Fetch all blogs
export const getBlogs = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    throw new Error('Failed to fetch blogs: ' + error.message);
  }
};

// Delete a blog by ID
export const deleteBlog = async (blogId) => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.delete(`${API_URL}/delete/${blogId}`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete blog: ' + error.message);
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
    const response = await axios.put(`/api/blogs/${blogId}/toggle-active`, { isActive });
    return response.data;
  } catch (error) {
    console.error("Error toggling blog active status", error);
    throw error;
  }
};
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getbyid/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

export const likeBlog = async (id, token) => {
  try {
    await axios.post(`${API_URL}/like/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Error liking blog:', error);
    throw error;
  }
};

export const dislikeBlog = async (id, token) => {
  try {
    await axios.post(`${API_URL}/dislike/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Error disliking blog:', error);
    throw error;
  }
};

export const submitComment = async (id, comment, token) => {
  try {
    const response = await axios.post(`${API_URL}/comment/${id}`, { comment }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.comment;
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
};
