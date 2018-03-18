import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const start = (state, action) => {
    return updateObject(state, {loading: true});
};

const fail = (state, action) => {
    return updateObject(state, {loading: false});
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased:false});
};

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData,{id: action.orderID})
    const updatedState = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    };
    return updateObject(state,updatedState);
};

const fetchSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return start(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return fail(state, action);
        case actionTypes.FETCH_ORDERS_START: return start(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fail(state, action);
        default: break;
    };
    return state;
};

export default reducer;