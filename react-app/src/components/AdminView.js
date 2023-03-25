import "../css/Style.css";
import axios from 'axios';
import * as Yup from 'yup';
import { MyTextInput } from "./Inputs";
import { Formik, Form } from 'formik';
import { useEffect } from "react";

export default function AdminView(props) {
    const { admins } = props;

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/admin/modify`
    const apiEnd3 = `${process.env.REACT_APP_BACKEND_URL}/admin/delete`

    const modifyAdmin = (adminData) => {
        if (window.confirm("Are you sure you want to modify this administrator?")) {
            axios.post(apiEnd, { data: adminData },
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
                // Currently outputs to browser console (not  good)
                .catch(function (error) {
                    console.log(error);
                });
            window.location.reload(false);
        }
    }

    const deleteAdmin = (adminId) => {
        if (window.confirm("Are you sure you want to delete this administrator?")) {
            axios.post(apiEnd3, { data: adminId },
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
                // Currently outputs to browser console (not  good)
                .catch(function (error) {
                    console.log(error);
                });
            window.location.reload(false);
        }
    }

    const displayAdmins = (props) => {
        if (admins.length > 0) {
            return (
                admins.map((admin, index) => {
                    return (
                        <>
                            <div className="admin" key={admin._id}>
                                <h3 className="admin_name">{admin.firstName + " " + admin.lastName}</h3>
                                <h3 className="admin_super">Super user: {admin.isSuper.toString()}</h3>
                                <Formik
                                    // Formik requires intial values to be set
                                    // This is also how the variables appear in the api response
                                    initialValues={{
                                        id: admin._id,
                                        firstName: admin.firstName,
                                        lastName: admin.lastName,
                                        email: admin.email,
                                        passsword: admin.password,
                                        phone: admin.phone,
                                    }}
                                    validationSchema={Yup.object({
                                        firstName: Yup.string().required('Required'),
                                        lastName: Yup.string().required('Required'),
                                        email: Yup.string().required('Required'),
                                        password: Yup.string().required('Required'),
                                        phone: Yup.string()
                                            .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number')
                                            .required('Required'),
                                    })}

                                    // Form submission event.
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            modifyAdmin(values);
                                            setSubmitting(false);
                                            window.location.reload(false);
                                        }, 400);
                                    }}
                                >
                                    <Form>
                                        <MyTextInput
                                            //First Name
                                            label="First Name: "
                                            name="firstName"
                                            type="text"
                                            placeholder={admin.firstName}
                                        />
                                        <br></br>
                                        <MyTextInput
                                            //Last Name
                                            label="Last Name: "
                                            name="lastName"
                                            type="text"
                                            placeholder={admin.lastName}
                                        />
                                        <br></br>
                                        <MyTextInput
                                            //Email
                                            label="Email: "
                                            name="email"
                                            type="text"
                                            placeholder={admin.email}
                                        />
                                        <br></br>
                                        <MyTextInput
                                            //Email
                                            label="Password: "
                                            name="password"
                                            type="text"
                                            placeholder={admin.password}
                                        />
                                        <br></br>
                                        <MyTextInput
                                            //Phone number
                                            label="Phone Number: "
                                            name="phone"
                                            type="text"
                                            placeholder={admin.phone}
                                        />
                                        <br></br>
                                        <button type="submit">Update Admin</button>
                                        <button className="important" type="button" onClick={() => deleteAdmin(admin._id)} >
                                            Delete Admin
                                        </button>
                                    </Form>
                                </Formik>
                            </div>


                        </>
                    )
                })
            )
        } else {
            return (
                <h3>Unable to retrieve adminstrators</h3>
            )
        }
    }
    return (
        <>
            {displayAdmins(props)}
        </>
    )
}