import React, { Component } from "react";
import Homepage from "./Homepage";
import "./App.css";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

export default App;
