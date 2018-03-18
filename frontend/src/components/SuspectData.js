import React, { Component } from "react";
import "./SuspectData.css";

export default class SuspectData extends Component {
  constructor() {
    super();
    this.state = {
      suspect: {}
    };
  }

  render() {
    return (
      <div className="SuspectData">
        <div className="SuspectBox">
          <h3>Suspect Data</h3>
        </div>
      </div>
    );
  }
}
