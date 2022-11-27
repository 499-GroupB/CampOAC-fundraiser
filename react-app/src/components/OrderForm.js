// Global NPM requisites
import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MySelect, MyTextInput, MyRadio } from '../components/Inputs';

// Order form
const OrderForm = (props) => {

    // access a location via prop
    const { location, onSubmit } = props;

    // Api endpoint for order submission
    const apiEnd = 'http://localhost:3000/order/submit';

    // this state is used for the order id sent from the api

    // conditional check if the state has been updated
    return (
        <div className='order-form'>
            <h1>Ordering from {location.name}</h1>
            <Formik
                // Formik requires intial values to be set
                // This is also how the variables appear in the api response
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    pickUp: location.name,
                    numBags: '1',
                    payment: '',
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
                        .required('Required'),
                    phone: Yup.number()
                        .required('Required'),
                    numBags: Yup.number()
                        .max(location.stock, "Maximum amount available is " + location.stock + ".")
                        .min(1, "Minimum 1")
                        .required('Required'),
                    payment: Yup.string()
                        .oneOf(['square', 'invoice'], 'You must select a payment option')
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
                        placeholder="Jane"
                    />
                    <br></br>
                    <MyTextInput
                        //NAME ENTRY          
                        label="Last Name: "
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />
                    <br></br>
                    <MyTextInput
                        //EMAIL ENTRY 
                        label="Email Address: "
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <br></br>
                    <MyTextInput
                        //PHONE NUMBER ENTRY 
                        label="Phone Number: "
                        name="phone"
                        type="text"
                        placeholder="1231231234"
                    />
                    <br></br>
                    <MyTextInput
                        //BAG NUMBER SELECTION 
                        label="Number of Bags: "
                        name="numBags"
                        type="number"
                        placeholder="1"
                    />
                    <br></br>
                    <MyRadio name="payment" value="square">
                        Pay now with square
                    </MyRadio>
                    <MyRadio name="payment" value="invoice">
                        Pay later with invoice
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