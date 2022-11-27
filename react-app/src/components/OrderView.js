import "../css/Style.css";
import axios from 'axios';

export default function OrderView(props) {
    const { orders } = props;

    const apiEnd = "http://localhost:3000/order/delete"

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

    const displayOrders = (props) => {
        if (orders.length > 0) {
            return (
                orders.map((order, index) => {
                    return (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.pickUp}</td>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{order.numBags}</td>
                            <td>{order.payment}</td>
                            <td>
                                <button type="submit" onClick={() => deleteOrder(order._id)} >
                                    Delete order
                                </button>
                            </td>
                        </tr>
                    )
                })
            )
        } else {
            return (
                <h3>No orders</h3>
            )
        }
    }
    return (
        <table id="order-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Location</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Number ordered</th>
                    <th>Payment Type</th>
                    <th>Delete Order</th>
                </tr>
            </thead>
            <tbody>
                {displayOrders(props)}
            </tbody>
        </table>
    )
}