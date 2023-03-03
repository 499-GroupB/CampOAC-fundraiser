// Global NPM requisites
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MyTextInput } from './Inputs';
import { Link } from 'react-router-dom';

// Login form
const LoginForm = (props) => {

  const { onSubmit } = props;

  return (
    <div class="order-form">
      <h1>admin login</h1>
      <Formik
        // Formik requires intial values to be set
        // This also shows how the values are keyed and will be used
        initialValues={{
          email: '',
          password: '',
        }}

        // Validation schema via https://www.npmjs.com/package/yup
        // Use this to define what will cause the Formik errors to generate
        // per input. Also puts hards limits on inputs
        validationSchema={Yup.object({
          email: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        })}

        // Form submission event.
        onSubmit={onSubmit}
      >
        <Form>
          <MyTextInput
            //USERNAME ENTRY
            label="Email: "
            name="email"
            type="text"
            placeholder="Email"
          />
          <br></br>
          <MyTextInput
            //PASSWORD ENTRY          
            label="Passsword: "
            name="password"
            type="password"
            placeholder="Password"
          />
          <br /><br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;