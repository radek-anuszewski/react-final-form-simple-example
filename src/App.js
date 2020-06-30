import React from 'react';
import { Form, Field } from 'react-final-form'

// Symulacja zapytania
const sendRequest = value => new Promise((resolve, reject) => {
  setTimeout(() => {
    const valid = value === 'test';
    resolve(valid)
  }, 5000)
})

const validateCaptcha = async value => {
  const valid = await sendRequest(value);
  return valid? undefined : 'Please provide valid captcha';
}

function App() {
  return (
    <Form
      onSubmit={data => alert(JSON.stringify(data))}
      validate={data => {
        const errors = {}
        if (!data.userName) {
          errors.userName = 'Please provide user name'
        }
        return errors
      }}
    >
      {
        ({
           handleSubmit
         }) => (
          <form onSubmit={handleSubmit}>
            <Field name="userName">
              {
                ({input, meta}) => (
                  <>
                    <input {...input} type="text" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </>
                )
              }
            </Field>
            <br />
            <Field name="lastName" validate={value => !value && 'Please provide last name'}>
              {
                ({input, meta}) => (
                  <>
                    <input {...input} type="text" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </>
                )
              }
            </Field>
            <br />
            <Field name="captcha" validate={validateCaptcha}>
              {
                ({input, meta}) => (
                  <>
                    <input {...input} type="text" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </>
                )
              }
            </Field>
            <br />
            <button type="submit">
              Submit
            </button>
          </form>
        )
      }
    </Form>
  );
}

export default App;
