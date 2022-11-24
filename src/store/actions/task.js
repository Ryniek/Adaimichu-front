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

export const fetchDrawnTasks = () => (dispatch) => {
    axios.get('/tasks/drawn/unfinished', {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.FETCH_DRAWN_TASKS,
            tasks: response.data
        });
    })
};

export const fetchFinishedTasks = () => (dispatch) => {
    axios.get('/tasks/finished', {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.FETCH_FINISHED_TASKS,
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
    .catch((error) => {
        return dispatch({
            type: actionTypes.CREATE_TASK_FAIL,
            error: error.response.data
        });
    });
};

export const editTask = (taskId, task) => (dispatch) => {
    axios.put('/tasks/' + taskId, task, {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.EDIT_TASK,
            editedTask: response.data,
            taskId: taskId
        });
    })
    .catch((error) => {
        return dispatch({
            type: actionTypes.EDIT_TASK_FAIL,
            error: error.response.data
        });
    });
};

export const drawTask = () => (dispatch) => {
    axios.post('/tasks/draw', {}, {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.DRAW_TASK,
            drawnTask: response.data
        });
    })
    .catch((error) => {
        return dispatch({
            type: actionTypes.DRAW_TASK_FAIL,
            error: error.response.data
        });
    });
};

export const finishTask = (taskId) => (dispatch) => {
    axios.post('/tasks/finish/' + taskId, {}, {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.FINISH_TASK,
            taskId: taskId
        });
    })
};