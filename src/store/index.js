import { createStore, applyMiddleware } from "redux"
import { routerMiddleware } from "react-router-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import rootSaga from "../redux/saga"

import history from "../history"
import reducer from "../redux"

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(
  sagaMiddleware,
  logger,
  thunk,
  routerMiddleware(history)
)

const store = createStore(reducer, composeWithDevTools(enhancer))

window.store = store

sagaMiddleware.run(rootSaga)

export default store
