import firebase from "firebase"
import { appName } from "../firebaseConfig"
import { Record, OrderedMap, OrderedSet } from "immutable"
import { all, take, put, call, select } from "redux-saga/effects"
import { createSelector } from "reselect"

import { fbDataEntities } from "../utils"

export const moduleName = "events"

export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`
export const FETCH_LAZY_REQUEST = `${appName}/${moduleName}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${appName}/${moduleName}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${appName}/${moduleName}/FETCH_LAZY_SUCCESS`
export const SELECT_EVENT = `${appName}/${moduleName}/SELECT_EVENT`

export const ReducerState = Record({
  entities: new OrderedMap({}),
  selected: new OrderedSet([]),
  loading: false,
  loaded: false
})

export const EventRecord = Record({
  uid: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_REQUEST:
    case FETCH_LAZY_START:
      return state.set("loading", true)

    case FETCH_ALL_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("entities", fbDataEntities(payload, EventRecord))

    case FETCH_LAZY_SUCCESS:
      return state
        .set("loading", false)
        .mergeIn(["entities"], fbDataEntities(payload, EventRecord))
        .set("loaded", Object.keys(payload).length < 10)

    case SELECT_EVENT:
      return state.selected.contains(payload.uid)
        ? state.update("selected", selected => selected.remove(payload.uid))
        : state.update("selected", selected => selected.add(payload.uid))

    default:
      return state
  }
}

/*
**Selectors
*/
export const stateSelector = state => state[moduleName]
export const eventsSelector = createSelector(
  stateSelector,
  state => state.entities
)
export const eventListSelector = createSelector(eventsSelector, entities =>
  entities.valueSeq().toArray()
)
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

/*
**Action creators
*/
export const fetchAll = () => ({
  type: FETCH_ALL_REQUEST
})

export const fetchLazy = () => ({
  type: FETCH_LAZY_REQUEST
})

export const selectEvent = uid => ({
  type: SELECT_EVENT,
  payload: { uid }
})

/*
**Sagas
*/
export const fetchAllSaga = function*() {
  while (true) {
    yield take(FETCH_ALL_REQUEST)

    const ref = firebase.database().ref("events")
    const data = yield call([ref, ref.once], "value")
    console.log("data.val()", data.val())

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    })
  }
}

export const fetchLazySaga = function*() {
  while (true) {
    yield take(FETCH_LAZY_REQUEST)

    const state = yield select(stateSelector)

    if (state.loading || state.loaded) continue
    //or
    //if (state.loaded) return

    yield put({
      type: FETCH_LAZY_START
    })

    const lastEvent = state.entities.last()

    const ref = firebase
      .database()
      .ref("events")
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.uid : "")

    const data = yield call([ref, ref.once], "value")

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: data.val()
    })
  }
}

export const saga = function*() {
  yield all([fetchAllSaga(), fetchLazySaga()])
}
