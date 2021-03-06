import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { PostStatesProvider } from "./Components/states/postStates.jsx";
import { CurrentIdStateProvider } from "./Components/states/CurrentId";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserStateProvider } from "./Components/states/CurrentUser";
import { PostUpdateCounterProvider } from "./Components/states/PostUpdateCounter";

ReactDOM.render(
	<BrowserRouter>
		<CurrentUserStateProvider>
			<PostUpdateCounterProvider>
				<PostStatesProvider>
					<CurrentIdStateProvider>
						<React.StrictMode>
							<App />
						</React.StrictMode>
					</CurrentIdStateProvider>
				</PostStatesProvider>
			</PostUpdateCounterProvider>
		</CurrentUserStateProvider>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
