import { createStore, applyMiddleware } from "redux"
import { routerMiddleware } from "react-router-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import logger from "redux-logger"

import history from "../history"
import reducer from "../reducers"

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk, routerMiddleware(history)))
)

export default store
