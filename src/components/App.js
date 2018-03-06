import React, { Component } from "react"
import { Route, Link } from "react-router-dom"
import { connect } from "react-redux"
//import PropTypes from 'prop-types'

import { moduleName, signOut } from "../ducks/auth"

import CustomDragLayer from "./custom-drug-layer"

import AdminPage from "./routes/admin-page"
import AuthPage from "./routes/auth-page"
import PeoplePage from "./routes/people-page"
import EventsPage from "./routes/events-page"
import ProtectedRoute from "./common/protected-route"

class App extends Component {
  // static propTypes = {
  //   //from connect
  //   articles: PropTypes.array.isRequired,
  //   //from accordion
  //   openItemId: PropTypes.string,
  // }

  render() {
    const { signedIn, signOut } = this.props

    const btn = signedIn ? (
      <button onClick={signOut}>Sign Out</button>
    ) : (
      <Link to="/auth/signin">Sign In</Link>
    )

    return (
      <div>
        {btn}
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        <ProtectedRoute path="/people" component={PeoplePage} />
        <ProtectedRoute path="/events" component={EventsPage} />
        <CustomDragLayer />
      </div>
    )
  }
}

export default connect(
  state => ({
    signedIn: !!state[moduleName].user
  }),
  { signOut },
  null,
  { pure: false }
)(App)
