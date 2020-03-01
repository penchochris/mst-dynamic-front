import React, { Component, createRef } from 'react'
import { observer, inject } from "mobx-react";
import interact from 'interactjs';

class BoxDraggable extends Component {

  boxRef = createRef();
  interactable = '';

  handleSelected = () => this.props.store.history.withoutUndo(() => 
    this.props.box.toggleSelected()
  );
  
  handleOnMove = event => {
    const { current } = this.boxRef;
    const { left, top, box, store } = this.props;
    
    const x = parseFloat(current.getAttribute('data-x') || left) + event.dx;
    const y = parseFloat(current.getAttribute('data-y') || top) + event.dy;
    
    const deltaX = box.left - x;
    const deltaY = box.top - y;
    
    box.selected 
    ? store.moveAllSelected(deltaX, deltaY)
    : box.move(x, y);
  };
  
  handleOnStart = () => {
    const { store } = this.props;
    store.history.startGroup(() => {});
  }
  handleOnEnd = () => {
    const { store } = this.props;
    store.history.stopGroup();
  }
  componentDidMount() {
    const { current } = this.boxRef;

    this.interactable = interact(current);

    this.interactable
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
          })
        ],
        onstart: this.handleOnStart,
        onmove: this.handleOnMove,
        onend: this.handleOnEnd,
    })
    .on('tap', this.handleSelected)

    
  }

  componentWillUnmount() {
    this.interactable.unset();
  }

  render() {

    const { id, color, width, height, selected, left, top, children } = this.props;

    return (
      <div
      id={id}
      ref={this.boxRef}
      className="box"
      style={{
        backgroundColor: color,
        width: width,
        height: height,
        outline: selected ? '2px solid blue' : '',
        transform: `translate(${left}px, ${top}px)`
      }}
    >
      {children}
    </div>
    )
  }
}

export default inject('store')(
  observer(BoxDraggable)
);
