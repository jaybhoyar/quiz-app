import React from "react";
import "bulma/css/bulma.css";
import HomePage from "./views/auth/HomePage";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import CreateQuiz from "./views/quiz/createQuiz";
import Header from "./views/common/Header";
import Login from "./views/auth/login";
import Signup from "./views/auth/signup";
import "./assets/stylesheets/main.scss";
import { identifyUser } from "./state/actions/authActions";

function ProtectedRoutes() {
	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/quiz/new" component={CreateQuiz} />
			<Route path="*" render={() => <h1>User already logged in</h1>} />
		</Switch>
	);
}

function PublicRoutes() {
	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/login" component={Login} />
			<Route path="/signup" component={Signup} />
		</Switch>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (localStorage["auth-token"]) {
			this.props.dispatch(identifyUser());
		}
	}

	render() {
		const currentUser = this.props.currentUser;
		return (
			<>
				{currentUser.isAuthReqInProgress ? (
					<div>Loading . . .</div>
				) : (
					<>
						<Header />
						{currentUser.userInfo ? (
							<ProtectedRoutes />
						) : (
							<PublicRoutes />
						)}
					</>
				)}
			</>
		);
	}
}

function mapStateToProps(state) {
	return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(App);
