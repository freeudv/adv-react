import { all } from "redux-saga/effects"

import { saga as peopleSaga } from "../ducks/people"
import { saga as authSaga } from "../ducks/auth"
import { saga as eventsSaga } from "../ducks/events"

// all from "redux-saga/effects" works like Promise.all - wait for all of them to complete. (Parallel effects)
export default function* rootSaga() {
  yield all([authSaga(), peopleSaga(), eventsSaga()])
}
