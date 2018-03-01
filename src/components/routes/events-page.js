import React, { Component } from "react"
import EventsList from "../events/events-list"

export default class EventsPage extends Component {
  render() {
    return (
      <div>
        <h2>Events Page</h2>
        <EventsList />
      </div>
    )
  }
}
