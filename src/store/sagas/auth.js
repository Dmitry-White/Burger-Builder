import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import axios from 'axios';

import * as authActions from '../actions/';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(authActions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(authActions.logoutInit());
};

export function* authUserSaga(action) {
    yield put(authActions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyADPIvnMPZEDlnCf7Ss1OP0MnaFPlXG-oI';
    if(!action.isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyADPIvnMPZEDlnCf7Ss1OP0MnaFPlXG-oI';
    };

    try {
        const res = yield axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn*1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);
        yield put(authActions.authSuccess(res.data.idToken, res.data.localId));
        yield put(authActions.checkAuthTimeout(res.data.expiresIn));
    } catch(err) {
        put(authActions.authFail(err.response.data.error));
    };
};

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if(!token) {
        yield put(authActions.logoutInit());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()){
            yield put(authActions.logoutInit());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(authActions.authSuccess(token, userId));
            yield put(authActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        };
    };
};