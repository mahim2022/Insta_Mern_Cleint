import axios from "axios";

const API = axios.create({
	baseURL: "https://mern-insta-backend.herokuapp.com/",
});

// const url = "http://localhost:5000/posts";

/////Intercepting and sending info to auth middleware for verification///
API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

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
