import * as actionTypes from "../actions/actionTypes";

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
        return {
          ...state,
          user: action.user,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  