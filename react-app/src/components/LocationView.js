import "../css/Style.css";
import axios from 'axios';

export default function LocationView(props) {
    const { locations } = props;
    
    const apiEnd = "http://localhost:3000/order/delete"

    const modifyLocation = (locationData) => {
        axios.post(apiEnd, {data: locationData._id},
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
                locations.map((map, index) => {
                    return (
                        <div className="location" key={locations._id}>
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