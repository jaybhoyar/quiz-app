import { combineReducers } from "redux";
import currentUser from "./currentUser";

var rootReducer = combineReducers({
  currentUser,
});

export default rootReducer;
