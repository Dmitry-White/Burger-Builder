import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = e => {
        e.preventDefault();
        console.log(this.props.ingredients)
        console.log("PROCEED!");
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    };

    render() {
        let form = (
            <form>
                    <input type='text' name='name' placeholder='Your Name' />
                    <input type='email' name='email' placeholder='Your Email' />
                    <input type='text' name='street' placeholder='Street' />
                    <input type='text' name='postal' placeholder='Postal Code' />
                    <Button clicked={this.orderHandler} btnType='Success'>ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner/>;
        };

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;