import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogs';

// Fetch all blogs
export const getBlogs = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.get(`${API_URL}/getall`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
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

// Update blog status
export const updateBlogStatus = async (blogId, status) => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.patch(`${API_URL}/update-status/${blogId}`, { status }, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to update blog status: ' + error.message);
  }
};
