import React from "react";

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
		};
	}
	componentDidMount() {}
	render() {
		return (
			<>
				<div>
					<h1>Quiz List</h1>
				</div>
				<div className="container">
					<div className="row ">
						{[1, 2, 3, 4, 5].map((i) => {
							return (
								<div className="col-6 col-md-4 mb-4" key={i}>
									<div
										className="card"
										style={{ width: "18rem" }}
									>
										<img
											className="card-img-top"
											style={{
												height: "160px",
												objectFit: "cover",
												filter: " opacity(.8)",
											}}
											src="https://thumbs.dreamstime.com/z/quiz-test-survey-exam-vector-concept-online-laptop-education-illustration-80657742.jpg"
											alt="Card image cap"
										/>
										<div className="card-body">
											<h5 className="card-title">
												Cricket
											</h5>
											<a
												href="#"
												className="btn btn-primary"
											>
												Play
											</a>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</>
		);
	}
}

export default HomePage;
