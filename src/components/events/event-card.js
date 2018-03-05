import React, { Component } from "react"

export default class EventCard extends Component {
  render() {
    const { title, when, where } = this.props.event

    return (
      <div>
        <h3>{title}</h3>
        <p>
          {where}, {when}
        </p>
      </div>
    )
  }
}
