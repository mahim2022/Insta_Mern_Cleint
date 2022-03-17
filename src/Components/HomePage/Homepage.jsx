import { Post } from "../Posts/Post";
import { InputForm } from "../Forms/Forms/Forms";
import { Container, Row, Col } from "react-bootstrap";

export const HomePage = () => {
	return (
		<Container>
			<Row>
				<Col sm="8">
					<Post></Post>
				</Col>
				<Col sm="4">
					<InputForm></InputForm>
				</Col>
			</Row>
		</Container>
	);
};
