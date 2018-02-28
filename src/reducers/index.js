import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

import authReducer, { moduleMame as authModule } from "../ducks/auth"
import peopleReducer, { moduleMame as peopleModule } from "../ducks/people"

import { reducer } from "./reducer"

const rootReducer = combineReducers({
  reducer,
  router: routerReducer,
  form: formReducer,
  [authModule]: authReducer,
  [peopleModule]: peopleReducer
})

export default rootReducer
