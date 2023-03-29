import { React } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MyTextInput } from './Inputs';

export default function addAdmin() {

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/admin/add`;

    const addAdmin = (adminData) => {
        if (window.confirm("Are you sure you want to add this administrator?")) {
            axios.post(apiEnd, { adminData },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                        "Access-Control-Allow-Credentials": "true",
                    }
                })
                .then(function (response) {
                    console.log(response);
                })
                // Catching axios error
                // Currently outputs to browser console (not good)
                .catch(function (error) {
                    console.log(error)
                });
            window.location.reload(false);
        }
    }

    return (
        <div className="admin">
            <h3 className="admin_name">New Admin</h3>
            <Formik
                // Formik requires intial values to be set
                // This is also how the variables appear in the api response
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    locationId: 'NO ASSIGNED LOCATION',
                    password: '',
                    isSuper: false,

                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    phone: Yup.string()
                        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number')
                        .required('Required'),
                    password: Yup.string().required('Required'),
                })}

                // Form submission event.
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        addAdmin(values);
                        setSubmitting(false);
                        window.location.reload(false);
                    }, 400);
                }}
            >
                <Form>
                    <MyTextInput
                        //LOCATION NUMBER
                        label="First Name: "
                        name="firstName"
                        type="text"
                        placeholder='First Name'
                    />
                    <br></br>
                    <MyTextInput
                        //BAG NUMBER SELECTION 
                        label="Last Name: "
                        name="lastName"
                        type="text"
                        placeholder='Last Name'
                    />
                    <br></br>
                    <MyTextInput
                        //CONTACT
                        label="Email: "
                        name="email"
                        type="text"
                        placeholder="email@address.com"
                    />
                    <br></br>
                    <MyTextInput
                        //CONTACT
                        label="Phone Number: "
                        name="phone"
                        type="text"
                        placeholder="1234567890"
                    />
                    <br></br>
                    <MyTextInput
                        //Password
                        label="Password: "
                        name="password"
                        type="text"
                        placeholder="Password"
                    />
                    <br></br>
                    <br></br>
                    <button type="submit">Add User</button>
                </Form>
            </Formik>
        </div>
    );
};
