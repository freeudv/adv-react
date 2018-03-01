import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from "redux-form"

import authReducer, { moduleName as authModule } from "../ducks/auth"
import peopleReducer, { moduleName as peopleModule } from "../ducks/people"
import eventsReducer, { moduleName as eventsModule } from "../ducks/events"

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  [authModule]: authReducer,
  [peopleModule]: peopleReducer,
  [eventsModule]: eventsReducer
})

export default rootReducer
