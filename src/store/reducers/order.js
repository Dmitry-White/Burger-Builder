import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData,{id: action.orderID})
            const updatedState = {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
            return updateObject(state,updatedState);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updatedState(state, {loading: false});
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased:false});
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading:true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDERS_FAIL:
        return updatedState(state, {loading: false});
        default:
            break;
    };
    return state;
};

export default reducer;