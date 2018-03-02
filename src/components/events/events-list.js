import React, { Component } from "react"
import { connect } from "react-redux"
import {
  loadingSelector,
  eventListSelector,
  fetchAll
} from "../../ducks/events"

import Loader from "../common/loader"

class EventsList extends Component {
  componentDidMount() {
    this.props.fetchAll()
  }

  getRows = () =>
    this.props.events.map(event => (
      <tr key={event.uid}>
        <td>{event.title}</td>
        <td>{event.where}</td>
        <td>{event.month}</td>
      </tr>
    ))

  render() {
    if (this.props.loading) return <Loader />

    return (
      <div>
        {}
        <table>
          <tbody>{this.getRows()}</tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  state => ({
    events: eventListSelector(state),
    loading: loadingSelector(state)
  }),
  { fetchAll }
)(EventsList)
