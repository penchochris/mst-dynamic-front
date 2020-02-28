import React from "react";
import { observer, inject } from "mobx-react";

function Toolbar(props) {
  const { store } = props;
  const {
    getSelectedBoxes,
    addBox,
    removeBox,
    changeColor,
    history,
  } = store;

  const { undo, redo, canUndo, canRedo } = history;
  
  const selectedBoxes = getSelectedBoxes();

  const handleUndo = () => canUndo && undo();
  const handleRedo = () => canRedo && redo();

  return (
    <div className="toolbar">
      <button onClick={addBox}>Add Box</button>
      <button onClick={removeBox} disabled={!selectedBoxes}>Remove Box</button>
      <input 
        type="color" 
        disabled={!selectedBoxes} 
        onChange={e => changeColor(e.target.value)}
      />
      <button disabled={!canUndo} onClick={handleUndo}>Undo</button>
      <button disabled={!canRedo} onClick={handleRedo}>Redo</button>
      { 
        selectedBoxes
          ? <span>{selectedBoxes} selected</span>
          : <span>No boxes selected</span>
      }
    </div>
  );
}

export default inject('store')(
  observer(Toolbar)
);
