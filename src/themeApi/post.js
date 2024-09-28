// api/post.js
import axiosInstance from "./axiosConfig";
export const getPosts = async (query) => {
  try {
    const response = await axiosInstance.get(`/api/post`, { params: query });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/post/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axiosInstance.post(`/api/post`, post);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await axiosInstance.put(`/api/post/${id}`, post);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/post/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
