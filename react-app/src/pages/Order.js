// Global NPM requisites
import { React, useState } from 'react';
import axios from 'axios';
import OrderForm from '../components/OrderForm';
import LocationForm from '../components/LocationForm';
import StepMeter from '../components/StepMeter';

// Order form
const Order = (props) => {

  // Order step
  // Step 1: Set location, Step 2: Fill out order form, Step 3: payment processing
  const [step, setStep] = useState(1);
  // Location state
  const [location, setLocation] = useState("");
  // OrderId state
  const [id, setId] = useState("");

  // function for handling location submission
  const locationSelect = (values, { setSubmitting }) => {
    setTimeout(() => {
      // Location is set as an array of the entire location object {_id, name, stock}
      setLocation(values)
      setStep(2)
      setSubmitting(false);
    }, 400);
  }

  // function for handling order submission
  const orderSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // Axios API Call to Order Submit endpoint
      // Backend handles response accordingly
      axios.post('http://localhost:3000/order/submit', JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          }
        })
        .then(function (response) {
          setId(response.data);
          setStep(3);
        })
        // Catching axios error
        // Currently outputs to browser console (not  good)
        .catch(function (error) {
          console.log(error);
        });
      setSubmitting(false);
    }, 400);
  }

  switch (step) {
    case (1):
      return (
        <>
        <StepMeter step={step}/>
        <LocationForm onSubmit={locationSelect}/>
        </>
      );
    case (2):
      return (
        <>
        <StepMeter step={step}/>
        <OrderForm location={location} onSubmit={orderSubmit}/>
        </>
      );
    case (3):
      return (
        <>
        <StepMeter step={step}/>
        <h1>Thank you for placing your order!</h1>
        <h3>Your order number is {id}</h3>
        </>
      );
    default:
      return (
        <>Something went wrong :c</>
      );
  }
};

export default Order;