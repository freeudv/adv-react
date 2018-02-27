import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class UnAuthorized extends Component {
  render() {
    return (
      <h1>
        Unauthorized, please <Link to="/auth/signin">Sign In</Link>
      </h1>
    )
  }
}
