import axiosInstance from "./axiosConfig";

export const registerUser = async (registerData) => {
  try {
    const response = await axiosInstance.post(
      `/api/user/register`,
      registerData
    );
    return response;
  } catch (error) {
    console.log("Register Error", error);
    return error;
  }
};
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post(`/api/user/login`, loginData);
    return response;
  } catch (error) {
    console.log("Login Error", error);
    return error;
  }
};
export const updateUser = async (updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/api/user/profile/update`,
      updatedData
    );
    return response;
  } catch (error) {
    console.log("Update profile Error", error);
  }
};
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get(`/api/user/log-out`);
    return response;
  } catch (error) {
    console.log("LogOut Error", error);
  }
};
export const userPosts = async () => {
  try {
    const response = await axiosInstance.get(`/api/user/user-post`);
    // console.log(response);
    return response;
  } catch (error) {
    console.log("User Post Error", error);
  }
};
