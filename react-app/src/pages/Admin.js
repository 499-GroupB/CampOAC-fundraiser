// Admin page
// This page uses the orderview component to display a list of orders

import axios from "axios";
import { useEffect, useState } from "react";
import OrderView from "../components/OrderView";
import LocationView from "../components/LocationView";
import "../css/Style.css";

const Admin = () => {
    const [orders, getOrders, locations, getLocations] = useState('');
    const orderApi = 'http://localhost:3000/order/list';
    const locationsApi = 'http://localhost:3000/location/list';
    
    useEffect(() => {
        getAllOrders();
        getAllLocations();
    }, [])

    const getAllOrders = () => {
        axios.get(orderApi)
        .then(response => {
            const allOrders = response.data;
            getOrders(allOrders);
        })
        .catch(err => { 
            console.log(err);
        })
    }

    const getAllLocations = () => {
        axios.get(locationsApi)
        .then(response => {
            const allLocations = response.data;
            getLocations(allLocations);
        })
        .catch(err => { 
            console.log(err);
        })
    }


    return (
        <>
            <h1>admin</h1>
            <p>This would be the admin page :)</p>
            <br></br>
            <div className="order-wrapper">
                <OrderView orders={orders}/>
            </div>
            <br></br>
        </>
    );
};

export default Admin;