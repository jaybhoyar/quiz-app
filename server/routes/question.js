var express = require("express");
var router = express.Router();

var auth = require("../util/auth")

var questionController = require("../controller/question");

//create a question
router.post("/", auth.validateJwt ,questionController.createQuestion);

//delete a question
router.delete("/:id",auth.validateJwt, questionController.deleteQuestion);

// //update a question
router.put("/:id",auth.validateJwt, questionController.updateQuestion);

module.exports = router;
