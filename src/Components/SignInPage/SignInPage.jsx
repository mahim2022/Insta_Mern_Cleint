import { GoogleLogin } from "react-google-login";
import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { signIn, signUp } from "../../api";
import { CurrentUserState } from "../states/CurrentUser";

export const LoginPage = () => {
	const [data, setData] = useState({ email: "", password: "" });

	const [currentUser, setCurrentUser] = useContext(CurrentUserState);

	const handleSignIn = async (e) => {
		e.preventDefault();
		const result = await signIn(data);
		console.log(result);
		setData({ email: "", password: "" });
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		const result = await signUp(data);
		console.log(result);
		setData({ email: "", password: "" });
	};

	//////////Google Button Funtions//////
	const googleSuccess = (res) => {
		// console.log(res);
		const profileObj = res?.profileObj;
		const token = res?.tokenId;
		const result = { ...profileObj, token };
		localStorage.setItem("profile", JSON.stringify(result));
		setCurrentUser(result);
	};

	const googleFailure = () => {
		console.log(`Google sign in failed log in again`);
	};

	return (
		<Container>
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
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					onClick={(e) => handleSignIn(e)}
				>
					SignIn
				</Button>
				<Button
					variant="primary"
					type="submit"
					onClick={(e) => handleSignUp(e)}
				>
					SignUp
				</Button>
				<GoogleLogin
					clientId="517334547242-4q3b65ilnuolp6bcfg7j3e9i829ihdta.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={googleSuccess}
					onFailure={googleFailure}
					cookiePolicy={"single_host_origin"}
				></GoogleLogin>
			</Form>
		</Container>
	);
};
