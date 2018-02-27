import firebase from "firebase"
import { appName } from "../firebaseConfig"
import { Record } from "immutable"

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export const moduleMame = "auth"

export const SIGN_UP_REQUEST = `${appName}/${moduleMame}/SIGN_UP_REQUEST`
export const SIGN_IN_SUCCESS = `${appName}/${moduleMame}/SIGN_IN_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleMame}/SIGN_UP_ERROR`

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
export const signUp = (email, password) => dispatch => {
  dispatch({ type: SIGN_UP_REQUEST })

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user =>
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    )
    .catch(error =>
      dispatch({
        type: SIGN_UP_ERROR,
        error
      })
    )
}

firebase.auth().onAuthStateChanged(user => {
  const store = require("../store").default

  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
})
