import { createContext, useEffect, useState } from "react";

export const CurrentUserState = createContext();

export const CurrentUserStateProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);

	return (
		<CurrentUserState.Provider value={[currentUser, setCurrentUser]}>
			{props.children}
		</CurrentUserState.Provider>
	);
};
