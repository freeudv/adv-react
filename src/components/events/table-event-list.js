import React, { Component } from "react"
import { connect } from "react-redux"
import {
  loadingSelector,
  eventListSelector,
  fetchAll,
  selectEvent
} from "../../ducks/events"

import Loader from "../common/loader"

//export for tests
export class EventList extends Component {
  componentDidMount() {
    this.props.fetchAll()
  }

  handleRowClick = uid => {
    const { selectEvent } = this.props

    selectEvent && selectEvent(uid)
  }

  getRows = () => {
    return this.props.events.map(event => (
      <tr
        key={event.uid}
        onClick={() => this.handleRowClick(event.uid)}
        className="test--event-list__row"
      >
        <td>{event.title}</td>
        <td>{event.where}</td>
        <td>{event.month}</td>
      </tr>
    ))
  }

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
  { fetchAll, selectEvent }
)(EventList)
