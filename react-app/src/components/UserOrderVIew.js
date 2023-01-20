import "../css/Style.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserOrderView(props) {
    const order = props;

    const apiEnd = "http://localhost:3000/order/delete"

    // allow user to delete order
    const deleteOrder = (orderId) => {
        axios.post(apiEnd, { data: orderId },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
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
        if (order = null) {
            return (
                <h2>No order found</h2>
            )
        } else {
            <h2>Order Found</h2>
        }
    }

    return (
        <>
        Order would be returned here.
        </>
    )
}