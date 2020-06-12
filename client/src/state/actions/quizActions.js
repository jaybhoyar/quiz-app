import axios from "axios";
const url = "/api/v1";

const setTokenToAxios = (token) => {
	axios.defaults.headers.common["authorization"] =
		token || localStorage["auth-token"] || "";
};

setTokenToAxios();

const createQuiz = (data) => {
	return async (dispatch) => {
		try {
			// dispatch({ type: "FETCH_CURRENT_USER_START" });

			let quiz = await axios.post(`${url}/quiz`, data);

			// dispatch({
			//   // type: "FETCH_CURRENT_USER_SUCCESS",
			//   payload: user.data.user,
			// });
		} catch (error) {}
	};
};

export { createQuiz };
