import "../css/Style.css";
import axios from 'axios';

export default function LocationView(props) {
    const { locations } = props;
    
    const apiEnd = "http://localhost:3000/location/modify"

    const modifyLocation = (locationData) => {
        axios.post(apiEnd, {data: locationData},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
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
                             <h3 className="location_stock">{location.stock}</h3>
                             <button type="submit" onClick={() => modifyLocation(location._id)} >
                                Update Location
                            </button>
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