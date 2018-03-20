import axios from 'axios'
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authSuccess({email: email, password: password}));
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyADPIvnMPZEDlnCf7Ss1OP0MnaFPlXG-oI', authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    };
};