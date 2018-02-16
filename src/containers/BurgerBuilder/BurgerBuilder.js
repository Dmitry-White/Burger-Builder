import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4.00
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngrediets = {
            ...this.state.ingredients
        };
        updateIngrediets[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngrediets
        });
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {

            return;
        };
        const updateCounted = oldCount - 1;
        const updateIngrediets = {
            ...this.state.ingredients
        };
        updateIngrediets[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngrediets
        });
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    disabled={disableInfo} 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </>
        );
    };
};

export default BurgerBuilder;