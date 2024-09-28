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
    const response = await axiosInstance.put(
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
