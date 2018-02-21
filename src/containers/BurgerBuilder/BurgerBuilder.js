import React, { Component } from 'react'
import axios from "../../axios-orders";

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://react-white-burger.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            })
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updateCounted = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    };

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseContinueHandler = () => {
        console.log("PROCEED!");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Dmitry White",
                address: {
                    street: "Teststreet 1",
                    zipCode: "12345",
                    country: "UK"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        };

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing:false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing:false
                });
            });
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = (this.state.error) 
            ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>
            : <Spinner/>
        
        if (this.state.ingredients) {
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                continued={this.purchaseContinueHandler}
                cancelled={this.purchaseCancelHandler}
            />
            burger = <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    disabled={disableInfo} 
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </>
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <>
                <Modal 
                    show={this.state.purchasing}
                    cancelled={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    };
};

export default withErrorHandler(BurgerBuilder, axios);