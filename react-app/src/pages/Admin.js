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

    const orderApi = `${process.env.REACT_APP_BACKEND_URL}/order/list`;
    const locationsApi = `${process.env.REACT_APP_BACKEND_URL}/location/list`;
    const authApi = `${process.env.REACT_APP_BACKEND_URL}/login/auth`;

    useEffect(() => {

        // check if user is already logged in
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if(isLoggedIn == null){
            isLoggedIn = "false";
            setLoginState(0);
        }else if(isLoggedIn == "true"){
            setLoginState(1);
            getAllOrders();
            getAllLocations();
        }else if(isLoggedIn == "false"){
            setLoginState(0);
        }

        console.log(isLoggedIn);

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
                        "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                        "Access-Control-Allow-Credentials": "true",
                    }
                })
                .then(function (response) {
                    if(response.data.status == 1){
                        sessionStorage.setItem("isLoggedIn", "true");
                        getAllOrders();
                        getAllLocations();
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

    const logout = () => {
        sessionStorage.setItem("isLoggedIn", "false");
        setLoginState(0);
    }

    switch (loginState) {
        // user logged in
        case (1):
            return (
                <>
                    <h1>admin</h1>
                    <button onClick={logout}>Log Out</button>
                    <br></br>
                    <div className="dashboard">
                        <h1>locations and stock:</h1>
                        <div className="location-wrapper">
                            <LocationView locations={locations} />
                        </div>
                        <h1>orders:</h1>
                        <div className="order-wrapper">
                            <OrderView orders={orders} />
                        </div>
                    </div>
                    <br></br>
                </>
            );
        // login failure
        case (-1):
            return (
                <>
                    <LoginForm onSubmit={loginSubmission} />
                    <h3>Login failed</h3>
                </>
            );
        // not logged in
        case (0):
            return (
                <>
                    <LoginForm onSubmit={loginSubmission} />
                </>
            );
        default:
            return (
                <LoginForm onSubmit={loginSubmission} />
            );
    }
};

export default Admin;