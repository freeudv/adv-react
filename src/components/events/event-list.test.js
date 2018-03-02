import React from "react"
import Enzyme, { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import { EventsList } from "./events-list"
import Loader from "../common/loader.js"
import events from "../../mocks/conferences"
import { EventRecord } from "../../ducks/events"

Enzyme.configure({ adapter: new Adapter() })

const testEvents = events.map(
  event =>
    new EventRecord({
      ...event,
      uid: Math.random().toString()
    })
)

describe("<EventsList /> Component", () => {
  it("should render loader", () => {
    const container = shallow(<EventsList loading fetchAll={() => {}} />)

    expect(container.contains(<Loader />))
    //or
    //expect(container.find(Loader).length).toBe(1)
  })

  it("should render events list", () => {
    const container = shallow(
      <EventsList events={testEvents} fetchAll={jest.fn()} />
    )

    expect(container.find(".test--event-list__row").length).toBe(
      testEvents.length
    )
  })

  it("should request fetch data", done => {
    mount(<EventsList events={[]} fetchAll={done} />)
  })

  it("should select event", () => {
    let seleted = null
    const selectEvent = uid => (seleted = uid)

    const container = mount(
      <EventsList
        events={testEvents}
        fetchAll={() => {}}
        selectEvent={selectEvent}
      />
    )

    container
      .find(".test--event-list__row")
      .first()
      .simulate("click")

    //console.log(selectEvent(testEvents[0].uid))
    expect(seleted).toEqual(testEvents[0].uid)
  })
})
