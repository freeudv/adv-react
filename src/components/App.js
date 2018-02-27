import React, { Component } from "react"
import { Route } from "react-router-dom"
//import PropTypes from 'prop-types'

import AdminPage from "./routes/admin-page"
import AuthPage from "./routes/auth-page"

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
        <Route path="/admin" component={AdminPage} />
        <Route path="/auth" component={AuthPage} />
      </div>
    )
  }
}

export default App
