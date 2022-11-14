// home page
// uses  router to link

import {Link} from 'react-router-dom';
import '../css/Style.css';

const Home = () => {
    return (
        <>
            <h1>Welcome to wood</h1>
            <br></br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            <br></br>
            <Link style={{display: 'inline-block'}} to="/order"><button>Place Order</button></Link>
        </>
    );
  };
  
  export default Home;