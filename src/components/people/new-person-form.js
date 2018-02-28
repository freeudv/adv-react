import React, { Component } from "react"

import { reduxForm, Field } from "redux-form"
import emailValidator from "email-validator"

import ErrorField from "../common/error-field"

class NewPersonForm extends Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h2>People add form</h2>
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={ErrorField}
            type="text"
            label="First Name"
          />
          <Field
            name="lastName"
            component={ErrorField}
            type="text"
            label="Last Name"
          />
          <Field
            name="email"
            component={ErrorField}
            type="email"
            label="Email"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const validate = ({ email, firstName, lastName }) => {
  const errors = {}

  if (!firstName) {
    errors.firstName = "First Name is required"
  } else if (firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less"
  }

  if (!lastName) {
    errors.lastName = "Last Name is required"
  } else if (lastName.length > 15) {
    errors.lastName = "Must be 15 characters or less"
  }

  if (!email) {
    errors.email = "Email is required"
  } else if (!emailValidator.validate(email)) {
    errors.email = "Invalid Email"
  }

  return errors
}

export default reduxForm({
  form: "person",
  validate
})(NewPersonForm)
