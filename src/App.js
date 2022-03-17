import { Container, Row, Col } from "react-bootstrap";
import { InputForm } from "./Components/Forms/Forms/Forms.jsx";
import { Post } from "./Components/Posts/Post.jsx";
import { NavBar } from "./Components/NavBar/nav.jsx";
import "./App.css";
import { LoginPage } from "./Components/SignInPage/SignInPage.jsx";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./Components/HomePage/Homepage.jsx";

function App() {
	return (
		<div className="App">
			<NavBar></NavBar>
			<Routes>
				<Route path="/auth" element={<LoginPage></LoginPage>} />
				<Route path="/" element={<HomePage></HomePage>} />
			</Routes>
		</div>
	);
}

export default App;
