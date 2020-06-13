import { combineReducers } from "redux";
import currentUser from "./currentUser";
import quizReducer from "./quiz.js";

var rootReducer = combineReducers({
  currentUser,
  quiz: quizReducer,
});

export default rootReducer;
