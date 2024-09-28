import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getWishlist = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/wishlist`, {
      withCredentials: true,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addToWishlist = async (postId) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/wishlist/add`,
      {
        postId,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishlist = async (itemId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/wishlist/remove/${itemId}`,
      { withCredentials: true }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
