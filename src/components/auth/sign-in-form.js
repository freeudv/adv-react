import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"

class SingInForm extends Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <Field name="email" component="input" type="email" label="Email" />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              label="Password"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: "auth"
})(SingInForm)
