import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [
        {
            id: null,
            name: null,
            comment: null,
            creationDate: null,
            daysToUse: null,
            expirationDate: null,
            finishDate: null,
            creator: {
                id: null,
                name: null,
                email: null
            },
            drawnUser: {
                id: null,
                name: null,
                email: null
            },
            hidden: null,
            started: null,
            finished: null
        }
    ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.FETCH_OWNED_TASKS:
    return {
        ...state,
        tasks: action.tasks
    };
  default:
    return state;
  }
}

export default reducer;