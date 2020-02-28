import React from "react";
import { observer, inject } from "mobx-react";

function BoxDraggable(props) {

  const { box } = props;

  const handleSelected = () => box.toggleSelected();

  return (
    <div
      id={props.id}
      className="box"
      style={{
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        outline: props.selected ? '2px solid blue' : '',
        transform: `translate(${props.left}px, ${props.top}px)`
      }}
      onClick={handleSelected}
    >
      {props.children}
    </div>
  );
}

export default inject('store')(
  observer(BoxDraggable)
);
