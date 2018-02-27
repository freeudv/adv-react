import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"

import SignInForm from "../auth/sign-in-form"
import SignUpForm from "../auth/sign-up-form"

export default class AuthPage extends Component {
  handleSignIn = values => {
    console.log("handle sign in", values)
  }
  handleSignUp = values => {
    console.log("handle sign up", values)
  }

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <NavLink to="/auth/signin" activeStyle={{ color: "red" }}>
          Sign In
        </NavLink>
        <NavLink to="/auth/signup" activeStyle={{ color: "red" }}>
          Sign Up
        </NavLink>
        <Route
          path="/auth/signin"
          render={() => <SignInForm onSubmit={this.handleSignIn} />}
        />
        <Route
          path="/auth/signup"
          render={() => <SignUpForm onSubmit={this.handleSignUp} />}
        />
      </div>
    )
  }
}
