import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';
import authHeader from '../../services/auth-header';

export const fetchUserDetails = () => (dispatch) => {
    axios.get('/users', {headers: authHeader() })
    .then((response) => {
        dispatch({
            type: actionTypes.FETCH_USER_DETAILS,
            user: response.data,
        });
    })
};

export const setEmail = (newEmail) => (dispatch) => {
    axios.put('/users/email', null , { params: {
        address: newEmail,
      }, headers: authHeader()})
    .then((response) => {
        dispatch({
            type: actionTypes.SET_EMAIL,
            user: response.data,
        });
    })
};