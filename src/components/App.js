import React from "react";

import { Provider } from 'mobx-react';
import store from "../stores/MainStore";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import { observer } from "mobx-react";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Toolbar />
        <Canvas/>
      </div>
    </Provider>
  );
}

export default observer(App);
