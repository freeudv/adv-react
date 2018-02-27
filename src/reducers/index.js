import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

import authReducer, { moduleMame as authModule } from "../ducks/auth"

import { reducer } from "./reducer"

const rootReducer = combineReducers({
  reducer,
  router: routerReducer,
  form: formReducer,
  [authModule]: authReducer
})

export default rootReducer
