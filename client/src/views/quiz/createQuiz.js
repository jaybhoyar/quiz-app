import React from "react";
import { connect } from "react-redux";
import QuestionForm from "./QuestionForm";
import { createQuiz } from "../../state/actions/quizActions";
import { isValidQuestion } from "../../utils/index";

class CreateQuiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			questions: [
				{
					title: "",
					options: [],
					answers: [],
				},
			],
			invalidQuestions: [],
			errorMsg: "",
		};
	}

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value, errorMsg: "" });
	};

	syncQuestion = (question, index) => {
		const questions = this.state.questions;
		questions[index] = question;
		this.setState({ questions });
	};

	addQuestion = (e) => {
		e.preventDefault();
		const questions = this.state.questions;
		questions.push({
			title: "",
			options: [],
			answers: [],
		});
		this.setState({ questions });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		if (!this.state.title) {
			return this.setState({ errorMsg: "Title is must." });
		}

		const questions = this.state.questions;
		var invalidQuestions = [];
		questions.forEach((question, index) => {
			if (!isValidQuestion(question)) {
				invalidQuestions.push(index);
			}
		});

		if (invalidQuestions.length) {
			return this.setState({ invalidQuestions });
		}

		const quiz = {
			title: this.state.title,
			questions: this.state.questions,
		};

		// make a dispatch.
		this.props.dispatch(createQuiz({ quiz }));
		if (!this.state.errorMsg) {
			this.props.history.push("/");
		}
	};

	deleteQuestion = (index) => {
		const questions = this.state.questions;
		questions.splice(index, 1);
		this.setState({ questions });
	};

	render() {
		return (
			<>
				<form className="container my-3">
					<h2 className="font-weight-bold my-3"> Create Quiz</h2>

					{this.state.errorMsg ? (
						<p style={{ background: "red", color: "white" }}>
							Quiz must have a title.
						</p>
					) : null}

					<div className="row">
						<div className="form-group col-md-6">
							<label htmlFor="title">Title</label>
							<input
								onChange={(e) => this.handleInput(e)}
								type="text"
								name="title"
								className="form-control"
								id="title"
								value={this.state.title}
								required
							/>
						</div>
					</div>

					{/* create questions  */}
					{this.state.questions.length ? (
						this.state.questions.map((question, i) => {
							return (
								<QuestionForm
									key={i}
									questionIndex={i}
									question={question}
									syncQuestion={this.syncQuestion}
									isInvalidQuestion={this.state.invalidQuestions.includes(
										i
									)}
									deleteQuestion={this.deleteQuestion}
									hideDeleteButton={
										i === 0 &&
										this.state.questions.length === 1
									}
								/>
							);
						})
					) : (
						<div>No Questions.</div>
					)}

					<div className="d-flex justify-content-between">
						<div>
							<button
								onClick={this.handleSubmit}
								type="primary"
								className="btn btn-primary"
							>
								Create
							</button>
						</div>
						<div className="align-self-end">
							<button
								type="button"
								className="btn btn-outline-primary"
								onClick={this.addQuestion}
							>
								Add Question
							</button>
						</div>
					</div>
				</form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(CreateQuiz);
