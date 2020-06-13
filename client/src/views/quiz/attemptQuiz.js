import React, { Component } from "react";
import { connect } from "react-redux";
import { showQuiz } from "../../state/actions/quizActions";

class AttemptQuiz extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props.match.params.id);
		this.props.dispatch(showQuiz(this.props.match.params.id));
	}
	render() {
		var questions = this.props.quiz.questions;
		return (
			<>
				{this.props.quiz ? (
					<>
						<div className="container mt-4">
							<h1 class="display-5">{this.props.quiz.title}</h1>
							<div className="jumbotron mt-6 ml-6 mr-6">
								<div class="row">
									<div class="col mx-auto">
										{questions.map((question, i) => {
											return (
												<div class="col-md-6" key={i}>
													<h4>
														{" "}
														Q: {question.title}
													</h4>
													<div class="row">
														{question.options.map(
															(option, i) => {
																return (
																	<div class="col-6">
																		<div class="form-check">
																			<input
																				class="form-check-input"
																				type="checkbox"
																				value=""
																				id="defaultCheck1"
																			/>
																			<label
																				class="form-check-label"
																				for="defaultCheck1"
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
function mapStateToProps({ quiz }) {
	return { quiz: quiz.quiz };
}

export default connect(mapStateToProps)(AttemptQuiz);
