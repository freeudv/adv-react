import React, { Component } from "react"
import EventList from "../events/virtualized-event-list"

export default class EventsPage extends Component {
  render() {
    return (
      <div>
        <h2>Events Page</h2>
        <EventList />
      </div>
    )
  }
}
