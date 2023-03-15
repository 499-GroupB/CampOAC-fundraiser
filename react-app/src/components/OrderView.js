import "../css/Style.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function OrderView(props) {
    const { orders } = props;
    //const orderClone = orders.slice();
    const [orderState, setOrderState] = useState(orders);

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/order/delete`

    const deleteOrder = (orderId, index) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
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
                    delete props.orders[index]; //wtf.js
                    var ordercopy = props.orders.slice();
                    setOrderState(ordercopy);
                })
                // Catching axios error
                // Currently outputs to browser console (not  good)
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const viewPayment = (orderId) => {
        console.log(orderId);
    }

    // Quick and simple export target #table_id into a csv
    const download_table_as_csv = (table_id, separator = ',') => {
        // Select rows from table_id
        var rows = document.querySelectorAll('table#' + table_id + ' tr');
        // Construct csv
        var csv = [];
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll('td, th');
            for (var j = 0; j < cols.length - 1; j++) {
                // Clean innertext to remove multiple spaces and jumpline (break csv)
                var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
                data = data.replace(/"/g, '""');
                // Push escaped string
                row.push('"' + data + '"');
            }
            csv.push(row.join(separator));
        }
        var csv_string = csv.join('\n');
        // Download it
        var filename = 'WOOD_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
        var link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const displayOrders = () => {
        if (orderState.length > 0) {
            return (
                orderState.map((order, index) => {
                    return (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.pickUp}</td>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{order.numBags}</td>
                            <td>{order.date}</td>
                            <td ><button type="submit" onClick={() => viewPayment(order._id)} >
                                {order.payment}
                            </button></td>
                            <td>
                                <button class="important" type="submit" onClick={() => deleteOrder(order._id, index)} >
                                    Close order
                                </button>
                            </td>
                        </tr>
                    )
                })
            )
        } else {
            return (
                <h2>No orders</h2>
            )
        }
    }
    return (
        <>
            <button type="submit" onClick={() => download_table_as_csv('order-table')}>Export as CSV</button>
            <table id="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Location</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Number ordered</th>
                        <th>Date Ordered</th>
                        <th>Payment Type</th>
                        <th>Delete Order</th>
                    </tr>
                </thead>
                <tbody>
                    {displayOrders()}
                </tbody>
            </table>
        </>
    )
}