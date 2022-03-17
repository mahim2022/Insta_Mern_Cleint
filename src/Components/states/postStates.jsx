import { createContext, useState, useEffect } from "react";
import { fetchPosts } from "../../api";

export const PostState = createContext();

export const PostStatesProvider = (props) => {
	const [post, setPost] = useState([]);

	useEffect(async () => {
		const { data } = await fetchPosts();

		setPost(data);
	}, []);

	return (
		<PostState.Provider value={[post, setPost]}>
			{props.children}
		</PostState.Provider>
	);
};
