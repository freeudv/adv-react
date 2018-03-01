import React, { Component } from "react"
import { Route, NavLink } from "react-router-dom"
import { connect } from "react-redux"

import { signUp, signIn, moduleName } from "../../ducks/auth"

import SignInForm from "../auth/sign-in-form"
import SignUpForm from "../auth/sign-up-form"
import Loader from "../common/loader"

class AuthPage extends Component {
  handleSignIn = ({ email, password }) => {
    this.props.signIn(email, password)
  }
  handleSignUp = ({ email, password }) => {
    this.props.signUp(email, password)
  }

  render() {
    const { loading } = this.props
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
        {loading && <Loader />}
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: state[moduleName].loading
  }),
  { signUp, signIn }
)(AuthPage)
