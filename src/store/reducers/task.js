import * as actionTypes from "../actions/actionTypes";

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
        email: null,
      },
      drawnUser: {
        id: null,
        name: null,
        email: null,
      },
      hidden: null,
      started: null,
      finished: null,
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_OWNED_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case actionTypes.FETCH_DRAWN_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case actionTypes.FETCH_FINISHED_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case actionTypes.TOGGLE_HIDDEN:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? action.task : task
        ),
      };
    case actionTypes.DELETE_TASK:
      const newTasks = state.tasks.filter((task) => task.id !== action.taskId);
      return {
        ...state,
        tasks: newTasks,
      };
    case actionTypes.CREATE_TASK:
      return {
        ...state,
        tasks: state.tasks.concat(action.newTask),
      };
      case actionTypes.DRAW_TASK:
        return {
          ...state,
          tasks: state.tasks.concat(action.drawnTask),
        };
    default:
      return state;
  }
};

export default reducer;
