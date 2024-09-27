// store/postStore.js
import { create } from "zustand";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "@/themeApi/post";

export interface PostState {
  posts: any[];
  post: any;
  fetchPosts: (query?: any) => void;
  fetchPostById: (id: string) => void;
  addPost: (post: any) => void;
  updatePost: (id: string, post: any) => void;
  removePost: (id: string) => void;
}

const usePostStore = create<PostState>()((set) => ({
  posts: [],
  post: null,
  fetchPosts: async (query) => {
    try {
      const response = await getPosts(query);
      set({ posts: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchPostById: async (id) => {
    try {
      const response = await getPostById(id);
      set({ post: response.data });
    } catch (error) {
      console.error(error);
    }
  },
  addPost: async (post) => {
    try {
      const response = await createPost(post);
      set((state) => ({
        posts: [...(state.posts || []), response.data?.newPost],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  // set((state: { earnings: any }) => ({
  //   earnings: [...(state.earnings || []), createddata],
  // }));
  updatePost: async (id, post) => {
    try {
      const response = await updatePost(id, post);
      set((state) => ({
        posts: state.posts.map((p) =>
          p._id === id ? [...p, ...response.data] : p
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  removePost: async (id) => {
    try {
      await deletePost(id);
      set((state) => ({
        posts: state.posts.filter((p) => p._id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default usePostStore;
