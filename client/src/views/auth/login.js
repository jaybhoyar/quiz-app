import React from "react";
import { connect } from "react-redux";
import { userLogin } from "../../state/actions/authActions";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errorMsg: "",
		};
	}

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let res = await this.props.dispatch(userLogin(this.state));

			console.log(res, "inside submit");

			if (!res) {
				return this.setState({
					errorMsg: <p>{"Something went wrong."}</p>,
				});
			}

			alert("Logged In Successfully");
			this.props.history.push("/quiz/new");
		} catch (error) {
			console.log("inside catch");
		}
		//preventDdefault
	};

	render() {
		return (
			<section className="bg_login">
				<h1>{this.state.errorMsg}</h1>
				<div className="container">
					<div className="row">
						<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
							<div className="card card-signin my-5">
								<div className="card-body">
									<h5 className="card-title text-center">
										Sign In
									</h5>
									<form className="form-signin">
										<div className="form-label-group">
											<input
												onChange={(e) =>
													this.handleInput(e)
												}
												name="email"
												type="email"
												id="inputEmail"
												className="form-control"
												placeholder="Email address"
												value={this.state.email}
												required
												autoFocus
											/>
											<label htmlFor="inputEmail">
												Email address
											</label>
										</div>

										<div className="form-label-group">
											<input
												onChange={(e) =>
													this.handleInput(e)
												}
												name="password"
												type="password"
												id="inputPassword"
												className="form-control "
												placeholder="Password"
												value={this.state.password}
												required
											/>
											<label htmlFor="inputPassword">
												Password
											</label>
										</div>

										<div className="custom-control custom-checkbox mb-3">
											<input
												type="checkbox"
												className="custom-control-input"
												id="customCheck1"
											/>
											<label
												className="custom-control-label"
												htmlFor="customCheck1"
											>
												Remember password
											</label>
										</div>
										<button
											onClick={(e) =>
												this.handleSubmit(e)
											}
											className="btn btn-lg btn-primary btn-block text-uppercase"
											type="primary"
										>
											Sign in
										</button>
										<hr className="my-4" />
									</form>
									<div className="my-2">
										{" "}
										Does't have an account.{" "}
										<a href="/signup"> Signup</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

// function mapStateToProps(state)

export default connect()(Login);
