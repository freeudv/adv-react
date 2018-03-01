import React, { Component } from "react"
import { connect } from "react-redux"
import { moduleName, fetchAll } from "../../ducks/events"

class EventsList extends Component {
  componentDidMount() {
    this.props.fetchAll()
  }

  render() {
    const { events } = this.props
    console.log("events---", events)

    return <div>EventsList</div>
  }
}

export default connect(
  state => ({
    events: state[moduleName].entities
  }),
  { fetchAll }
)(EventsList)
