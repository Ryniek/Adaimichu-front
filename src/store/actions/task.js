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
