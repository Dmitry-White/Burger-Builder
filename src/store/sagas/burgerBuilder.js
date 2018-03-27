import { put } from 'redux-saga/effects';
import axios from "../../axios-orders";

import * as burgerActions from '../actions/';

export function* initIngredientsSaga() {
    try {
        const res = yield axios.get('/ingredients.json');
        yield put(burgerActions.setIngredients(res.data));
    } catch (err) {
        yield put(burgerActions.fetchIngredientsFailed());
    }
};