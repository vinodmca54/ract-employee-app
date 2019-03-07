import { createStore, applyMiddleware, compose } from "redux";
import thunk from "react-redux";
import rootReducer from "../reducers";

const intialState = {};
const store = createStore(rootReducer, intialState);

export default store;
