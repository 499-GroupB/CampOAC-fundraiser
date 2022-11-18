// Global NPM requisites
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MySelect, MyTextInput, MyRadio } from '../components/Inputs';

// Order form
const Order = () => {
  const apiEnd = 'http://localhost:3000/order/submit';
  return (
    <div className='order-form'>
      <h1>order</h1>
      <Formik
        // Formik requires intial values to be set
        // This is also how the variables appear in the api response
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          pickUp: '',
          numBags: '1',
          payment: '',
        }}
        
        // Validation schema via https://www.npmjs.com/package/yup
        // Use this to define what will cause the Formik errors to generate
        // per input. Also puts hards limits on inputs
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phone: Yup.number()
            .required('Required'),
          pickUp: Yup.string()
            .oneOf(
              ['north', 'south', 'east', 'west'],
              'Invalid Pickup location')
            .required('Required'),
          numBags: Yup.number()
            .max(5, "Maximum 5")
            .min(1, "Minimum 1")
            .required('Required'),
          payment: Yup.string()
            .oneOf(['square', 'invoice'], 'You must select a payment option')
            .required('Required'),
        })}

        // Form submission event.
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // Axios API Call to Order Submit endpoint
            // Backend handles response accordingly
            axios.post(apiEnd, JSON.stringify(values),
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Access-Control-Allow-Credentials": "true",
                }
              })
              .then(function (response) {
                console.log(response);
                this.props.history.push("/");
              })
              // Catching axios error
              // Currently outputs to browser console (not  good)
              .catch(function (error) {
                console.log(error);
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            //NAME ENTRY
            label="First Name: "
            name="firstName"
            type="text"
            placeholder="Jane"
            style={styles.input}
          />
          <br></br>
          <MyTextInput
            //NAME ENTRY          
            label="Last Name: "
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          <br></br>
          <MyTextInput
            //EMAIL ENTRY 
            label="Email Address: "
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <br></br>
          <MyTextInput
            //PHONE NUMBER ENTRY 
            label="Phone Number: "
            name="phone"
            type="text"
            placeholder="1231231234"
          />
          <br></br>
          <MySelect label="Pickup Location: " name="pickUp">
            <option value="">Select location</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </MySelect>

          <MyTextInput
            //BAG NUMBER SELECTION 
            label="Number of Bags: "
            name="numBags"
            type="number"
            placeholder="1"
          />
          <br></br>
          <MyRadio name="payment" value="square">
            Pay now with square
          </MyRadio>
          <MyRadio name="payment" value="invoice">
            Pay later with invoice
          </MyRadio>
          <br></br>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <br/>
    </div>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "red"
  },
});
export default Order;