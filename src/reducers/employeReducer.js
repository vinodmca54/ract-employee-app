//import { get_empdata } from "../actions/types";
//import { getempdata } from "../actions/employeeActions";

const intialState = {
  showempreg: false,
  empdata: []
};

export default function(state = intialState, action) {
  switch (action.type) {
    case "get_empdata":
      return { ...state, empdata: action.payload };
    case "delete_empdata":
      return { ...state, empdata: action.payload };
    case "show_model":
      return { ...state, showempreg: true };
    default:
      return state;
  }
}
