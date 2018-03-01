import React, { Component } from "react"
import { connect } from "react-redux"

import { addPerson } from "../../ducks/people"

import NewPersonForm from "../people/new-person-form"

class PeoplePage extends Component {
  render() {
    const { addPerson } = this.props

    return <NewPersonForm onSubmit={addPerson} />
  }
}

export default connect(null, { addPerson })(PeoplePage)
