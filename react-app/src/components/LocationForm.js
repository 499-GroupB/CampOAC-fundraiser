import "../css/Style.css";
import axios from 'axios';
import { Formik, Form } from 'formik';
import { useEffect, useState } from "react";

export default function LocationForm(props) {
    const [locations, getLocations] = useState('');
    const { onSubmit } = props;

    const locationsApi = 'http://localhost:3000/location/list';

    useEffect(() => {
        getAllLocations();
    }, [])

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
                                    name: location.name,
                                    stock: location.stock
                                }}

                                // Form submission event.
                                onSubmit={onSubmit}
                            >
                                <Form>
                                    <button type="submit">Select Location</button>
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