var express = require("express");
var router = express.Router();
var auth = require("../util/auth");

var quizController = require("../controller/quiz");

// list quizzes
router.get("/", quizController.listQuizzes);

//create a quiz
router.post("/", auth.validateJwt, quizController.createQuiz);

//find a quiz
router.get("/:id", auth.validateJwt, quizController.showQuiz);

//update a quiz
router.put("/:id", auth.validateJwt, quizController.updateQuiz);

// delete a quiz
router.delete("/:id", auth.validateJwt, quizController.deleteQuiz);

// attempt a quiz
router.post(
	"/:id/attempt",
	auth.allowGuest,
	auth.validateJwt,
	quizController.attemptQuiz
);

module.exports = router;
