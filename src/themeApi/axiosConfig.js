"use client";
import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getToken = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  //   console.log(userData);
  const token = userData?.state?.user?.token;
  //   console.log(token);
  return token;
};
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
