import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// const url = "http://localhost:5000/posts";

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => {
	API.post("/posts", newPost);
};
export const UpdatePost = (id, updatedPost) => {
	API.patch(`/posts/${id}`, updatedPost);
};

export const DeletePost = (id) => {
	API.delete(`/posts/${id}/deletePost`);
};

export const LikePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (data) => API.post(`/users/signin`, data);
export const signUp = (data) => API.post(`/users/signup`, data);
