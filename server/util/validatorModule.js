function isValidQuestion(question) {
	var status = true;
	if (
		question.title &&
		question.answers &&
		question.options &&
		question.answers.length &&
		question.options.length == 4
	) {
		question.answers.forEach((answer) => {
			if (!question.options.includes(answer)) {
				status = false;
			}
		});
	} else {
		status = false;
	}

	return status;
}

function isValidUser(user) {
	return (
		user.name &&
		user.email &&
		user.password &&
		user.password.length > 5 &&
		user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
	);
}




module.exports = { isValidQuestion, isValidUser };
