import "../css/Style.css";
import axios from 'axios';
import * as Yup from 'yup';
import { MyTextInput } from "./Inputs";
import { Formik, Form, Field } from 'formik';

export default function LocationView(props) {
    const { locations } = props;
    const { admins } = props;
    const { canEdit } = props;

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/location/modify`
    const apiEnd3 = `${process.env.REACT_APP_BACKEND_URL}/location/delete`
    const apiEnd4 = `${process.env.REACT_APP_BACKEND_URL}/admin/single`

    const modifyLocation = (locationData) => {
        axios.post(apiEnd4, { adminId: locationData.adminId },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                    "Access-Control-Allow-Credentials": "true",
                }
            })
            .then(function (response) {
                axios.post(apiEnd, { data: locationData, admin: response.data},
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

    const deleteLocation = (locationId) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            axios.post(apiEnd3, { data: locationId },
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
        }
        window.location.reload(false);
    }

    const generateAdminOptions = (props, i) => {
        if (admins.length > 0) {
            return (
                admins.map((admin, index) => {
                    if(admin.firstName != props.locations[i].admin.firstName)
                    return (
                        <option key={admin._id} label={admin.firstName + " " + admin.lastName} value={admin._id}></option>
                    )
                }))
        } else {
            return (
                <option value="" label="Unable to retrieve admins"></option>
            )
        }
    }

    const displayLocations = (props) => {
        if (locations.length > 0) {
            return (
                locations.map((location, index) => {
                    return (
                        <>
                            <div className="location" key={location._id}>
                                <h3 className="location_name">{location.name}</h3>
                                <h3 className="location_stock">Current Stock: {location.stock}</h3>
                                {location.stock < 10 ? <p style={{ color: "red" }}>Warning: Low stock</p> : null}
                                <h3 className="location_admin">Current Admin: {location.admin.firstName + " " + location.admin.lastName}</h3>
                                <Formik
                                    // Formik requires intial values to be set
                                    // This is also how the variables appear in the api response
                                    initialValues={{
                                        id: location._id,
                                        stock: location.stock,
                                        contact: location.contact,
                                        adminId: location.adminId,
                                        address: location.address,
                                        admin: {},
                                    }}
                                    validationSchema={Yup.object({
                                        stock: Yup.number().min(0, 'You cannot have negative stock').max(10000, 'Too much stock!'),
                                        contact: Yup.string()
                                            .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number')
                                            .required('Required'),
                                        adminId: Yup.string().required('Locations need an admin'),
                                    })}

                                    // Form submission event.
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            modifyLocation(values);
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    <Form id={location._id}>
                                        <MyTextInput
                                            //BAG NUMBER SELECTION 
                                            label="Stock: "
                                            name="stock"
                                            type="number"
                                            placeholder={location.stock}
                                        />
                                        <br></br>
                                        <MyTextInput
                                            //CONTACT
                                            label="Contact info: "
                                            name="contact"
                                            type="text"
                                            placeholder={location.contact}
                                            //readonly="readonly"
                                        />
                                        <br></br>
                                        <MyTextInput
                                            //ADDRESS
                                            label="Address "
                                            name="address"
                                            type="text"
                                            placeholder={location.address}
                                        />
                                        <br></br>
                                        {canEdit ? <><label>Admin:</label>
                                        <Field as="select" name="adminId" className="select-input" id={location._id}>
                                            <option value={location.adminId} label={location.admin.firstName + " " + location.admin.lastName}></option>
                                            {generateAdminOptions(props, index)}
                                        </Field></> : null}
                                        <br></br>
                                        <button type="submit">Update Location</button>
                                        {canEdit ? <button className="important" type="button" onClick={() => deleteLocation(location._id)} >Delete Location</button> : null}
                                    </Form>
                                </Formik>
                            </div>


                        </>
                    )
                })
            )
        } else {
            return (
                <h3>Unable to retrieve locations</h3>
            )
        }
    }

    return (
        <>
            {displayLocations(props)}
        </>
    )

}