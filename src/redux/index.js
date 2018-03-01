import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

import authReducer, { moduleName as authModule } from "../ducks/auth"
import peopleReducer, { moduleName as peopleModule } from "../ducks/people"

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  [authModule]: authReducer,
  [peopleModule]: peopleReducer
})

export default rootReducer