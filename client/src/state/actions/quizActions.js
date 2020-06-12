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

const quizList = () => {
	return async (dispatch) => {
		try {
			let quizzes = await axios.get(`${url}/quiz`);
			dispatch({
				type: "FETCH_QUIZ_LIST",
				payload: quizzes.data,
			});
		} catch (error) {}
	};
};

const fetchQuiz = (id) => {
	console.log("in action");
	return async (dispatch) => {
		try {
			let quiz = await axios.get(`${url}/quiz/${id}`);
			dispatch({
				type: "FETCH_QUIZ",
				payload: quiz.data.quiz,
			});
		} catch (error) {}
	};
};

export { createQuiz, quizList, fetchQuiz };
