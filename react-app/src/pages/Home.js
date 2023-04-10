// home page
// uses  router to link

import { Link } from 'react-router-dom';
import '../css/Style.css';
import Images from '../components/Images';

const Home = () => {
  return (
    <>
      <Images/>
      <h2 class='bearhug'>welcome to the camp oac <b>&times;</b> rotary club ogopogo firewood fundraiser</h2><br></br>
      <Link id="orderbtn" to="/order"><button class="rounded">Place Order</button></Link><br></br>
      <h2>High quality locally sourced firewood</h2>
      <h2>at LOW LOW prices</h2><br></br>
      <p>All profits go towards supporting local and international charities</p><br></br>
    </>
  );
};

export default Home;