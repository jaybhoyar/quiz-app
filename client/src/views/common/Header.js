import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
function Header(props) {
	return (
		<div className="bg-dark ">
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<a className="navbar-brand font-weight-bold" href="/">
						Quiz
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse " id="navbarNav">
						<ul className="navbar-nav ml-auto font-weight-bold">
							{props.user ? (
								<>
									<li className="nav-item">
										<NavLink
											to="/profile"
											activeClassName="active"
											className="nav-link text-white"
										>
											{props.user.name}
										</NavLink>
									</li>
									<li className="nav-item text-white">
										<NavLink
											to="/logout"
											activeClassName="active"
											className="nav-link text-white"
										>
											Logout
										</NavLink>
									</li>
								</>
							) : (
								<>
									<li className="nav-item">
										<NavLink
											to="/signup"
											activeClassName="active"
											className="nav-link"
										>
											Signup
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink
											to="/login"
											activeClassName="active"
											className="nav-link"
										>
											Login
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.currentUser.userInfo,
	};
}
export default connect(mapStateToProps)(Header);
