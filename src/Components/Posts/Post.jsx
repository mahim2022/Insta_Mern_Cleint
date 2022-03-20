import { useContext, useState } from "react";
import { PostState } from "../states/postStates";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { CurrentIdState } from "../states/CurrentId";
import { DeletePost, LikePost } from "../../api";
import { PostUpdateCounter } from "../states/PostUpdateCounter";
import "./Post.css";
import { CurrentUserState } from "../states/CurrentUser";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ClipLoader from "react-spinners/ClipLoader";

export const Post = () => {
	const [post] = useContext(PostState);
	const [CurrentId, setCurrentId] = useContext(CurrentIdState);
	const [counter, setCounter] = useContext(PostUpdateCounter);
	const [currentUser] = useContext(CurrentUserState);

	////Get Post data onclick Button///
	const updatePosts = (id) => {
		setCurrentId(id);
		// console.log(CurrentId);
	};
	//deletepost
	const deletePost = async (id) => {
		await DeletePost(id);
		setCounter(!counter);
	};
	///like post
	const likePost = async (id, likesArray) => {
		await LikePost(id);
		setCounter(!counter);
		// console.log(likesArray);
	};

	///Rendering the like button conditionally and depending on each post
	const LikeRender = (likesArray) => {
		if (
			likesArray.likesArray.find(
				(likeId) =>
					likeId == currentUser?.result?._id || currentUser?.result?.googleId
			)
		) {
			return (
				<div className="LikeRender">
					<AiFillLike className="likeIcon"></AiFillLike>
					{likesArray.likesArray.length > 1 ? (
						<p style={{ paddingLeft: "4px" }}>{likesArray.likesArray.length}</p>
					) : (
						<>&zwnj;</>
					)}
				</div>
			);
		} else
			return (
				<div className="LikeRender">
					<AiOutlineLike style={{ position: "relative", bottom: "4px" }} />
					{likesArray.likesArray.length > 1 ? (
						<p style={{ paddingLeft: "4px" }}>{likesArray.likesArray.length}</p>
					) : (
						<>&zwnj;</>
					)}
				</div>
			);
	};
	if (!post) {
		return (
			<div style={{ position: "relative", left: "20vw" }}>
				<ClipLoader color="white"></ClipLoader>
			</div>
		);
	} else {
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
										{currentUser ? (
											<Button
												className="edit"
												onClick={() => updatePosts(cur._id)}
												style={{
													width: "fit-content",
													backgroundColor: "transparent",
													border: "none",
												}}
											>
												⚙
											</Button>
										) : null}
										<Card.Img
											variant="top"
											src={cur.selectedFile}
											style={{
												height: "180px",
												width: "180px",
											}}
										/>
										<Card.Body>
											<Card.Title style={{ marginTop: "-10px" }}>
												{cur.title}
											</Card.Title>
											<Card.Text style={{ marginTop: "-10px" }}>
												{cur.message}
											</Card.Text>
										</Card.Body>
										{currentUser ? (
											<div
												className={`like_display_button`}
												style={{ marginTop: "-15px" }}
											>
												<button
													className="like"
													onClick={() => likePost(cur._id, cur.likes)}
												>
													<LikeRender likesArray={cur.likes}></LikeRender>
												</button>

												<p
													className="delete"
													onClick={() => deletePost(cur._id)}
												>
													<RiDeleteBin6Fill
														style={{ color: "black" }}
													></RiDeleteBin6Fill>
												</p>
											</div>
										) : null}
									</Card>
								</Col>
							);
						})}
					</Row>
				</Container>
			</div>
		);
	}
};
