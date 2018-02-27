import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"

import history from "../history"

import { App } from "components"

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
