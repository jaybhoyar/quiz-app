import React, { Component } from "react";
import { connect } from "react-redux";
import { showQuiz } from "../../state/actions/quizActions";
import { attemptQuiz } from "../../state/actions/quizActions";

class AttemptQuiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
		};
	}
	componentDidMount() {
		var quizId = this.props.match.params.id;
		this.props.dispatch(showQuiz(quizId));
	}
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			var allQuestions = this.props.quiz.questions.map((question) => {
				var obj = { questionId: question._id, answers: [] };
				return obj;
			});
			this.setState({ questions: allQuestions });
		}
	}
	handleCheckbox = (e, option, quesId, index) => {
		var newQuestions = this.state.questions;
		if (e.target.checked) {
			newQuestions = newQuestions.map((question, i) => {
				if (i === index && !question.answers.includes(option)) {
					question.answers.push(option);
					return question;
				}
				return question;
			});
			this.setState({ questions: newQuestions });
		} else {
			newQuestions = newQuestions.map((question, i) => {
				if (i === index && question.answers.includes(option)) {
					question.answers = question.answers.filter(
						(answer) => answer !== option
					);
					return question;
				}
				return question;
			});
			this.setState({ questions: newQuestions });
		}
	};

	handleSubmitQuiz = () => {
		var attempt;
		attempt = {
			quizId: this.props.match.params.id,
			questions: this.state.questions,
		};
		this.props.dispatch(attemptQuiz({ attempt }));
	};
	render() {
		return (
			<>
				{this.props.quiz ? (
					<>
						<div className="container mt-4">
							<h1 className="display-5">
								{this.props.quiz.title}
							</h1>
							<div className="mt-6 ml-6 mr-6">
								<div className="row">
									<div className="col mx-auto">
										{this.props.quiz.questions.map(
											(question, index) => {
												return (
													<div
														className="col-md-6"
														key={index}
													>
														<h4>
															Q: {question.title}
														</h4>
														<div className="row">
															{question.options.map(
																(option, i) => {
																	return (
																		<div
																			className="col-6"
																			key={
																				i
																			}
																		>
																			<div className="form-check">
																				<input
																					className="form-check-input"
																					type="checkbox"
																					onChange={(
																						e
																					) =>
																						this.handleCheckbox(
																							e,
																							option,
																							question._id,
																							index
																						)
																					}
																					// checked={this.state.questions[
																					// 	index
																					// ].answers.includes(
																					// 	option
																					// )}
																					id="defaultCheck1"
																				/>
																				<label
																					className="form-check-label"
																					htmlFor="defaultCheck1"
																				>
																					{
																						option
																					}
																				</label>
																			</div>
																		</div>
																	);
																}
															)}
														</div>
													</div>
												);
											}
										)}
									</div>
								</div>
								<button
									className="btn btn-success"
									onClick={this.handleSubmitQuiz}
								>
									Submit
								</button>
							</div>
						</div>
					</>
				) : (
					<h1>Loading...</h1>
				)}
			</>
		);
	}
}
function mapStateToProps({ quiz }) {
	if (quiz.quiz) {
		var updatedQuestions = quiz.quiz.questions.map((question) => {
			question.answers = [];
			return question;
		});
		return { quiz: { ...quiz.quiz, questions: updatedQuestions } };
	}
}

export default connect(mapStateToProps)(AttemptQuiz);
