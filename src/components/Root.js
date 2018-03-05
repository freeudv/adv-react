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
      <ConnectedRouter history={history}>
        <DragDropContextProvider backend={HTML5Backend}>
          <App />
        </DragDropContextProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
