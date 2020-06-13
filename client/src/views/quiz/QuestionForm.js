import React from "react";
import { connect } from "react-redux";
import { isValidQuestion } from "../../utils/index";
import { updateQuestion } from "../../state/actions/quizActions";

class QuestionForm extends React.Component {
	constructor(props) {
		super(props);

		const correctOptionsIndexGenerator = (answers = [], options = []) => {
			var correctOptionsIndex = [];
			answers.forEach((answer) => {
				const index = options.indexOf(answer);
				if (index !== -1) {
					correctOptionsIndex.push(index);
				}
			});
			return correctOptionsIndex;
		};

		this.state = {
			title: this.props.question.title || "",
			options: this.props.question.options || [],
			answers: this.props.question.answers || [],
			correctOptionsIndex: correctOptionsIndexGenerator(
				this.props.question.answers,
				this.props.question.options
			),
		};
	}

	handleChange = (e) => {
		this.setState(
			{
				[e.target.name]: e.target.value,
			},
			() => {
				this.syncQuestion();
			}
		);
	};

	updateOption = (e, index) => {
		const options = this.state.options;
		options[index] = e.target.value;
		this.setState({ options }, () => {
			this.syncQuestion();
		});
	};

	handleCheckbox = (e, index) => {
		let correctOptionsIndex = this.state.correctOptionsIndex;
		if (e.target.checked) {
			correctOptionsIndex.push(index);
		} else {
			correctOptionsIndex = correctOptionsIndex.filter(
				(option, i) => option !== index
			);
		}
		const answers = correctOptionsIndex.map(
			(option, i) => this.state.options[option]
		);
		this.setState({ correctOptionsIndex, answers }, () => {
			this.syncQuestion();
		});
	};

	syncQuestion = () => {
		if (!this.props.syncQuestion) {
			return;
		}
		const question = {};
		question.title = this.state.title;
		question.options = this.state.options;
		question.answers = this.state.correctOptionsIndex.map(
			(optionIndex, i) => {
				return this.state.options[optionIndex];
			}
		);
		this.props.syncQuestion(question, this.props.questionIndex);
	};

	updateQuestion = () => {
		const question = {
			title: this.state.title,
			options: this.state.options,
			answers: this.state.answers,
		};

		if (!isValidQuestion(question)) {
			return this.setState({ isInvalidQuestion: false });
		}

		// dispatch.
		this.props.dispatch(
			updateQuestion(this.props.question._id, { question })
		);
		this.props.reportOnUpdate &&
			this.props.reportOnUpdate(this.props.questionIndex);

		// send an update to parent
	};

	render() {
		return (
			<div className="shadow p-3 mb-5 bg-white rounded">
				<div className="form-row">
					<div className="form-group col-md-12">
						{this.props.isInvalidQuestion ||
						this.state.isInvalidQuestion ? (
							<div class="alert alert-danger" role="alert">
								Question should have title and all options
								filled and atleast one correct answer.
							</div>
						) : null}

						{!this.props.hideDeleteButton ? (
							<button
								button
								type="button"
								className="btn btn-warning mr-4 mb-2"
								onClick={() =>
									this.props.deleteQuestion(
										this.props.questionIndex
									)
								}
							>
								Delete
							</button>
						) : null}

						<label htmlFor="category">Question</label>
						<input
							onChange={(e) => this.handleChange(e)}
							type="text"
							name="title"
							className="form-control"
							id="title"
							value={this.state.title}
							required
						/>
					</div>

					<>
						{[1, 2, 3, 4].map((option, i) => {
							return (
								<div key={i} className="form-group col-md-6">
									<label htmlFor="subcategory">{`Option ${option}`}</label>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<div className="input-group-text">
												<input
													onChange={(e) =>
														this.handleCheckbox(
															e,
															i
														)
													}
													checked={this.state.correctOptionsIndex.includes(
														i
													)}
													type="checkbox"
													aria-label="Checkbox for following text input"
												/>
											</div>
										</div>
										<input
											type="text"
											value={this.state.options[i] || ""}
											onChange={(e) =>
												this.updateOption(e, i)
											}
											className="form-control"
											aria-label="Text input with checkbox"
										/>
									</div>
								</div>
							);
						})}
					</>

					{this.props.isBeingUpdated ? (
						<button onClick={this.updateQuestion}>Update</button>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(QuestionForm);
