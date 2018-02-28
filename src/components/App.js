import React, { Component } from "react"
import { Route } from "react-router-dom"

//import PropTypes from 'prop-types'

import AdminPage from "./routes/admin-page"
import AuthPage from "./routes/auth-page"
import PeoplePage from "./routes/people-page"
import ProtectedRoute from "./common/protected-route"

class App extends Component {
  // static propTypes = {
  //   //from connect
  //   articles: PropTypes.array.isRequired,
  //   //from accordion
  //   openItemId: PropTypes.string,
  // }

  render() {
    return (
      <div>
        <ProtectedRoute path="/admin" component={AdminPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/people" component={PeoplePage} />
      </div>
    )
  }
}

export default App
