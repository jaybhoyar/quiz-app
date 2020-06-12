import axios from "axios";
const url = "/api/v1";

const setTokenToAxios = (token) => {
	axios.defaults.headers.common["authorization"] =
		token || localStorage["auth-token"] || "";
};

setTokenToAxios();

const userSignup = async (data) => {
	try {
		let res = await axios.post(`${url}/users`, data);
		return res;
	} catch (error) {
		console.log(error);
	}
};

const userLogin = (data) => {
	return async (dispatch) => {
		try {
			let res = await axios.post(`${url}/users/login`, { user: data });
			//store the token in the local
			localStorage.setItem("auth-token", res.data.token);
			setTokenToAxios(res.data.token);
			console.log(res.data, "res.data");

			dispatch({ type: "FETCH_CURRENT_USER_SUCCESS", payload: res.data.user });

			return true;
		} catch (error) {
			return false;
		}
	};
};

const identifyUser = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_CURRENT_USER_START" });

			let user = await axios.get(`${url}/users`);

			dispatch({
				type: "FETCH_CURRENT_USER_SUCCESS",
				payload: user.data.user,
			});
		} catch (error) {}
	};
};

export { userSignup, userLogin, identifyUser };
