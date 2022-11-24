import * as actionTypes from "../actions/actionTypes";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, error: null, success: null }
  : { isLoggedIn: false, user: null, error: null, success: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      toast.success("Zalogowano!");
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
      };
    case actionTypes.LOGIN_FAIL:
      toast.error("Niepoprawne dane logowania.");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.error,
      };
    case actionTypes.LOGOUT:
      toast.success("Wylogowano!");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case actionTypes.SET_PASSWORD:
      toast.success("Hasło zostało zmienione. Zaloguj się ponownie.");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case actionTypes.SET_PASSWORD_FAIL:
      toast.error(action.error[0].message);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
