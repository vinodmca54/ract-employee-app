import { combineReducers } from "redux";
import employeReducer from "../reducers/employeReducer";

export default combineReducers({
  employeReducer: employeReducer
});
