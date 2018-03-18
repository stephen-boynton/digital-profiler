import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage.js";
import Header from "../components/Header";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

export default App;
