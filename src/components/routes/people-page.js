import React, { Component } from "react"
import { connect } from "react-redux"

import { addPerson, moduleName } from "../../ducks/people"

import NewPersonForm from "../people/new-person-form"
import PeopleList from "../people/people-list"
import PeopleTable from "../people/people-table"
import Loader from "../common/loader"

class PeoplePage extends Component {
  render() {
    const { loading, addPerson } = this.props

    return (
      <div>
        <h2>Add new person</h2>
        <PeopleTable />
        {loading ? <Loader /> : <NewPersonForm onSubmit={addPerson} />}
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: state[moduleName].loading
  }),
  { addPerson }
)(PeoplePage)
