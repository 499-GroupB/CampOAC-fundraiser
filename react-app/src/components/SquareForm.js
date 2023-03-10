import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MySelect, MyTextInput, MyRadio } from '../components/Inputs';
import getCurrentDate from '../components/CurrentDate';

import { PaymentForm } from 'react-square-web-payments-sdk';
import { CreditCard } from 'react-square-web-payments-sdk';



const SquareForm = (props) => {

    // access the price total via prop
    const {cardTokenizeResponseReceived} = props;
   
    // Api endpoint for order submission
    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/square/pay`;





    // this state is used for the order id sent from the api

    // conditional check if the state has been updated
    return (
        <div className='squareForm'>
            <PaymentForm
                applicationId="sandbox-XXXXXX"
                cardTokenizeResponseReceived = {cardTokenizeResponseReceived}
                locationId='XXXXXXXXXX'
            >
                <CreditCard 
                    buttonProps={{
                        css: {
                            backgroundColor: "#771520",
                            fontSize: "14px",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#530f16",
                            },
                        },
                    }}/>
            </PaymentForm>
        </div>
    );
};
