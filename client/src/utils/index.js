function isValidQuestion(question) {
  var status = true;
  if (
    question.title &&
    question.answers &&
    question.options &&
    question.answers.length &&
    question.options.length === 4
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

export { isValidQuestion };
