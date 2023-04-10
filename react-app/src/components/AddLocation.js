import { React } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MyTextInput } from './Inputs';

export default function addLocation() {

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/location/add`;
    const apiEnd2 = `${process.env.REACT_APP_BACKEND_URL}/admin/single`;

    const addLocation = (locationData) => {
        if (window.confirm("Are you sure you want to add this location?")) {
            axios.post(apiEnd2, { adminId: locationData.adminId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                        "Access-Control-Allow-Credentials": "true",
                    }
                })
                .then(function (response) {
                    locationData.admin = response.data
                    axios.post(apiEnd, { locationData },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                                "Access-Control-Allow-Credentials": "true",
                            }
                        })
                        .then((response) => {
                            window.location.reload(false);
                        })
                })
                // Catching axios error
                // Currently outputs to browser console (not  good)
                .catch(function (error) {
                    console.log(error);
                });
            return null;
        }
    }
    return (
        <>
            <div className="location">
                <h3 className="location_name">New Location</h3>
                <Formik
                    // Formik requires intial values to be set
                    // This is also how the variables appear in the api response
                    initialValues={{
                        name: '',
                        stock: '1',
                        contact: '',
                        address: '',
                        adminId: '63ed171ec90de8ee9d90ba6c',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Required'),
                        stock: Yup.number().min(0, 'You cannot have negative stock'),
                        contact: Yup.string()
                            .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number')
                            .required('Required'),
                    })}

                    // Form submission event.
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            addLocation(values);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <MyTextInput
                            //LOCATION NUMBER
                            label="Name: "
                            name="name"
                            type="text"
                            placeholder='Location Name'
                        />
                        <br></br>

                        <MyTextInput
                            //BAG NUMBER SELECTION 
                            label="Stock: "
                            name="stock"
                            type="number"
                            placeholder='1'
                        />
                        <br></br>

                        <MyTextInput
                            //CONTACT
                            label="Contact info: "
                            name="contact"
                            type="text"
                            placeholder="123-456-7890"
                        />
                        <br></br>

                        <MyTextInput
                            //ADDRESS
                            label="Address: "
                            name="address"
                            type="text"
                            placeholder="123 Leon Ave V1XXXX"
                        />
                        <br></br>

                        <br></br>

                        <button type="submit">Add Location</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}