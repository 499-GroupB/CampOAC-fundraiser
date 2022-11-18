// home page
// uses  router to link

import {Link} from 'react-router-dom';
import '../css/Style.css';

const Home = () => {
    return (
        <>
            <h1>welcome to the camp oac firewood fundraiser</h1>
            <br/>
            <p>Rotary Club of Kelowna Ogopogo
                <br/>We accomplish service projects in the local community and internationally through the fellowship and efforts of our club members.  More information is available here.
                <br/><br/>Camp OAC
                <br/>Camp OAC is a children's summer camp located just north of Kelowna on Okanagan lake.  More information is available here.</p>
            <br/>
            <Link to="/order"><button>Place Order</button></Link>
        </>
    );
  };
  
  export default Home;