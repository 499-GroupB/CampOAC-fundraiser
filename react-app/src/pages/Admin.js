// Admin page
// This page uses the orderview component to display a list of orders

import axios from "axios";
import { useEffect, useState } from "react";
import OrderView from "../components/OrderView";
import LocationView from "../components/LocationView";
import "../css/Style.css";
import LoginForm from '../components/LoginForm';

const Admin = () => {
    const [loginState, setLoginState] = useState('');
    const [orders, getOrders] = useState('');
    const [locations, getLocations] = useState('');

    const orderApi = 'http://localhost:3000/order/list';
    const locationsApi = 'http://localhost:3000/location/list';
    const authApi = 'http://localhost:3000/login/auth';

    useEffect(() => {
        getAllOrders();
        getAllLocations();

        // check if user is already logged in
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if(isLoggedIn == null){
            isLoggedIn = "false";
        }else if(isLoggedIn == "true"){
            setLoginState(1);
        }

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

    const loginSubmission = (values, { setSubmitting }) => {
        setTimeout(() => {
            // Axios API Call to Login auth endpoint
            // Backend handles response accordingly
            axios.post(authApi, JSON.stringify(values),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Access-Control-Allow-Credentials": "true",
                    }
                })
                .then(function (response) {
                    if(response.data.status == 1){
                        sessionStorage.setItem("isLoggedIn", "true");
                    }
                    setLoginState(response.data.status);
                })
                // Catching axios error
                // Currently outputs to browser console (not  good)
                .catch(function (error) {
                    console.log(error);
                });
            setSubmitting(false);
        }, 400);
    }


    switch (loginState) {
        case (1):
            return (
                <>
                    <h1>admin</h1>
                    <br></br>
                    <div className="dashboard">
                        <h1>Locations and stock:</h1>
                        <div className="location-wrapper">
                            <LocationView locations={locations} />
                        </div>
                        <h1>Orders:</h1>
                        <div className="order-wrapper">
                            <OrderView orders={orders} />
                        </div>
                    </div>
                    <br></br>
                </>
            );
        case (0):
            return (
                <>
                    <LoginForm onSubmit={loginSubmission} />
                    <h3>Login failed</h3>
                </>
            );
        default:
            return (
                <LoginForm onSubmit={loginSubmission} />
            );
    }
};

export default Admin;