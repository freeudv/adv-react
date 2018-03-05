import React, { Component } from "react"
import PeopleList from "../people/people-list"
import EventTable from "../events/virtualized-event-list"
import SelectedEvents from "../events/selected-events"

export default class AdminPage extends Component {
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <PeopleList />
        <SelectedEvents />
        <EventTable />
      </div>
    )
  }
}
