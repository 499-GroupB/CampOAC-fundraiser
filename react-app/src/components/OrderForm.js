// Global NPM requisites
import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MySelect, MyTextInput, MyRadio } from '../components/Inputs';
import getCurrentDate from '../components/CurrentDate';

// Order form
const OrderForm = (props) => {

    // access a location via prop
    const { location, onSubmit } = props;
    const currDate = getCurrentDate();
    // Api endpoint for order submission
    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/order/submit`;

    // this state is used for the order id sent from the api

    // conditional check if the state has been updated
    return (
        <div className='order-form'>
            <h1>ordering from {location.name.toLowerCase()}</h1>
            <Formik
                // Formik requires intial values to be set
                // This is also how the variables appear in the api response
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    sms: '',
                    pickUp: location.name,
                    numBags: '1',
                    payment: '',
                    date: currDate,
                }}

                // Validation schema via https://www.npmjs.com/package/yup
                // Use this to define what will cause the Formik errors to generate
                // per input. Also puts hards limits on inputs
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    phone: Yup.string()
                        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number')
                        .required('Required'),
                    numBags: Yup.number()
                        .integer("Invalid number of bags")
                        .max(location.stock, "Maximum amount available is " + location.stock + ".")
                        .min(1, "Minimum 1")
                        .required('Required'),
                    payment: Yup.string()
                        .oneOf(['credit', 'cash'], 'You must select a payment option')
                        .required('Required'),
                })}

                // Form submission event.
                // it is asinine that this works :o
                onSubmit={onSubmit}
            >
                <Form>
                    <MyTextInput
                        //NAME ENTRY
                        label="First Name: "
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                    />
                    <br></br>
                    <MyTextInput
                        //NAME ENTRY          
                        label="Last Name: "
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                    />
                    <br></br>
                    <MyTextInput
                        //EMAIL ENTRY 
                        label="Email Address: "
                        name="email"
                        type="email"
                        placeholder="email@address.com"
                    />
                    <br></br>
                    <MyTextInput
                        //PHONE NUMBER ENTRY 
                        label="Phone Number: "
                        name="phone"
                        type="text"
                        placeholder="123-123-1234"
                    />
                    <br></br>
                    <MyRadio name="sms" value="isSMS">
                        Check to receive invoice by SMS messaging
                    </MyRadio>
                    <br></br>
                    <MyTextInput
                        //BAG NUMBER SELECTION 
                        label="Number of Bags: "
                        name="numBags"
                        type="number"
                        placeholder="1"
                    />
                    <p>
                        <b><u>Price per bag: $8.99</u></b>

                    </p>
                    <br></br>
                    <MyRadio name="payment" value="credit">
                        Pay now with credit card
                    </MyRadio>
                    <MyRadio name="payment" value="cash">
                        Pay with cash upon pick up
                    </MyRadio>
                    <br></br>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <br />
        </div>
    );
};
export default OrderForm;