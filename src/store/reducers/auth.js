import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    email: "",
    password: ""
};

const authStart = (state, action) => {
    return updateObject(state);
};
const authSuccess = (state, action) => {
    return updateObject(state, action.authData);
};
const authFail = (state, action) => {
    return updateObject(state);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        default: break;
    };
    return state;
};

export default reducer;