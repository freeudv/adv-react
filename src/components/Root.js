import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"
import { DragDropContextProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

import history from "../history"

import { App } from "components"

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <DragDropContextProvider backend={HTML5Backend}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </DragDropContextProvider>
    </Provider>
  )
}

export default Root
