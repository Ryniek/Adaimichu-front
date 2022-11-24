import * as actionTypes from "../actions/actionTypes";
import { toast } from "react-toastify";
import { formatRelative } from "date-fns";
import { pl } from "date-fns/locale";

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
      toast.success("Zmieniono widoczność zadania: " + action.task.name);
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? action.task : task
        ),
      };
    case actionTypes.DELETE_TASK:
      toast.success("Zadanie zostało usunięte.");
      const newTasks = state.tasks.filter((task) => task.id !== action.taskId);
      return {
        ...state,
        tasks: newTasks,
      };
    case actionTypes.CREATE_TASK:
      toast.success("Zadanie zostało utworzone.");
      return {
        ...state,
        tasks: [action.newTask, ...state.tasks],
      };
    case actionTypes.CREATE_TASK_FAIL:
      toast.error(action.error[0].message);
      return {
        ...state,
      };
    case actionTypes.EDIT_TASK:
      toast.success("Zadanie zostało zedytowane.");
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? action.editedTask : task
        ),
      };
    case actionTypes.EDIT_TASK_FAIL:
      toast.error(action.error[0].message);
      return {
        ...state,
      };
    case actionTypes.DRAW_TASK:
      toast.success("Wylosowałeś nowe zadanie: " + action.drawnTask.name);
      return {
        ...state,
        tasks: state.tasks.concat(action.drawnTask),
      };
    case actionTypes.DRAW_TASK_FAIL:
      toast.error(
        "Kolejne losowanie dostępne: " +
          formatRelative(new Date(action.error[0].message), new Date(), { locale: pl })
      );
      return {
        ...state,
      };
    case actionTypes.FINISH_TASK:
      toast.success("Zadanie zakończone!");
      const afterFinishTasks = state.tasks.filter(
        (task) => task.id !== action.taskId
      );
      return {
        ...state,
        tasks: afterFinishTasks,
      };
    default:
      return state;
  }
};

export default reducer;
