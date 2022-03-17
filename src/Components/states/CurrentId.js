import { createContext, useEffect, useState } from "react";

export const CurrentIdState = createContext();

export const CurrentIdStateProvider = (props) => {
	const [CurrentId, setCurrentId] = useState(null);

	return (
		<CurrentIdState.Provider value={[CurrentId, setCurrentId]}>
			{props.children}
		</CurrentIdState.Provider>
	);
};
