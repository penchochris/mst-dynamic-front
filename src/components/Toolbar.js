import React from "react";
import { observer, inject } from "mobx-react";
import debounce from 'lodash/debounce';

function Toolbar(props) {
  const { store } = props;
  const {
    countSelectedBoxes,
    addBox,
    removeBox,
    changeColor,
    history,
  } = store;

  const { undo, redo, canUndo, canRedo } = history;
  
  const countSelected = countSelectedBoxes();

  const handleUndo = () => canUndo && undo();
  const handleRedo = () => canRedo && redo();
  const handleChangeColor = value => {
    changeColor(value)
  }
  const debouncedHandleChangeColor = debounce(handleChangeColor, 450);

  return (
    <div className="toolbar">
      <button onClick={addBox}>Add Box</button>
      <button onClick={removeBox} disabled={!countSelected}>Remove Box</button>
      <input 
        type="color" 
        disabled={!countSelected} 
        onChange={(e) => debouncedHandleChangeColor(e.target.value)}
      />
      <button disabled={!canUndo} onClick={handleUndo}>Undo</button>
      <button disabled={!canRedo} onClick={handleRedo}>Redo</button>
      { 
        countSelected
          ? <span>{countSelected} selected</span>
          : <span>No boxes selected</span>
      }
    </div>
  );
}

export default inject('store')(
  observer(Toolbar)
);
