import "../css/Style.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'

export default function UserOrderView(props) {
    const { order, message } = props;

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/order/delete`
    const locationsApi = `${process.env.REACT_APP_BACKEND_URL}/location/single`;

    useEffect(() => {
        // retrieve admin location based on order names

    }, [])

    // allow user to delete order
    const deleteOrder = (orderId) => {
        axios.post(apiEnd, { data: orderId },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                    "Access-Control-Allow-Credentials": "true",
                }
            })
            .then(function (response) {
                console.log(response);
            })
            // Catching axios error
            // Currently outputs to browser console (not  good)
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload(false);
    }

    const viewPayment = (orderId) => {
        console.log(orderId);
    }

    const displayOrder = (props) => {
        if (!props.order._id) {
            if (!props.message) {
                return (
                    <></>
                )
            }else{
                return (
                    <>
                        <pre></pre>
                        <h2>{props.message}</h2>
                    </>
                )
            }
        } else {
            if(!props.order.location){
                props.order.location = {}
            }
            return (
                <>
                    <h2>Order Found</h2>
                    <pre><i>ID: {props.order._id}</i></pre>
                    <pre>Name: {props.order.firstName + " " + props.order.lastName}</pre>
                    <pre>Email: {props.order.email}</pre>
                    <pre>Date: {props.order.date}</pre>
                    <pre>Number of bags: {props.order.numBags}</pre>
                    <br/>
                    <h2>Pickup information</h2>
                    <pre>Location: {props.order.location.name}</pre>
                    <pre>{props.order.location.address}</pre>
                    <pre>Site administrator: {props.order.location.admin.firstName} {props.order.location.admin.lastName}</pre>
                    <p>Contact for concerns, including cancellations or questions: <pre>{props.order.location.contact}</pre></p>
                </>
            )
        }
    }

    return (
        <div id="singleOrderWrapper">
            {displayOrder(props)}
            <br></br>
        </div>
    )
}