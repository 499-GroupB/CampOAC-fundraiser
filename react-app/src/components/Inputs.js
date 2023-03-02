// This file contains custom input components used in the forms
// Having these here makes it easier to reuse these components for things later on
// such as dashboard search etc. They are all under the same naming convention in the stylesheet

import { useField } from 'formik';

// Custom text input via Formik, used to show error
const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Custom radio input via Formik, used to show error
const MyRadio = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'radio' });
  return (
    <div>
      <label className="radio-input">
        <input type="radio" {...field} {...props} />
        {children}
      </label>
      
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
export { MyTextInput, MyRadio }