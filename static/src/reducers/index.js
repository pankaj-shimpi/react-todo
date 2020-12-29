import { combineReducers } from "redux";
import userReducers from "./userReducer";
import todoReducers from "./todoReducer";

export default combineReducers({ userReducers, todoReducers });
