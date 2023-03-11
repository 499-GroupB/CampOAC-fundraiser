// Admin page
// This page uses the orderview component to display a list of orders

import axios from "axios";
import { useEffect, useState } from "react";
import OrderView from "../components/OrderView";
import LocationView from "../components/LocationView";
import "../css/Style.css";
import LoginForm from '../components/LoginForm';
import AdminView from '../components/AdminView';

const Admin = () => {
    const [loginState, setLoginState] = useState('');
    const [orders, getOrders] = useState('');
    const [locations, getLocations] = useState('');
    const [admins, getAdmins] = useState('');
    const [adminUser, setAdminUser] = useState('');

    const [locationHide, setLocationHide] = useState(false);
    const [adminHide, setAdminHide] = useState(false);
    const [orderHide, setOrderHide] = useState(false);

    const orderApi = `${process.env.REACT_APP_BACKEND_URL}/order/list`;
    const locationsApi = `${process.env.REACT_APP_BACKEND_URL}/location/list`;
    const adminsApi = `${process.env.REACT_APP_BACKEND_URL}/admin/list`;
    const authApi = `${process.env.REACT_APP_BACKEND_URL}/login/auth`;

    useEffect(() => {

        // check if user is already logged in
        var isLoggedIn = sessionStorage.getItem("isLoggedIn");
        var adminUser = sessionStorage.getItem("adminUser");

        if(adminUser){
            setAdminUser(adminUser)
        }else{
            setAdminUser('');
        }

        console.log(adminUser);

        if (isLoggedIn == null) {
            isLoggedIn = "false";
            setLoginState(0);
            setAdminUser('');
        } else if (isLoggedIn == "true") {
            setLoginState(1);
            getAllOrders();
            getAllLocations();
            getAllAdmins();
            setAdminUser(adminUser);
        } else if (isLoggedIn == "false") {
            setLoginState(0);
            setAdminUser('');
        }
    
        console.log(isLoggedIn);
        console.log(adminUser);

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

    const getAllAdmins = () => {
        axios.get(adminsApi)
            .then(response => {
                const allAdmins = response.data;
                getAdmins(allAdmins);
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
                    if (response.data.status == 1) {
                        sessionStorage.setItem("isLoggedIn", "true");
                        getAllOrders();
                        getAllLocations();
                        getAllAdmins();
                    }else if(response.data.status == 2) {
                        sessionStorage.setItem("isLoggedin", "true")
                        getAllOrders();
                        getAllLocations();
                        getAllAdmins();
                    }
                    setLoginState(response.data.status);
                    setAdminUser(response.data.user);
                    sessionStorage.setItem("adminUser", response.data.user);
                })
                // Catching axios error
                // Currently outputs to browser console (not  good)
                .catch(function (error) {
                    console.log(error);
                });
            setSubmitting(false);
        }, 400);
    }

    const toggleLocations = () => { setLocationHide(!locationHide) }
    const toggleAdmins = () => { setAdminHide(!adminHide) }
    const toggleOrders = () => { setOrderHide(!orderHide) }

    const logout = () => {
        sessionStorage.setItem("isLoggedIn", "false");
        sessionStorage.setItem("adminUser", '')
        setLoginState(0);
        setAdminUser('');
    }

    switch (loginState) {
        // user logged in as SUPER USER
        case (1):
            return (
                <div className="admin-panel">
                    <h1>
                    Welcome, {adminUser.firstName + " " + adminUser.lastName}
                    </h1>
                    <button class="important" onClick={logout}>Log Out</button>
                    <br></br>
                    <div className="dashboard">
                        <span class="dashboard-items">
                        <h1>locations and stock</h1>
                        <button onClick={toggleLocations}>{locationHide ? "Hide Locations" : "Show Locations"}</button>
                        </span >
                        {locationHide ? <div className="location-wrapper"><LocationView locations={locations} admins={admins} canEdit={true} /></div> : null}
                        <span class="dashboard-items">
                        <h1>administrative users</h1>
                        <button onClick={toggleAdmins}>{adminHide ? "Hide Users" : "Show Users"}</button>
                        </span>
                        {adminHide ? <div className="admin-wrapper"><AdminView admins={admins} /></div> : null}
                        <span class="dashboard-items">
                        <h1>orders</h1>
                        <button onClick={toggleOrders}>{orderHide ? "Hide Orders" : "Show Orders"}</button>
                        </span>
                        {orderHide ? <div className="order-wrapper"><OrderView orders={orders} /></div> : null}
                    </div>
                    <br></br>
                </div>
            );
        // login failure
        case (-1):
            return (
                <>
                    <LoginForm onSubmit={loginSubmission} />
                    <h3>Login failed</h3>
                    <br></br>
                </>
            );
        // login as non super
        case (2):
            return (
                <div className="admin-panel">
                    <h1>
                    Welcome, {adminUser.firstName + " " + adminUser.lastName}
                    </h1>
                    <button class="important" onClick={logout}>Log Out</button>
                    <br></br>
                    <div className="dashboard">
                        <h1>locations and stock</h1>
                        <button onClick={toggleLocations}>{locationHide ? "Hide Locations" : "Show Locations"}</button>
                        {locationHide ? <div className="location-wrapper"><LocationView locations={locations} admins={admins} canEdit={false}/></div> : null}
                        <h1>orders</h1>
                        <button onClick={toggleOrders}>{orderHide ? "Hide Orders" : "Show Orders"}</button>
                        {orderHide ? <div className="order-wrapper"><OrderView orders={orders} /></div> : null}
                    </div>
                    <br></br>
                </div>
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