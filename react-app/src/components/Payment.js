import "../css/Style.css";
import { PaymentForm, CreditCard, ApplePay, GooglePay } from 'react-square-web-payments-sdk';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Payment(props) {

    const { order } = props;
    let price = 0;
    try {
        price = order.numBags * 8;
    }catch {
        price = "unknown";
    }

    console.log(price);

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/payment/pay` // payment api endpoint
    const [state, setState] = useState(0)

    const displayOrderInfo = (props) => {
        return (
            <>
                <h2>Order Total: ${props.order.numBags * 8}</h2>
                <pre>Name: {props.order.firstName + " " + props.order.lastName}</pre>
                <pre>Email: {props.order.email}</pre>
                <pre>Date: {props.order.date}</pre>
                <pre>Location: {props.order.pickUp}</pre>
                <p>Contact for concerns, including cancellations or questions: </p>
            </>
        )
    }

    switch (state) {
        case (-1):
            return (
                <h1>something went tragically wrong</h1>
            )
        case (0):
            return (
                <>
                    {displayOrderInfo(props)}
                    <PaymentForm
                        applicationId="sandbox-sq0idb-DikudyJ1YX10FKud-En5QA"
                        createPaymentRequest={() => ({
                            countryCode: "CAN",
                            currencyCode: "CAD",
                            total: {
                                amount: "10",
                                label: "Total",
                            },
                        })}
                        cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                            setState(2) // set waiting
                            // call to payment api endpoint
                            axios.post(apiEnd, { data: token.token, orderId: props.order._id, orderTotal: 10 },
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
                        <GooglePay></GooglePay>
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
                </>
            )
        case (1):
            return (
                <>
                    <h1>payment has been recieved</h1>
                    <Link id="orderbtn" to="/"><button class="rounded">Return Home</button></Link>
                </>
            )
        case (2):
            return (
                <>
                    <h1>please wait</h1>
                </>
            )
        default:
            return (
                <h1>something went wrong</h1>
            )
    }
}