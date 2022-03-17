import { Nav, Container, NavDropdown, Navbar } from "react-bootstrap";
import "./nav.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserState } from "../states/CurrentUser";

export const NavBar = () => {
	const [currentUser, setCurrentUser] = useContext(CurrentUserState);
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/");
		// setUser(JSON.parse(localStorage.getItem("profile")));
		console.log(currentUser);
	}, [currentUser]);

	const handleSignOut = (e) => {
		e.preventDefault();
		// setUser(null);
		setCurrentUser(null);
		localStorage.clear();
		// console.log(user);
	};

	return (
		<Navbar bg="dark" expand="lg" style={{ marginBottom: "20px" }}>
			<Container style={{ color: "white" }}>
				<Navbar.Brand href="#home" style={{ color: "white" }}>
					React-Bootstrap
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/" style={{ color: "white" }}>
							Home
						</Nav.Link>
						{currentUser ? (
							<Nav.Link
								onClick={(e) => {
									handleSignOut(e);
								}}
								style={{ color: "white" }}
							>
								SignOut
							</Nav.Link>
						) : (
							<Nav.Link as={Link} to="/auth/" style={{ color: "white" }}>
								SignUp/SignIn
							</Nav.Link>
						)}

						{currentUser ? <h4>{currentUser.name}</h4> : <></>}

						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
