import "../css/Style.css";
import { PaymentForm } from 'react-square-web-payments-sdk';
import { CreditCard } from 'react-square-web-payments-sdk';
import { useState } from "react";
import axios from "axios";

export default function Payment(props) {

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/payment/pay` // payment api endpoint
    const [state, setState] = useState(0)

    switch (state) {
        case (-1):
            return (
                <h1>Something wen't tragically wrong</h1>
            )
        case (0):
            return (
                <PaymentForm
                    applicationId="sandbox-sq0idb-DikudyJ1YX10FKud-En5QA"
                    cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                        // debug stuff
                        console.log('token:', token);
                        console.log('verifiedBuyer:', verifiedBuyer);
                        //
                        // call to payment api endpoint
                        axios.post(apiEnd, { data: token.token },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                                    "Access-Control-Allow-Credentials": "true",
                                }
                            })
                            .then(function (response) {
                                console.log(response);
                                setState(response.data.state);
                            })
                            // Catching axios error
                            // Currently outputs to browser console (not  good)
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                    locationId='LMP9B4EQFAQTM'>
                    <CreditCard
                        buttonProps={{
                            css: {
                                backgroundColor: "#2c4356",
                                fontSize: "14px",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#0D2538",
                                },
                            },
                        }}></CreditCard>
                </PaymentForm>
            )
        case (1):
            return (
                <h1>Success, we've recieved your payment</h1>
            )
        default:
            return (
                <h1>I honestly don't know why I'm here</h1>
            )
    }
}