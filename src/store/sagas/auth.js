import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga';

import * as authActions from '../actions/'

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