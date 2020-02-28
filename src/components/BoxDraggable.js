import React, { useState, useEffect, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";

import interact from 'interactjs';

function BoxDraggable({
  store,
  box,
  id,
  top,
  left,
  width,
  height,
  color,
  selected,
  children,
}) {

  const boxRef = useRef();

  const handleSelected = useCallback(() => box.toggleSelected(), [box]);

  const handleOnMove = useCallback( event => {
    const { current } = boxRef;

    const x = parseFloat(current.getAttribute('data-x') || left) + event.dx;
    const y = parseFloat(current.getAttribute('data-y') || top) + event.dy;

    current.style.webkitTransform = current.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    current.setAttribute('data-x', x);
    current.setAttribute('data-y', y);

  }, [left, top]);

  const handleOnEnd = useCallback( event => {
    const { current } = boxRef;
    const x = parseFloat(current.getAttribute('data-x'));
    const y = parseFloat(current.getAttribute('data-y'));
    
    const deltaX = box.left - x;
    const deltaY = box.top - y;

    box.selected ? store.moveAllSelected(deltaX, deltaY) : box.move(x, y);
  }, [box, store]);

  useEffect(() => {
    const { current } = boxRef;

    interact(current)
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
          })
        ],
        onmove: handleOnMove,
        onend: handleOnEnd,
    })
    .on('tap', handleSelected)

    return () => interact(current).unset();
  }, [handleSelected, handleOnMove, handleOnEnd]);

  return (
    <div
      id={id}
      ref={boxRef}
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
  );
}

export default inject('store')(
  observer(BoxDraggable)
);
