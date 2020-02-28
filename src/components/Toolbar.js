import React from "react";
import { observer, inject } from "mobx-react";

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

  return (
    <div className="toolbar">
      <button onClick={addBox}>Add Box</button>
      <button onClick={removeBox} disabled={!countSelected}>Remove Box</button>
      <input 
        type="color" 
        disabled={!countSelected} 
        onChange={e => changeColor(e.target.value)}
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
