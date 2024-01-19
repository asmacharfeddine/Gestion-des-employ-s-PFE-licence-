import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//combine all reducers in this file

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
 
});
