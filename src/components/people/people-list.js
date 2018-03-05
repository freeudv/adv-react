import React, { Component } from "react"
import { List } from "react-virtualized"
import { connect } from "react-redux"
import { peopleListSelector, fetchAllPeople } from "../../ducks/people"
import PersonCard from "./person-card"

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  rowRenderer = ({ index, key, style }) => (
    <PersonCard person={this.props.people[index]} key={key} style={style} />
  )

  render() {
    return (
      <List
        rowCount={this.props.people.length}
        rowHeight={100}
        height={300}
        width={200}
        rowRenderer={this.rowRenderer}
      />
    )
  }
}

export default connect(
  state => ({
    people: peopleListSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
