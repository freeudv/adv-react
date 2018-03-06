import React, { Component } from "react"
import { DragLayer } from "react-dnd"

import PersonCardDragPreview from "./people/person-card-drag-preview"

const layerStyle = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
}

const previewMap = {
  person: PersonCardDragPreview
}

class CustomDragLayer extends Component {
  getItem = () => {
    const { item, itemType, offset } = this.props
    const PreviewComponent = previewMap[itemType]
    console.log("offset", offset)

    if (!offset || !PreviewComponent) return null

    const { x, y } = offset

    const style = {
      transform: `translate(${x}px, ${y}px)`
    }

    return (
      <div style={style}>
        <PreviewComponent {...item} />
      </div>
    )
  }

  render() {
    const { isDragging } = this.props

    if (!isDragging) return null
    const item = this.getItem()

    if (!item) return null

    return <div style={layerStyle}>{item}</div>
  }
}

const collect = monitor => ({
  isDragging: monitor.isDragging(),
  offset: monitor.getSourceClientOffset(),
  item: monitor.getItem(),
  itemType: monitor.getItemType()
})

export default DragLayer(collect)(CustomDragLayer)
