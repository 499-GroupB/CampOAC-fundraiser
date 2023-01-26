import "../css/Style.css";
import axios from 'axios';
import * as Yup from 'yup';
import { MyTextInput } from "./Inputs";
import { Formik, Form } from 'formik';

export default function LocationView(props) {
    const { locations } = props;

    const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/location/modify`

    const modifyLocation = (locationData) => {
        axios.post(apiEnd, { data: locationData },
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

    const displayLocations = (props) => {
        if (locations.length > 0) {
            return (
                locations.map((location, index) => {
                    return (
                        <div className="location" key={location._id}>
                            <h3 className="location_name">{location.name}</h3>
                            <h3 className="location_stock">Current Stock: {location.stock}</h3>
                            <Formik
                                // Formik requires intial values to be set
                                // This is also how the variables appear in the api response
                                initialValues={{
                                    id: location._id,
                                    stock: location.stock
                                }}
                                validationSchema={Yup.object({
                                    stock: Yup.number().min(0, 'Too few wood').max(10000, 'Too many wood'),
                                })}
                            
                                // Form submission event.
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        modifyLocation(values);
                                        setSubmitting(false);
                                        window.location.reload(false);
                                    }, 400);
                                }}
                            >
                                <Form>
                                    <MyTextInput
                                        //BAG NUMBER SELECTION 
                                        label="Stock: "
                                        name="stock"
                                        type="number"
                                        placeholder={location.stock}
                                    />
                                    <br></br>
                                    <br></br>
                                    <button type="submit">Update Inventory</button>
                                </Form>
                            </Formik>
                        </div>
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