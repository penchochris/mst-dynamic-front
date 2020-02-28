import { types } from "mobx-state-tree";

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: 200,
    height: 100,
    color: "#FFF000",
    left: 200,
    top: 100,
    selected: false,
  })
  .views(self => ({}))
  .actions(self => ({
    toggleSelected() {
      self.selected = !self.selected;
    }
  }))
export default BoxModel;
