// home page
// uses  router to link

import { Link } from 'react-router-dom';
import '../css/Style.css';
import Images from '../components/Images';

const Home = () => {
  return (
    <>
      <Images/>
      <h1>welcome to the camp oac <b>&times;</b> rotary club ogopogo firewood fundraiser</h1>
      <Link id="orderbtn" to="/order"><button class="rounded">Place Order</button></Link>
      <p>Camp OAC is a childrens summer camp located just north of Kelowna on the beautiful Okanagan lake! Since 1950, Camp OAC has had thousands of campers attend their summer camps. In the offseason, the amazing property is available for rentals to host family reunions, get togethers, weddings and even school group rentals. Camp OAC is a place that everyone can enjoy.
        <br/><br/>The Rotary Club of Kelowna Ogopogo, chartered in 1993, is a group of 52 men and women, and is one of eight Rotary clubs in our area. In addition to providing support to our own community, our club has an active focus on programs involving youth. As well, both directly and through our involvement with Rotary International's Foundation, we assist with major international projects including disaster relief, fresh water development projects, and health programs such as PolioPlus.
        <br/><br/>On this website you can purchase firewood to support us!</p>
    </>
  );
};

export default Home;