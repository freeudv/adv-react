import React, { Component } from "react"
import PeopleList from "../people/people-list"

export default class AdminPage extends Component {
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <PeopleList />
      </div>
    )
  }
}
