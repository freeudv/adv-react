import { appName } from "../firebaseConfig"
import { Record, List } from "immutable"
import { put, call, takeEvery } from "redux-saga/effects"
import { reset } from "redux-form"

import { generateId } from "../utils"

const ReducerState = Record({
  entities: new List([])
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export const moduleName = "people"

export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.update("entities", entities =>
        entities.push(new PersonRecord(payload))
      )

    default:
      return state
  }
}

// export const addPerson = person => dispatch => {
//   dispatch({
//     type: ADD_PERSON,
//     payload: {
//       person: { id: Date.now(), ...person }
//     }
//   })
// }

export const addPerson = person => ({
  type: ADD_PERSON_REQUEST,
  payload: person
})

//export for tests
export const addPersonSaga = function*(action) {
  const id = yield call(generateId)

  yield put({
    type: ADD_PERSON,
    payload: {
      ...action.payload,
      id
    }
  })

  yield put(reset("person"))
}

//common saga for all actions
export const saga = function*() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}
