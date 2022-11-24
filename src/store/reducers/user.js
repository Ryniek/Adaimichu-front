import * as actionTypes from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
    user: {
        id: null,
        name: null,
        email: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_USER_DETAILS:
        return {
          ...state,
          user: action.user,
        };
      case actionTypes.SET_EMAIL:
        toast.success("Email został zmieniony.");
        return {
          ...state,
          user: action.user,
        };
        case actionTypes.SET_EMAIL_FAIL:
          toast.error(action.error);
          return {
            ...state,
          };
      default:
        return state;
    }
  };
  
  export default reducer;
  