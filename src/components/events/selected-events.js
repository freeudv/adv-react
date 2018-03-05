import React, { Component } from "react"
import { connect } from "react-redux"
import { selectedEventsSelector } from "../../ducks/events"
import EventCard from "./event-card"

class SelectedEvents extends Component {
  render() {
    const { events } = this.props
    return (
      <div>
        {events.map(event => <EventCard key={event.uid} event={event} />)}
      </div>
    )
  }
}

export default connect(state => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
