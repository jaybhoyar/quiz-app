var Quiz = require("../models/quiz");
var Question = require("../models/question");
var { isValidQuestion } = require("../util/validatorModule");

module.exports = {
  createQuestion: async (req, res, next) => {
    // find id of the quiz it belongs to
    var question = req.body.question;
    try {
      if (!isValidQuestion(question)) {
        return res.status(400).json({ message: "invalid question" });
      }

      if (!question.quizId) {
        return res.status(404).json({ message: "quiz id not found" });
      }

      var quiz = await Quiz.findById(question.quizId);

      if (!quiz) {
        return res.status(404).json({ message: "quiz doesnt exist in db" });
      }

      question.authorId = req.userId;

      var newQuestion = await Question.create(question);

      quiz.questions.push(newQuestion._id);

      quiz.save();

      res.json({ success: true, question: newQuestion });
    } catch (error) {
      next(error);
    }
  },

  updateQuestion: async (req, res, next) => {
    var questionId = req.params.id;
    try {
      var { question } = req.body;
      if (!req.body.question) {
        return res.status(404).json({ message: "Question Not Found" });
      }
      if (!isValidQuestion(question)) {
        return res.status(404).json({ message: "Invalid Question" });
      }

      if (question.authorId !== req.userId) {
        return res
          .status(403)
          .json({ massage: "You are not author of that question" });
      }

      var updatedQuestion = await Question.findByIdAndUpdate(
        questionId,
        question,
        { new: true }
      );
      res.json({
        message: "Question updated successfully",
        question: updatedQuestion,
      });
    } catch (error) {
      next(error);
    }
    // extract the question id from req.params
    // use trycatch block to capture any errors
    // validations: (send appropriate respose based on different validations)
    // check if the question exists in req.body
    // use isValidQuestion module to weed out incorrect entries
    // use findByIdAndUpdate and pass in id and data from req.body as parameters
  },

  deleteQuestion: async (req, res, next) => {
    var questionId = req.params.id;
    try {
      var question = await Question.findById(questionId);

      if (!question) {
        return res.status(404).send({ massage: "Question not found" });
      }

      if (question.authorId !== req.userId) {
        return res
          .status(403)
          .json({ massage: "You are not author of that question" });
      }

      await Quiz.findByIdAndUpdate(
        question.quizId,
        {
          $pull: { questions: questionId },
        },
        { new: true }
      );
      await Question.findByIdAndDelete(questionId);
      res.json({ message: "question deleted successfully" });
    } catch (error) {
      next(error);
    }
    // extract the question id from req.params
    // use trycatch block to capture any errors
    //  validations: (send appropriate respose based on different validations)
    // remove the question id from the respective quiz
    // use findByIdAndDelete and pass in id
  },
};
