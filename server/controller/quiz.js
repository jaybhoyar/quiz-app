var Quiz = require("../models/quiz");
var Question = require("../models/question");
var Attempt = require("../models/attempt");

var { isValidQuestion } = require("../util/validatorModule");

module.exports = {
  createQuiz: async (req, res, next) => {
    try {
      var title = req.body.quiz.title;
      var questions = req.body.quiz.questions;

      if (!title) {
        return res.status(400).json({ message: "Title is empty" });
      }
      if (!questions || !questions.length) {
        return res
          .status(400)
          .json({ message: "please add atleast one question" });
      }

      var newQuiz = new Quiz({ title, authorId: req.userId });

      var validQuestions = [];

      questions.forEach((question) => {
        if (isValidQuestion(question)) {
          question.quizId = newQuiz._id;
          question.authorId = req.userId;
          validQuestions.push(question);
        }
      });

      var storedQuestions = await Question.insertMany(validQuestions);
      var questionIds = storedQuestions.map((question) => question._id);
      newQuiz.questions = questionIds;
      newQuiz.save().then((quiz) => res.json({ quiz }));
    } catch (error) {
      next(error);
    }
  },
  showQuiz: async (req, res, next) => {
    // extract id from params and store it in a variable
    var quizId = req.params.id;
    //find quiz with Quiz model and findById method (with await)
    try {
      var quiz = await Quiz.findById(quizId).populate("questions");

      //check if the quiz is not null
      if (!quiz) {
        return (
          res
            .status(404)
            //if so respond with proper status
            .json({
              success: false,
              message: "quiz not found or doesnt exist",
            })
        );
      }
      //if quiz exists then return it
      return res.json({ success: true, quiz });
    } catch (error) {
      next(error);
    }
  },
  updateQuiz: async (req, res, next) => {
    // find the quiz with quizid
    var quizId = req.params.id;
    try {
      if (!quizId) {
        return res.status(400).json({ message: "Bad input" });
      }
      // check whether the logged user is the author of the quiz
      var quiz = await Quiz.findById(quizId);
      // else return unauthorized
      if (!quiz || !quiz.authorId === req.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      //  find the quiz and update it
      var updatedQuizTitle = await Quiz.findByIdAndUpdate(
        quizId,
        {
          title: req.body.quiz.title,
        },
        { new: true }
      );

      res.json({ success: true, updatedQuizTitle });
    } catch (error) {
      next(error);
    }
  },
  deleteQuiz : async (req , res ,next) => {
    
    try {

      var quizId  = req.params.id;

      var quiz = await Quiz.findById(quizId);
      if(!quiz){
          return res.status(404).send({massage : "Quiz not found"});
        }
      if(req.userId !== quiz.authorId){
       return res.status(403).send({massage : "You are not authorized to delete the quiz"});
      }
       
      var {questions} = quiz;
     
      // delete all questions
       await Question.deleteMany({ _id : {
        $in : questions
      }})
     
      // finally delete quiz
       await Quiz.findByIdAndDelete(quizId);

        res.send({massage : "Quiz deleted successfully"})

    } catch (error) {
        next(error);
    }



  },
  attemptQuiz: async (req, res, next) => {
    try {
      var attempt = req.body.attempt;
      if (!attempt) {
        return res.status(400).send({ massage: "invalid input" });
      }
      var { quizId, questions } = attempt;

    
      // find the quiz populated with questions.
      // if quiz present, loop through the quiz.questions.
      // in the loop, if the quiz.questions.question._id is present in questions or not
      // build a object with question = { answers: q.answer || [], questionId: q._id } push
      // it in attemptedQuestions array,
      // verify if the anwer that the user provided is right or not.
      // create attempt

      var quiz = await Quiz.findById(quizId).populate("questions");
      var serializedQuestionIds = questions.map(
        (question) => question.questionId
      );
			
			
      var attemptedQuestions = quiz.questions.map((question, i) => {
        var index = serializedQuestionIds.indexOf(String(question._id));
			 
        return {
          questionId: question._id,
          answers: index == -1 ? [] : questions[index].answers,
          isCorrect: index == -1 ? false : hasCorrectAnswers(questions[index].answers, question.answers)
        };
			});

			var attempt = await Attempt.create({quizId , questions : attemptedQuestions , playerId : req.userId }) ;

			res.send({attempt});

    } catch (error) {
      throw(error);
    }
  },
};

function hasCorrectAnswers(userAnswers, correctAnswers){

  console.log(userAnswers, correctAnswers);
 

  if(userAnswers.length !== correctAnswers.length){
		return false;
	}
	var status = true
	userAnswers.forEach(answer =>{
		if(!correctAnswers.includes(answer)){
			status = false;
		}
	})
	return status;
}