import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import * as orderActions from '../../store/actions/'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    };

    render() {
        let orders = this.props.orders.map(order => (
            <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
            />
        ));

        if(this.props.loading) {
            orders = <Spinner/>;
        };
        
        return (
            <div>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(orderActions.fetchOrders())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));