import { Nav, Container, NavDropdown, Navbar } from "react-bootstrap";
import "./nav.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserState } from "../states/CurrentUser";
import { SiSemanticuireact } from "react-icons/si";
import decode from "jwt-decode";
import { VscSignOut, VscSignIn } from "react-icons/vsc";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
	const [currentUser, setCurrentUser] = useContext(CurrentUserState);
	const navigate = useNavigate();
	const location = useLocation();

	////navigate to homepage on authenticating//
	useEffect(() => {
		navigate("/");
	}, [currentUser]);

	////SignOut Button///
	const handleSignOut = (e) => {
		e.preventDefault();
		setCurrentUser(null);
		localStorage.clear();
	};

	///jsonWebToken expiry///
	useEffect(() => {
		const token = currentUser?.token;
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				setCurrentUser(null);
				localStorage.clear();
			}
		}
	}, [location]);

	return (
		<Navbar bg="dark" expand="lg" style={{ marginBottom: "20px" }}>
			<Container style={{ color: "white" }}>
				<Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
					<SiSemanticuireact className="logo"></SiSemanticuireact>
				</Navbar.Brand>
				{/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
				{currentUser ? <h5>{currentUser.result.email}</h5> : <></>}

				<Nav className="me-auto">
					{currentUser ? (
						<Nav.Link
							onClick={(e) => {
								handleSignOut(e);
							}}
							style={{ color: "white" }}
						>
							<VscSignOut className="logo"></VscSignOut>
						</Nav.Link>
					) : (
						<Nav.Link as={Link} to="/auth/" style={{ color: "white" }}>
							<VscSignIn className="logo"></VscSignIn>
						</Nav.Link>
					)}

					{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1" style={{ color: "white" }}>
								Action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2" style={{ color: "white" }}>
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3" style={{ color: "white" }}>
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4" style={{ color: "white" }}>
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
				</Nav>
			</Container>
		</Navbar>
	);
};
