var intialState = {
	userInfo: null,
	isAuthReqInProgress: false,
};

function currentUser(state = intialState, action) {
	switch (action.type) {
		case "FETCH_CURRENT_USER_START":
			return {
				...state,
				isAuthReqInProgress: true,
			};
		case "FETCH_CURRENT_USER_SUCCESS":
			return {
				...state,
				userInfo: action.payload,
				isAuthReqInProgress: false,
			};

		default:
			return state;
	}
}

export default currentUser;
