import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

import { reducer } from "./reducer"

const rootReducer = combineReducers({
  reducer,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
