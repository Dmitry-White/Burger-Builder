import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from "../../axios-orders";

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerActions from '../../store/actions/';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    };

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        };
        
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = (this.props.err) 
            ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>
            : <Spinner/>
        
        if (this.props.ings) {
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.ttlPrice}
                continued={this.purchaseContinueHandler}
                cancelled={this.purchaseCancelHandler}
            />
            burger = <>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    price={this.props.ttlPrice}
                    disabled={disableInfo} 
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    ingredientAdded={this.props.addIngredientHandler}
                    ingredientRemoved={this.props.removeIngredientHandler}
                    isAuth={this.props.isAuth}
                />
            </>
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        ttlPrice: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuth: state.auth.idToken !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingName => dispatch(burgerActions.addIngredient(ingName)),
        removeIngredientHandler: ingName => dispatch(burgerActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerActions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(burgerActions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));