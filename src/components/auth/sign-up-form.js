import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import emailValidator from "email-validator"

import ErrorField from "./error-field"

class SingUpForm extends Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <Field name="email" component={ErrorField} type="email" />
          <Field name="password" component={ErrorField} type="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const validate = ({ email, password }) => {
  const errors = {}

  if (!email) {
    errors.email = "Email is required"
  } else if (!emailValidator.validate(email)) {
    errors.email = "Invalid Email"
  }

  if (!password) {
    errors.password = "Password is required"
  } else if (password.length < 6) {
    errors.password = "Password too short"
  }

  return errors
}

export default reduxForm({
  form: "auth",
  validate
})(SingUpForm)
