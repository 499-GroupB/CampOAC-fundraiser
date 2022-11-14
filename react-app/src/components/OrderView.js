import "../css/Style.css";

export default function OrderView(props) {
    const { orders } = props;

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
                            <button onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Deleted Order: ");
                            }}>
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