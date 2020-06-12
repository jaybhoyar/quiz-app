import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { quizList } from "../../state/actions/quizActions";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
		};
	}
	componentDidMount() {
		this.props.dispatch(quizList());
	}
	render() {
		return (
			<>
				{this.props.quizzes ? (
					<div className="container mt-6">
						<div className="row ">
							{this.props.quizzes.map((quiz, i) => {
								return (
									<div
										className="col-6 col-md-4 mb-6"
										key={i}
									>
										<div
											className="card"
											style={{ width: "18rem" }}
										>
											<img
												className="card-img-top"
												style={{
													height: "160px",
													objectFit: "cover",
													filter: " opacity(.7)",
												}}
												src="https://thumbs.dreamstime.com/z/quiz-test-survey-exam-vector-concept-online-laptop-education-illustration-80657742.jpg"
												alt="Card image cap"
											/>
											<div className="card-body">
												<h5 className="card-title">
													{quiz.title}
												</h5>
												<Link
													to={`/quiz/${quiz._id}`}
													className="btn btn-primary"
												>
													Play
												</Link>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<h1>Loading</h1>
				)}
			</>
		);
	}
}

const mapStateToProps = ({ quizReducer }) => {
	return { quizzes: quizReducer.quizList.quizzes };
};

export default connect(mapStateToProps)(HomePage);
