import { types, onSnapshot } from "mobx-state-tree";
import { UndoManager } from "mst-middlewares"
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
    history: types.optional(UndoManager, {})
  })
  .actions(self => ({
    addBox() {
      const box = BoxModel.create({
        id: uuid(),
        color: getRandomColor(),
        left: 0,
        top: 0
      });

      self.boxes.push(box)
    },
    removeBox() {
      self.boxes = self.boxes.filter(box => !box.selected )
    },
    changeColor(color) {
      self.boxes = self.boxes.map( box =>
        box.selected
          ? { ...box, color }
          : box
      )
    },
    moveAllSelected(deltaX, deltaY) {
      self.boxes = self.boxes.map( box =>
        box.selected
          ? { ...box, left: box.left - deltaX, top: box.top - deltaY }
          : box
      )
    },
  }))
  .views(self => ({
    getSelectedBoxes() {
      return self.boxes.filter(box => box.selected)
    },
    countSelectedBoxes() {
      return self.boxes.filter(box => box.selected).length
    },
  }));

const localStorageName = 'snapshots';

const initialState = 
  localStorage.getItem(localStorageName)
    ? JSON.parse(localStorage.getItem(localStorageName))
    : {};

const store = MainStore.create(initialState);

onSnapshot(store, (snapshot) => {
  localStorage.setItem(localStorageName, JSON.stringify(snapshot));
});

export default store;
