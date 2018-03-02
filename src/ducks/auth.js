import firebase from "firebase"
import { appName } from "../firebaseConfig"
import { Record } from "immutable"
import { push } from "react-router-redux"
import { all, take, call, put, takeEvery, cps } from "redux-saga/effects"

export const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export const moduleName = "auth"

export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`

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
    case SIGN_OUT_SUCCESS:
      return new ReducerRecord()
    default:
      return state
  }
}

/*
**Action creators
*/
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

export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password }
})

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export const signOut = () => ({
  type: SIGN_OUT_REQUEST
})

/*
**Sagas
*/
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

export const signInSaga = function*() {
  const auth = firebase.auth()

  //infitite generator for always reaction on action (like takeEvery)
  while (true) {
    const action = yield take(SIGN_IN_REQUEST)

    try {
      const user = yield call(
        [auth, auth.signInWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      )

      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })
    }
  }
}

export const signOutSaga = function*() {
  const auth = firebase.auth()
  try {
    yield call([auth, auth.signOut])
    yield put({
      type: SIGN_OUT_SUCCESS
    })
    yield put(push("auth/signin"))
  } catch (error) {
    console.log(error)
  }
}

// firebase.auth().onAuthStateChanged(user => {
//   const store = require("../store").default

//   store.dispatch({
//     type: SIGN_IN_SUCCESS,
//     payload: { user }
//   })
// })

//this function don't work
export const watchStatusChange = function*() {
  const auth = firebase.auth()
  console.log("onAuthStateChanged")

  try {
    yield cps([auth, auth.onAuthStateChanged])
    //cps is a function, that works like node's callbacks - first argument is an error
    //so in our case there no error and user instead of error. So we can catch them.
  } catch (user) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
}

//common saga for all actions
export const saga = function*() {
  yield all([
    signUpSaga(),
    signInSaga(),
    watchStatusChange(),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga)
  ])
}
