import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';
import authHeader from '../../services/auth-header';

export const login = (name, password) => (dispatch) => {
    // return new Promise((resolve, reject) => {
    //     axios.post('/auth/login', {name, password})
    //     .then((response) => {
    //         if (response.data) {
    //             localStorage.setItem('user', JSON.stringify(response.data));
    //         }
    //         dispatch({
    //             type: actionTypes.LOGIN_SUCCESS,
    //             user: response.data,
    //         });
    //         resolve(response)
    //     })
    //     .catch((error) => {
    //         dispatch({
    //             type: actionTypes.LOGIN_FAIL,
    //             error: 'Niepoprawne dane logowania'
    //         });
    //         reject(error)
    //     });
    // })
    axios.post('/auth/login', {name, password})
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    user: response.data,
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

export const setPassword = (passwords) => (dispatch) => {
    axios.put('/users/password', passwords , {headers: authHeader() })
    .then((response) => {
        localStorage.removeItem('user');
        dispatch({
            type: actionTypes.SET_PASSWORD,
        });
    })
};