import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`;
// const API_URL = window.location.origin;
export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, registerData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("Register Error", error);
    return error;
  }
};
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("Login Error", error);
    return error;
  }
};
export const updateUser = async (updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/profile/update`, updatedData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("Update profile Error", error);
  }
};
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/log-out`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("LogOut Error", error);
  }
};
export const userPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/user-post`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("User Post Error", error);
  }
};
