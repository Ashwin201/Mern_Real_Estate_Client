import axiosInstance from "./axiosConfig";

export const getWishlist = async () => {
  try {
    const response = await axiosInstance.get(`/api/wishlist`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addToWishlist = async (postId) => {
  try {
    const response = await axiosInstance.post(`/api/wishlist/add`, {
      postId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishlist = async (itemId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/wishlist/remove/${itemId}`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
