import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    };

    checkoutCancelledHandeler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandeler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandeler}
                    checkoutContinued={this.checkoutContinuedHandeler}
                />
            </div>
        )
    }
}

export default Checkout;