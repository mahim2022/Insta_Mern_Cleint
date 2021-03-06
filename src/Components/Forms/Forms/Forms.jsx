import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./Forms.css";
import { createPost, UpdatePost } from "../../../api";
import FileBase64 from "react-file-base64";
import { useContext } from "react";
import { PostState } from "../../states/postStates";
import { CurrentIdState } from "../../states/CurrentId";
import { CurrentUserState } from "../../states/CurrentUser";
import { PostUpdateCounter } from "../../states/PostUpdateCounter";
import { useNavigate } from "react-router-dom";

export const InputForm = () => {
	const [post] = useContext(PostState);
	const [CurrentId, setCurrentId] = useContext(CurrentIdState);
	const [currentUser] = useContext(CurrentUserState);
	const currentUserEmail = currentUser?.result?.email;
	const [counter, setCounter] = useContext(PostUpdateCounter);

	///////Getting Currentpost for update/////
	const currentPost = CurrentId ? post.find((p) => p._id === CurrentId) : null;

	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	// const newPostDoc = post.map((cur) =>
	// 	cur._id === CurrentId ? postData : cur
	// );

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (CurrentId) {
			try {
				await UpdatePost(CurrentId, {
					...postData,
					email: currentUserEmail,
				});
				setCounter(!counter);
			} catch (error) {
				console.log(error);
			}
		} else {
			await createPost({ ...postData, email: currentUserEmail });
			setCounter(!counter);
		}
		clear();
	};

	const clear = (e) => {
		// e.preventDefault();
		setCurrentId(null);
		setPostData({
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	useEffect(() => {
		if (currentPost) {
			setPostData(currentPost);
		}
	}, [CurrentId]);
	const navigate = useNavigate();

	if (!currentUser) {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Body>
					<Card.Title>You are logged out</Card.Title>
					<Card.Text>
						Please log in to Create/Edit/Delete or Like Posts
					</Card.Text>
					<Button
						variant="primary"
						onClick={() => {
							navigate("/auth");
						}}
					>
						Log In
					</Button>
				</Card.Body>
			</Card>
		);
	}

	return (
		<Card style={{ padding: "10px" }}>
			{CurrentId ? <h3>Editing A memory</h3> : <h3>Creating A memory</h3>}

			<Form>
				{/* Creator set Dynamically */}
				{/* <Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="string"
						placeholder="Creator"
						value={postData.creator}
						onChange={(e) =>
							setPostData({ ...postData, creator: e.target.value })
						}
					/>
				</Form.Group> */}

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control
						type="string"
						placeholder="Title"
						value={postData.title}
						onChange={(e) =>
							setPostData({ ...postData, title: e.target.value })
						}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control
						type="string"
						placeholder="Message"
						value={postData.message}
						onChange={(e) =>
							setPostData({ ...postData, message: e.target.value })
						}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Control
						type="string"
						placeholder="Tags"
						value={postData.tags}
						onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
					/>
				</Form.Group>
				<div style={{ padding: "10px" }}>
					<FileBase64
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					></FileBase64>
				</div>
				<div className="buttons">
					<Button
						onClick={handleSubmit}
						variant="primary"
						type="submit"
						style={{ width: "100px" }}
					>
						Submit
					</Button>
					<Button
						onClick={clear}
						variant="primary"
						style={{ width: "100px", backgroundColor: "red" }}
					>
						Clear
					</Button>
				</div>
			</Form>
		</Card>
	);
};
