import axiosInstance from "./axiosConfig";
export const getCart = async () => {
  try {
    const response = await axiosInstance.get(`/api/cart`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addToCart = async (postId) => {
  try {
    const response = await axiosInstance.post(`/api/cart/add`, { postId });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await axiosInstance.put(`/api/cart/update/${itemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await axiosInstance.delete(`/api/cart/remove/${itemId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removerCartItems = async () => {
  try {
    const response = await axiosInstance.delete(`/api/cart/reset`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const Checkout = async (data) => {
  try {
    const response = await axiosInstance.post(`/api/cart/checkout`, data);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
