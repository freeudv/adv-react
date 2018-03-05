import React, { Component } from "react"
import { DropTarget } from "react-dnd"

class EventCard extends Component {
  render() {
    const { title, when, where } = this.props.event
    const { connectDropTarget, canDrop, hovered } = this.props

    const dragStyle = {
      border: `1px solid ${canDrop ? "red" : "black"}`,
      backgroundColor: hovered ? "tomato" : "white"
    }

    return connectDropTarget(
      <div style={dragStyle}>
        <h3>{title}</h3>
        <p>
          {where}, {when}
        </p>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid
    const eventUid = props.event.uid

    console.log("personUid---", personUid)
    console.log("eventUid---", eventUid)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default DropTarget(["person"], spec, collect)(EventCard)
