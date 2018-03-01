import { addPersonSaga, ADD_PERSON, ADD_PERSON_REQUEST } from "./people"
import { call, put } from "redux-saga/effects"
import { generateId } from "../utils"

describe("add Person Saga", () => {
  it("should dispatch person action with id", () => {
    const person = {
      firstName: "John",
      lastName: "Smith",
      email: "test@test.com"
    }

    const saga = addPersonSaga({
      type: ADD_PERSON_REQUEST,
      payload: person
    })

    expect(saga.next().value).toEqual(call(generateId))

    const id = generateId()

    expect(saga.next(id).value).toEqual(
      put({
        type: ADD_PERSON,
        payload: {
          ...person,
          id
        }
      })
    )
  })
})
