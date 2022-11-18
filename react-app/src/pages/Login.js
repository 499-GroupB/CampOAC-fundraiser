// Global NPM requisites
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MyTextInput } from '../components/Inputs';

// Login form
const Login = () => {
  const apiEnd = 'http://localhost:3000/order/submit';

  return (
    <div class="order-form">
      <h1>admin login</h1>
      <Formik
        // Formik requires intial values to be set
        // This also shows how the values are keyed and will be used
        initialValues={{
          username: '',
          password: '',
        }}
        
        // Validation schema via https://www.npmjs.com/package/yup
        // Use this to define what will cause the Formik errors to generate
        // per input. Also puts hards limits on inputs
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        })}

        // Form submission event.
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // Axios API Call to Login auth endpoint
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
            //USERNAME ENTRY
            label="Username: "
            name="username"
            type="text"
            placeholder="Username"
          />
          <br></br>
          <MyTextInput
            //PASSWORD ENTRY          
            label="Passsword: "
            name="password"
            type="password"
            placeholder="Password"
          />
          <br/><br/>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;