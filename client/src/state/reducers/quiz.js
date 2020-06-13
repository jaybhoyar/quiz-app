var intialState = {
	quizList: [],
	quiz: "",
	result: "",
};

function Quiz(state = intialState, action) {
	switch (action.type) {
		case "FETCH_QUIZ_LIST":
			return { ...state, quizList: action.payload };
		case "FETCH_QUIZ":
			return { ...state, quiz: action.payload };
		case "DELETE_QUIZ":
			return {
				...state,
				quizList: {
					...state.quizList,
					quizzes: state.quizList.quizzes.filter(
						(quiz) => quiz._id !== action.payload
					),
				},
			};
		case "ATTEMPT_QUIZ":
			return {
				...state,
				result: action.payload,
			};
		default:
			return state;
	}
}

export default Quiz;
