import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';
import authHeader from '../../services/auth-header';

export const deleteFinishedTask = (taskId) => (dispatch) => {
    axios.delete('/admin/tasks/' + taskId, {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.DELETE_TASK,
            taskId: taskId,
        });
    })
};