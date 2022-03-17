import { createContext, useState, useEffect } from "react";

export const PostUpdateCounter = createContext();

export const PostUpdateCounterProvider = (props) => {
	const [counter, setCounter] = useState(false);
	return (
		<PostUpdateCounter.Provider value={[counter, setCounter]}>
			{props.children}
		</PostUpdateCounter.Provider>
	);
};
