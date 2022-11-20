import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';
import authHeader from '../../services/auth-header';

export const fetchOwnedTasks = () => (dispatch) => {
    axios.get('/tasks/owned', {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.FETCH_OWNED_TASKS,
            tasks: response.data
        });
    })
};

export const toggleHidden = (taskId) => (dispatch) => {
    axios.put('/tasks/toggle/hidden/' + taskId, {} , {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.TOGGLE_HIDDEN,
            taskId: taskId,
            task: response.data
        });
    })
};

export const deleteTask = (taskId) => (dispatch) => {
    axios.delete('/tasks/' + taskId, {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.DELETE_TASK,
            taskId: taskId
        });
    })
};

export const createTask = (task) => (dispatch) => {
    axios.post('/tasks', task, {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.CREATE_TASK,
            newTask: response.data
        });
    })
};