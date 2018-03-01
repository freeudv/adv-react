import firebase from "firebase"
import { appName } from "../firebaseConfig"
import { Record } from "immutable"
import { all, take, call, put, cps } from "redux-saga/effects"

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export const moduleMame = "auth"

export const SIGN_UP_REQUEST = `${appName}/${moduleMame}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleMame}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleMame}/SIGN_UP_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleMame}/SIGN_IN_SUCCESS`

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set("loading", true)
    case SIGN_IN_SUCCESS:
      return state
        .set("loading", false)
        .set("user", payload.user)
        .set("error", null)
    case SIGN_UP_ERROR:
      return state.set("loading", false).set("error", error)
    default:
      return state
  }
}

//action creator
// export const signUp = (email, password) => dispatch => {
//   dispatch({ type: SIGN_UP_REQUEST })

//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(user =>
//       dispatch({
//         type: SIGN_IN_SUCCESS,
//         payload: { user }
//       })
//     )
//     .catch(error =>
//       dispatch({
//         type: SIGN_UP_ERROR,
//         error
//       })
//     )
// }

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

export const signUpSaga = function*() {
  const auth = firebase.auth()

  //infitite generator for always reaction on action (like takeEvery)
  while (true) {
    const action = yield take(SIGN_UP_REQUEST)

    try {
      const user = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      )

      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error
      })
    }
  }
}

// firebase.auth().onAuthStateChanged(user => {
//   const store = require("../store").default

//   store.dispatch({
//     type: SIGN_IN_SUCCESS,
//     payload: { user }
//   })
// })

export const watchStatusChange = function*() {
  const auth = firebase.auth()

  try {
    const user = yield cps([auth, auth.onAuthStateChanged])
    //cps is a function, that works like node's callbacks - first argument is an error
    //so in our case there no error and user instead of error. So we can catch them.
  } catch (user) {
    console.log("---", 1)
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
}

//common saga for all actions
export const saga = function*() {
  yield all([signUpSaga()])
}
