import React from 'react'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'

import CookBookItem from '~/components/CookBookItem'

import './style.scss'

const DragHandle = SortableHandle(() => (<span className="handler"></span>))

const SortableItem = SortableElement(({ recipeId, props }) => (
  <li className="cook-book-item">
    <DragHandle />
    <CookBookItem cookBook={props.cookBook} id={recipeId} />
  </li>
))

const SortableList = SortableContainer(({ items, props }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          recipeId={item.id}
          props={props}
        />
      ))}
    </ul>
  )
})

class CookBook extends React.Component {
  constructor (props) {
    super(props)
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  onSortEnd ({ oldIndex, newIndex }) {
    if (this.props.updateCookBook) {
      this.props.updateCookBook(arrayMove(
        this.props.cookBook,
        oldIndex,
        newIndex
      ))
    }
  }

  render () {
    return (
      <SortableList
        props={this.props}
        items={this.props.cookBook}
        onSortEnd={this.onSortEnd}
        useDragHandle={true}
      />
    )
  }
}

export default CookBook