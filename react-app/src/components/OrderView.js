import "../css/Style.css";
import axios from 'axios';

export default function OrderView(props) {
    const { orders } = props;
    
    const apiEnd = "http://localhost:3000/order/delete"

    const deleteOrder = (orderId) => {
        axios.post(apiEnd, {data: orderId},
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
                        <div className="order" key={order._id}>
                            <h3 className="order_name">{order.firstName} {order.lastName} | Ordered: {order.numBags}</h3>
                            <p className="order_email">Email: {order.email}</p>
                            <p className="order_phone">Phone: {order.phone}</p>
                            <p className="order_pickUp">Location: {order.pickUp}</p>
                            <button type="submit" onClick={() => deleteOrder(order._id)} >
                                Delete order
                            </button>
                            <br></br>
                            <br></br>
                        </div>
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
        <>
            {displayOrders(props)}
        </>
    )
}