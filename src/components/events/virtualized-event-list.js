import React, { Component } from "react"
import { connect } from "react-redux"
import { Table, Column } from "react-virtualized"
import "react-virtualized/styles.css"

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

  handleRowClick = ({ rowData }) => {
    const { selectEvent } = this.props
    selectEvent && selectEvent(rowData.uid)
  }

  render() {
    const { loading, events } = this.props
    if (loading) return <Loader />

    return (
      <Table
        width={700}
        height={300}
        headerHeight={50}
        rowHeight={40}
        rowCount={events.length}
        rowGetter={({ index }) => events[index]}
        overscanRowCount={5}
        onRowClick={this.handleRowClick}
      >
        <Column label="Title" dataKey="title" width={300} />
        <Column label="Where" dataKey="where" width={250} />
        <Column label="When" dataKey="when" width={150} />
      </Table>
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
