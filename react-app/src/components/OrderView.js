import "../css/Style.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';

// view payment button
// intended on opening invoices
/*
                            <td ><button type="submit" onClick={() => viewPayment(order._id)} >
                                {order.payment}
                            </button></td>
*/

export default function OrderView(props) {
    const { orders } = props;
    //const orderClone = orders.slice();
    const [orderState, setOrderState] = useState(orders);

    // variable to control what orders get displayed [0-all 1-unfulfilled 2-fulfilled]
    const [orderViewState, setOrderViewState] = useState(0);

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/order/delete`
    const apiEnd2 = `${process.env.REACT_APP_BACKEND_URL}/order/fulfill`

    useEffect(() => { 
        var search = document.getElementById("orderSearch");
        var table = document.getElementById("order-table");

        search.addEventListener("keyup", function() {
            // Declare variables
            var filter = search.value.toLowerCase();
            var rows = table.getElementsByTagName("tr");
          
            // Loop through all table rows, and hide those who don't match the search query
            for (var i = 0; i < rows.length; i++) {
              var id = rows[i].getElementsByTagName("td")[0];
              var pickUp = rows[i].getElementsByTagName("td")[1];
              var name = rows[i].getElementsByTagName("td")[2];
              var email = rows[i].getElementsByTagName("td")[3];
              var phone = rows[i].getElementsByTagName("td")[4];
              if (name || pickUp || email || phone) {
                if (name.innerHTML.toLowerCase().indexOf(filter) > -1 || 
                    pickUp.innerHTML.toLowerCase().indexOf(filter) > -1 || 
                    email.innerHTML.toLowerCase().indexOf(filter) > -1 || 
                    phone.innerHTML.toLowerCase().indexOf(filter) > -1 ||
                    id.innerHTML.toLowerCase().indexOf(filter) > -1){
                  rows[i].style.display = "";
                } else {
                  rows[i].style.display = "none";
                }
              }
            }
          });
    },[]);

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

    const fulfillOrder = (orderId, index) => {
        if (window.confirm("Are you sure you want to fulfill this order?")) {
            axios.post(apiEnd2, { data: orderId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                        "Access-Control-Allow-Credentials": "true",
                    }
                })
                .then(function (response) {
                    console.log(response);
                    props.orders[index].fulfilled = true; //wtf.js
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
                    var condition = order.fulfilled
                    if(orderViewState == 1){
                        condition = false;
                    }else if(orderViewState == 2){
                        condition = true;
                    }else{
                        condition = order.fulfilled
                    }
                    if(order.fulfilled == condition)
                    return (
                        <tr class={order.fulfilled ? "order-fulfilled" : "order-unfulfilled"}>
                            <td>{order._id}</td>
                            <td>{order.pickUp}</td>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{order.numBags}</td>
                            <td>{order.date}</td>
                            <td>Type: {order.payment}</td>
                            <td>{order.fulfilled ? "Paid" : "Unpaid"}</td>
                            <td>{order.fulfilled ? 
                                <button class="important" type="submit" onClick={() => deleteOrder(order._id, index)} >
                                    Delete
                                </button> :
                                <button class="important" type="submit" onClick={() => fulfillOrder(order._id, index)}>
                                    Complete
                                </button>
                            }    
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
            <input class="text-input" name="orderSearch" type="text" id="orderSearch" placeholder="Search for values"></input>
            <button type="submit" onClick={() => setOrderViewState(0)}>All</button>
            <button type="submit" onClick={() => setOrderViewState(1)}>Unpaid</button>
            <button type="submit" onClick={() => setOrderViewState(2)}>Paid</button>
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
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {displayOrders()}
                </tbody>
            </table>
        </>
    )
}