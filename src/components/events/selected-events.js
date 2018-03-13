import React, { Component } from "react"
import { connect } from "react-redux"
import { selectedEventsSelector } from "../../ducks/events"
import { TransitionMotion, spring } from 'react-motion'

import EventCard from "./event-card"

class SelectedEvents extends Component {
  render() {
    const { events } = this.props
    return (
      <div>
        {events.map(
          event => event && <EventCard key={event.uid} event={event} />
        )}
      </div>
    )
  }
  // but not working!!!
  // render() {
  //   return <TransitionMotion
  //     styles={this.getStyles()}
  //     willLeave={this.willLeave}
  //     willEnter={this.willEnter}
  //   >
  //     {(interpolated) => <div>
  //       {
  //         interpolated.map(config => <div style={config.style} key={config.key}>
  //           <EventCard event={config.data} />
  //         </div>)
  //       }
  //     </div>
  //     }
  //   </TransitionMotion>
  // }

  willLeave = () => ({
    opacity: spring(0, { stiffness: 100 })
  })

  willEnter = () => ({
    opacity: 0
  })

  getStyles() {
    return this.props.events.map(event => ({
      style: {
        opacity: spring(1, { stiffness: 50 })
      },
      key: event.uid,
      data: event
    }))
  }
}

export default connect(state => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
