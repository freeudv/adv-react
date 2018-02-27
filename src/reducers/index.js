import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import { reducer } from "./reducer"

const rootReducer = combineReducers({
  reducer,
  router: routerReducer
})

export default rootReducer
