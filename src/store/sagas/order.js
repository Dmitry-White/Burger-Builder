import { put } from 'redux-saga/effects';
import axios from "../../axios-orders";

import * as orderActions from '../actions/';

export function* purchaseBurgerSaga(action) {
    yield put(orderActions.purchaseBurgerStart());
    try {
        const res = yield axios.post("/orders.json?auth=" + action.token, action.orderData);
        yield put(orderActions.purchaseBurgerSuccess(res.data.name, action.orderData));
    } catch (err) {
        yield put(orderActions.purchaseBurgerFail(err))
    };
};

export function* fetchOrdersSaga(action) {
    yield put(orderActions.fetchOrdersStart());
    try {
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const res = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for(let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            });
        };
        yield put(orderActions.fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        yield put(orderActions.fetchOrdersFail(err));
    };   
};