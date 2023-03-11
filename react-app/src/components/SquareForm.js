import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MySelect, MyTextInput, MyRadio } from '../components/Inputs';
import getCurrentDate from '../components/CurrentDate';
import StepMeter from './StepMeter';

import { PaymentForm } from 'react-square-web-payments-sdk';
import { CreditCard } from 'react-square-web-payments-sdk';



export default function SquareForm() {

    // access the price total via prop
    
   
    // Api endpoint for order submission
    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/square/pay`;





    // this state is used for the order id sent from the api

    // conditional check if the state has been updated
    return (
        <div className='squareForm'>
            <PaymentForm
                applicationId={process.env.SQUARE_APPLICATION_ID} //sandbox id, will need to be changed for production
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    const response = await fetch({apiEnd}, {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                        
                      },
                      body: JSON.stringify({
                        sourceId: token.token,
                      }),
                    });
                    console.log(await response.json());
                    
                  }}
                locationId={process.env.SQUARE_LOCATION_ID} //sandbox id, will need to be changed for production
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
