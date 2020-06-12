var intialState = {
	quizList: [],
	quiz: "",
};

function Quiz(state = intialState, action) {
	switch (action.type) {
		case "FETCH_QUIZ_LIST":
			return { ...state, quizList: action.payload };
		case "FETCH_QUIZ":
			return { ...state, quiz: action.payload };
		default:
			return state;
	}
}

export default Quiz;
