import React, { Component } from "react";
import { connect } from "react-redux";
import { showQuiz } from "../../state/actions/quizActions";
import QuestionForm from "./QuestionForm";

class EditQuiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editQuestionIndex: -1,
		};
	}

	componentDidMount() {
		let quizId = this.props.match.params.id;
		this.props.dispatch(showQuiz(quizId));
	}

	openEditForm = (question, index) => {
		this.setState({
			editQuestionIndex: index,
		});
	};

	syncQuestion = () => {};

	deleteQuestion = () => {};

	reportOnUpdate = (index) => {
		this.setState({ editQuestionIndex: -1, updatedQuestionIndex: index });
	};

	render() {
		console.log(this.props.quiz);
		const quiz = this.props.quiz;

		return (
			<>
				{quiz ? (
					<>
						<div className="container mt-4">
							<div>
								<input type="text" value={quiz.title} />
								<button>Save</button>
							</div>

							<div className="jumbotron mt-6 ml-6 mr-6">
								<div className="row">
									<div className="col mx-auto">
										{quiz.questions.map((question, i) => {
											return (
												<div
													className="col-md-6"
													key={i}
												>
													{this.state
														.editQuestionIndex ===
													i ? (
														<QuestionForm
															key={i}
															questionIndex={i}
															question={question}
															syncQuestion={false}
															isInvalidQuestion={
																false
															}
															deleteQuestion={() => {}}
															hideDeleteButton={
																true
															}
															isBeingUpdated={
																true
															}
															reportOnUpdate={
																this
																	.reportOnUpdate
															}
														/>
													) : (
														<>
															{this.state
																.updatedQuestionIndex ===
															i ? (
																<p className="success">
																	Saved
																	Successfully.
																</p>
															) : null}
															<h4>
																Q:
																{question.title}
															</h4>
															<div className="row">
																<button
																	onClick={() =>
																		this.openEditForm(
																			question,
																			i
																		)
																	}
																>
																	Edit
																</button>
																<button>
																	delete
																</button>
															</div>
														</>
													)}
												</div>
											);
										})}
									</div>
								</div>
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

function mapStateToProps(state) {
	return { quiz: state.quiz.quiz };
}

export default connect(mapStateToProps)(EditQuiz);
