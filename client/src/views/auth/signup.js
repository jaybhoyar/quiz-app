import React from "react";
import { Link } from "react-router-dom";
import { userSignup } from "../../state/actions/authActions";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    isPosting: false,
    successMsg: "",
    errorMsg: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.isPosting) {
      return;
    }

    // validation is missing

    this.setState({ isPosting: true });
    setTimeout(async () => {
      try {
        var res = await userSignup({ user: this.state });
        this.setState({ isPosting: false });

        if (res.status === 200) {
          this.setState({
            successMsg: (
              <p>
                Signed up successfully. <Link to="/login">Login here.</Link>
              </p>
            ),
            errorMsg: "",
          });
        }
      } catch (error) {
        this.setState({
          successMsg: "",
          errorMsg: <p>{error.error || "Something went wrong."}</p>,
        });
      }
    }, 3000);
  };

  render() {
    return (
      <section className="bg_signup">
        <div className="container">
          <div style={{ background: "green", color: "white" }}>
            {this.state.successMsg}
          </div>
          <div style={{ background: "red", color: "white" }}>
            {this.state.errorMsg}
          </div>
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Register</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input
                        type="text"
                        name="name"
                        id="inputUsername"
                        className="form-control "
                        placeholder="User Name"
                        value={this.state.username}
                        onChange={(e) => this.handleChange(e)}
                        required
                        autoFocus
                      />
                      <label htmlFor="inputUsername">User Name</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="email"
                        name="email"
                        id="inputEmail"
                        className="form-control"
                        value={this.state.email}
                        placeholder="Email address"
                        onChange={(e) => this.handleChange(e)}
                        required
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        name="password"
                        id="inputPassword"
                        className="form-control "
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e)}
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <button
                      onClick={(e) => this.handleSubmit(e)}
                      className="btn btn-lg btn-primary btn-block text-uppercase my-4"
                      type="submit">
                      Signup
                    </button>
                  </form>
                  <div className="my-2">
                    {" "}
                    Already has an account. <Link to="/login"> Login</Link>
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

export default Signup;
