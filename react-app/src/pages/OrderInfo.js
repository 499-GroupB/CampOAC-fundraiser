// OrderInfo for single user order view
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../components/Inputs';
import { useState } from "react";
import UserOrderView from '../components/UserOrderVIew';
import axios from 'axios';

const OrderInfo = () => {

  const [order, setOrder] = useState({});
  const [message, setMessage] = useState('');

  const apiEnd = `${process.env.REACT_APP_BACKEND_URL}/order/single`;

  const findOrder = (orderId) => {
    axios.post(apiEnd, orderId,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
          "Access-Control-Allow-Credentials": "true",
        }
      })
      .then(function (response) {
        const retrievedOrder = response.data.order;
        const retrievedMessage = response.data.msg;
        setOrder(retrievedOrder);
        setMessage(retrievedMessage);
      })

      // Catching axios error
      // Currently outputs to browser console (not  good)
      .catch(function (error) {
        console.log(error);
      });

    //window.location.reload(false);
  }

  return (
    <div className='order-form'>
      <h1>track an order you have placed</h1>
      <p>Here you can view information on an order you've placed and cancel it (if necessary).</p>
      <Formik
        // Formik requires intial values to be set
        // This is also how the variables appear in the api response
        initialValues={{
          email: '',
          orderId: ''
        }}

        // Validation schema via https://www.npmjs.com/package/yup
        // Use this to define what will cause the Formik errors to generate
        // per input. Also puts hards limits on inputs
        validationSchema={Yup.object({
          email: Yup.string()
          .email('Invalid email address')
          .max(50, 'Must be 50 characters or less')
          .required('Required'),
          orderId: Yup.string()
            .max(25, 'Must be a valid OrderID')
            .required('Required'),
        })}

        // Form submission event.
        // it is asinine that this works :o
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
              findOrder(values);
              setSubmitting(false);
          }, 400);
      }}
      >
        <Form>
        <MyTextInput
            //NAME ENTRY
            label="Email: "
            name="email"
            type="text"
            placeholder="Email adress"
          />
          <br></br>
          <MyTextInput
            //NAME ENTRY
            label="Order ID: "
            name="orderId"
            type="text"
            placeholder="24 Character Order ID"
          />
          <br></br>
          <button type="submit">Submit</button>
          
        </Form>
      </Formik>
      <br />
      <UserOrderView order={order} message={message} />
    </div>
  );
};

export default OrderInfo;