import * as actionTypes from "../actions/actionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, error: null, success: null }
  : { isLoggedIn: false, user: null, error: null, success: null };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: action.error
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
};

export default reducer;