import "../css/Style.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserOrderView(props) {
    const order = props;

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/order/delete`

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
            return (
                <>
                <pre></pre>
                <h2>No order found</h2>
                </>
            )
        } else {
            return (
                <>
                <h2>Order Found</h2>
                <pre>ID: {props.order._id}</pre>
                <pre>Name: {props.order.firstName  + " " + props.order.lastName}</pre>
                <pre>Email: {props.order.email}</pre>
                <pre>Location: {props.order.pickUp}</pre>
                <pre>Date: {props.order.date}</pre>
                <p>Contact for concerns, including cancellations or questions: </p>
                <br></br>
                </>
            )
        }
    }

    return (
        <div id="singleOrderWrapper">
            {displayOrder(props)}
        </div>
    )
}