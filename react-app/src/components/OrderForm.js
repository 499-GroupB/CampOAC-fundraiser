// Global NPM requisites
import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MySelect, MyTextInput, MyRadio } from '../components/Inputs';
import getCurrentDate from '../components/CurrentDate';


// Order form
const OrderForm = (props) => {

    // bag price
    // make this changeable somewhere
    const price = 8;

    // access a location via prop
    const { location, onSubmit } = props;
    const [payNow, setPayNow] = useState(false);
    //const [numBags, setNumBags] = useState(1);
    const currDate = getCurrentDate();
    
    const togglePay = (value) => {
        setPayNow(value);
        console.log(payNow);
    }

    // conditional check if the state has been updated
    return (
        <div className='order-form'>
            <h1>ordering from {location.name.toLowerCase()}</h1>
            <h3>Enter your information below</h3>
            <Formik
                enableReinitialize={true}
                // Formik requires intial values to be set
                // This is also how the variables appear in the api response
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    sms: '',
                    pickUp: location.name,
                    locationId: location._id,
                    numBags: 1,
                    payment: '',
                    date: currDate,
                    fulfilled: false,
                    location: location,
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
                        .typeError('Amount must be a number')
                        .integer("Invalid number of bags")
                        .max(location.stock, "Maximum amount available is " + location.stock + ".")
                        .min(1, "Minimum 1")
                        .required('Required'),
                    sms: Yup.string()
                        .oneOf(['true', 'false'], 'You must select a notification option')
                        .required('Required'),
                    payment: Yup.string()
                        .oneOf(['credit', 'cash'], 'You must select a payment option')
                        .required('Required'),
                })}

                // Form submission event.
                // it is asinine that this works :o
                onSubmit={onSubmit}
            >{({
                values,
              }) => (
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
                    <br></br>
                    <div class="sms">
                    <div>
                        <MyRadio name="sms" value="true">
                            &nbsp;SMS notifications
                        </MyRadio>
                    </div>
                    <div>
                        <MyRadio name="sms" value="false">
                            &nbsp;Only email notifications
                        </MyRadio>
                    </div>
                    </div>
                    <br></br>
                    <p><i>Invoice email will be sent regardless</i></p>
                    <br></br>
                    <MyTextInput
                        //BAG NUMBER SELECTION  
                        label="Number of Bags: "
                        name="numBags"
                        type="number"
                        placeholder='1'
                    />
                    <p>
                        <b>Order Total: ${values.numBags * price}</b>
                        <br></br>
                        The quantity of wood in each bag is xxx pounds approx.
                        <br></br>
                        <i>Note tax is not included in the listed price</i>
                    </p>
                    <br></br><br></br>
                    <div class="payy">
                        <div>
                            <img class="paymentImage" src="credit-card-payment-icon.png" alt="Pay now with credit card"/>
                            <MyRadio name="payment" value="credit" onClick={() => setPayNow(true)}>
                                &nbsp;Pay now with credit card
                            </MyRadio>
                        </div>
                        <div>
                            <img class="paymentImage" src="payment-icon.png" alt="Pay with cash upon pick up"/>
                            <MyRadio name="payment" value="cash" onClick={() => setPayNow(false)}>
                                &nbsp;Pay with cash upon pick up
                            </MyRadio>
                        </div>
                    </div>
                    <br></br><br></br>
                    <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
            <br />
        </div>
    );
};
export default OrderForm;