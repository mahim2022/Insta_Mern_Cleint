import { createContext, useState, useEffect, useContext } from "react";
import { fetchPosts } from "../../api";
import { PostUpdateCounter } from "./PostUpdateCounter";

export const PostState = createContext();

export const PostStatesProvider = (props) => {
	const [post, setPost] = useState(null);
	const [counter] = useContext(PostUpdateCounter);

	useEffect(async () => {
		const { data } = await fetchPosts();
		setPost(data);
	}, [counter]);

	return (
		<PostState.Provider value={[post, setPost]}>
			{props.children}
		</PostState.Provider>
	);
};
