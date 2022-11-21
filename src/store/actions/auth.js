import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const login = (name, password) => (dispatch) => {
    axios.post('/auth/login', {name, password})
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: { user: response.data }
                });
            })
            .catch((error) => {
                return dispatch({
                    type: actionTypes.LOGIN_FAIL,
                    error: 'Niepoprawne dane logowania'
                });
            });
};
  
export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch({
        type: actionTypes.LOGOUT,
    });
};