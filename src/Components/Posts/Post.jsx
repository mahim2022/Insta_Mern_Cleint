import { useContext } from "react";
import { PostState } from "../states/postStates";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { CurrentIdState } from "../states/CurrentId";
import { DeletePost, LikePost } from "../../api";
import { PostUpdateCounter } from "../states/PostUpdateCounter";

export const Post = () => {
	const [post] = useContext(PostState);
	const [CurrentId, setCurrentId] = useContext(CurrentIdState);
	const [counter, setCounter] = useContext(PostUpdateCounter);

	////Get Post data onclick Button///
	const updatePosts = (id) => {
		setCurrentId(id);
		// console.log(CurrentId);
	};
	//deletepost
	const deletePost = async (id) => {
		console.log(`Button Pressed ${id}`);
		await DeletePost(id);
		setCounter(!counter);
	};
	///like post
	const likePost = async (id) => {
		await LikePost(id);
		setCounter(!counter);
	};

	return (
		<div style={{}}>
			<Container fluid>
				<Row sm="auto">
					{post.map((cur, index) => {
						return (
							<Col sm={"auto"} key={index}>
								<Card
									style={{
										width: "fit-content",
										margin: "5px",
									}}
								>
									<Button
										onClick={() => updatePosts(cur._id)}
										style={{
											width: "fit-content",
											backgroundColor: "transparent",
											border: "none",
										}}
									>
										💦
									</Button>
									<Card.Img
										variant="top"
										src={cur.selectedFile}
										style={{ height: "180px", width: "180px" }}
									/>
									<Card.Body>
										<Card.Title>{cur.title}</Card.Title>
										<Card.Text>{cur.message}</Card.Text>
									</Card.Body>
									<Button onClick={() => likePost(cur._id)}>
										Like:{cur.likeCount}
									</Button>
									<Button onClick={() => deletePost(cur._id)}>Delete</Button>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
};
