import { GoogleLogin } from "react-google-login";
import { Container, Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { signIn, signUp } from "../../api";
import { CurrentUserState } from "../states/CurrentUser";
import "./SignInPage.css";

export const LoginPage = () => {
	const [data, setData] = useState({ email: "", password: "" });

	const [currentUser, setCurrentUser] = useContext(CurrentUserState);

	const [signCounter, setSignCounter] = useState(false);

	const handleSignIn = async (e) => {
		e.preventDefault();
		const result = await signIn(data);
		localStorage.setItem("profile", JSON.stringify(result.data));
		setCurrentUser(result.data);
		setData({ email: "", password: "" });
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		const result = await signUp(data);
		localStorage.setItem("profile", JSON.stringify(result.data));
		setCurrentUser(result.data);
		setData({ email: "", password: "" });
	};

	//////////Google Button Funtions//////
	const googleSuccess = (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		const finalResult = { result, token };
		localStorage.setItem("profile", JSON.stringify(finalResult));
		setCurrentUser(finalResult);
	};

	const googleFailure = () => {
		console.log(`Google sign in failed log in again`);
	};

	return (
		<div>
			<Card style={{ width: "25rem", height: "21rem" }} className="cardSignIn">
				<Container style={{ padding: "15px" }}>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={data.password}
								onChange={(e) => setData({ ...data, password: e.target.value })}
							/>
						</Form.Group>

						{signCounter ? (
							<button
								style={{ marginRight: "10px" }}
								className="button-53"
								type="submit"
								onClick={(e) => handleSignIn(e)}
							>
								SignIn
							</button>
						) : (
							<button
								style={{ marginRight: "10px" }}
								className="button-53"
								type="submit"
								onClick={(e) => handleSignUp(e)}
							>
								SignUp
							</button>
						)}
						<GoogleLogin
							clientId="517334547242-4q3b65ilnuolp6bcfg7j3e9i829ihdta.apps.googleusercontent.com"
							buttonText="Login"
							onSuccess={googleSuccess}
							onFailure={googleFailure}
							cookiePolicy={"single_host_origin"}
						></GoogleLogin>
						{!signCounter ? (
							<button
								className="button-2"
								onClick={(e) => {
									e.preventDefault();
									setSignCounter(!signCounter);
								}}
							>
								Already Have an account? SignIn
							</button>
						) : (
							<button
								className="button-2"
								onClick={(e) => {
									e.preventDefault();
									setSignCounter(!signCounter);
								}}
							>
								Dont have an account? SignUp
							</button>
						)}
					</Form>
				</Container>
			</Card>
		</div>
	);
};
