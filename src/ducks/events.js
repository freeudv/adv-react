import firebase from "firebase"
import { appName } from "../firebaseConfig"
import { Record, OrderedMap } from "immutable"
import { all, take, put, call } from "redux-saga/effects"

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false
})

export const moduleName = "events"

export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_REQUEST:
      return state.set("loading", true)

    case FETCH_ALL_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("entities", new OrderedMap(payload))

    default:
      return state
  }
}

/*
**Action creators
*/
export const fetchAll = () => ({
  type: FETCH_ALL_REQUEST
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

export const saga = function*() {
  yield all([fetchAllSaga()])
}
