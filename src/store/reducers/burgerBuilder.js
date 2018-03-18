import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient_1 = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients_1 = updateObject(state.ingredients, updatedIngredient_1)
            const updatedState_1 = {
                ingredients: updatedIngredients_1,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState_1);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient_2 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngredients_2 = updateObject(state.ingredients, updatedIngredient_2)
            const updatedState_2 = {
                ingredients: updatedIngredients_2,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState_2);
        case actionTypes.SET_INGREDIENTS:
            const updatedIngredients = {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            };
            return updateObject(state, updatedIngredients)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            break;      
    };
    return state; 
};

export default reducer;