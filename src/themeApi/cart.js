import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const API_URL = window.location.origin;
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/cart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addToCart = async (postId) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/cart/add`,
      { postId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/cart/update/${itemId}`,
      {
        quantity,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/cart/remove/${itemId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removerCartItems = async () => {
  try {
    const response = await axios.delete(`${API_URL}/api/cart/reset`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
