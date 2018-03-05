import firebase from "firebase"
import { appName } from "../firebaseConfig"
import { Record, List, OrderedMap } from "immutable"
import { put, call, takeEvery, all } from "redux-saga/effects"
import { reset } from "redux-form"
import { createSelector } from "reselect"

import { fbDataEntities } from "../utils"

import { generateId } from "../utils"

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false
})

const PersonRecord = Record({
  uid: null,
  firstName: null,
  lastName: null,
  email: null
})

export const moduleName = "people"

export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${appName}/${moduleName}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_ERROR = `${appName}/${moduleName}/ADD_PERSON_ERROR`
export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_ERROR = `${appName}/${moduleName}/FETCH_ALL_ERROR`

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_REQUEST:
    case ADD_PERSON_REQUEST:
      return state.set("loading", true)

    case ADD_PERSON_SUCCESS:
      return state
        .set("loading", false)
        .setIn(["entities", payload.uid], new PersonRecord(payload))

    case FETCH_ALL_SUCCESS:
      return state
        .set("loading", false)
        .set("entities", fbDataEntities(payload, PersonRecord))

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

/*
** Selectors
*/
export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  state => state.entities
)
export const peopleListSelector = createSelector(entitiesSelector, entities =>
  entities.valueSeq().toArray()
)

/*
**Action creators
*/
export const addPerson = person => ({
  type: ADD_PERSON_REQUEST,
  payload: person
})

export const fetchAllPeople = () => ({
  type: FETCH_ALL_REQUEST
})

/*
**Sagas
*/
//export for tests
export const addPersonSaga = function*(action) {
  const peopleRef = firebase.database().ref("people")

  try {
    const ref = yield call([peopleRef, peopleRef.push], action.payload)
    console.log("ref ---", ref)

    yield put({
      type: ADD_PERSON_SUCCESS,
      payload: { ...action.payload, uid: ref.key }
    })

    yield put(reset("person"))
  } catch (error) {
    yield put({
      type: ADD_PERSON_ERROR,
      error
    })
  }
}

export const fetchAllSaga = function*() {
  const ref = firebase.database().ref("people")

  try {
    const data = yield call([ref, ref.once], "value")

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    })
  } catch (error) {
    yield put({
      type: FETCH_ALL_ERROR,
      error
    })
  }
}

//common saga for all actions
export const saga = function*() {
  yield all([
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    yield takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)
  ])
}
