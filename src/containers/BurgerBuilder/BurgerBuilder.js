import React, { Component } from 'react'
import axios from "../../axios-orders";
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     })
        return null;
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
        this.setState({purchasing: true});
    };

    purchaseContinueHandler = () => {
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
        let burger = (this.state.error) 
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        ttlPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingName => dispatch(burgerBuilderActions.addIngredient(ingName)),
        removeIngredientHandler: ingName => dispatch(burgerBuilderActions.removeIngredient(ingName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));