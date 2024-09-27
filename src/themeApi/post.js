// api/post.js
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const API_URL = window.location.origin;
export const getPosts = async (query) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/post`,
      { params: query },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/post/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_URL}/api/post`, post, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await axios.put(`${API_URL}/api/post/${id}`, post, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/post/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
