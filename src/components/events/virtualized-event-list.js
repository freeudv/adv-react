import React, { Component } from "react"
import { connect } from "react-redux"
import { Table, Column, InfiniteLoader } from "react-virtualized"
import "react-virtualized/styles.css"

import {
  loadingSelector,
  eventListSelector,
  fetchLazy,
  selectEvent
} from "../../ducks/events"

import Loader from "../common/loader"

//export for tests
export class EventList extends Component {
  componentDidMount() {
    //this.props.fetchAll()
    this.props.fetchLazy()
  }

  handleRowClick = ({ rowData }) => {
    const { selectEvent } = this.props
    selectEvent && selectEvent(rowData.uid)
  }

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazy()
    console.log("----", "load more")
  }

  render() {
    const { loading, events } = this.props
    //if (loading) return <Loader />

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={loading ? events.length : events.length + 1}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            width={700}
            height={300}
            headerHeight={50}
            rowHeight={40}
            rowCount={events.length}
            rowGetter={({ index }) => events[index]}
            overscanRowCount={5}
            onRowClick={this.handleRowClick}
          >
            <Column label="Title" dataKey="title" width={250} />
            <Column label="Where" dataKey="where" width={250} />
            <Column label="When" dataKey="when" width={200} />
          </Table>
        )}
      </InfiniteLoader>
    )
  }
}

export default connect(
  state => ({
    events: eventListSelector(state),
    loading: loadingSelector(state)
  }),
  { fetchLazy, selectEvent }
)(EventList)
