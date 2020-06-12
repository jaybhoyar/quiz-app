var express = require("express");
var router = express.Router();
var userController = require("../controller/user");

var auth = require("../util/auth");

/* Get the current login user */
router.get("/", auth.validateJwt , userController.getCurrentUser)

// Register
router.post("/", userController.registerUser);

//Login
router.post("/login", userController.loginUser);

//Update
router.put("/",auth.validateJwt, userController.updateUser);

module.exports = router;
