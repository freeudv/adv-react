import React, { Component } from "react"
import { DropTarget } from "react-dnd"
import { connect } from "react-redux"
import { addEventToPerson, peopleListSelector } from "../../ducks/people"

class EventCard extends Component {
  render() {
    const { title, when, where } = this.props.event
    const { people, connectDropTarget, canDrop, hovered } = this.props

    const dragStyle = {
      border: `1px solid ${canDrop ? "red" : "black"}`,
      backgroundColor: hovered ? "tomato" : "white"
    }

    const peopleElement = people && (
      <p>{people.map(person => person.email).join(", ")}</p>
    )

    return connectDropTarget(
      <div style={dragStyle}>
        <h3>{title}</h3>
        <p>
          {where}, {when}
        </p>
        {peopleElement}
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const eventUid = props.event.uid
    const personUid = monitor.getItem().uid

    props.addEventToPerson(eventUid, personUid)
    console.log("eventUid---", eventUid, "personUid---", personUid)

    return { eventUid }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect(
  (state, props) => ({
    people: peopleListSelector(state).filter(person =>
      person.events.includes(props.event.uid)
    )
  }),
  { addEventToPerson }
)(DropTarget(["person"], spec, collect)(EventCard))
