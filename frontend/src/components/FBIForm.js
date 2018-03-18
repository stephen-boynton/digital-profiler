import React, { Component } from "react";
import "./FBIForm.css";

export default class FBIForm extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [
        "Victim_Age",
        "Victim_Sex",
        "Victim_Race",
        "Victim_Ethnicity",
        "Weapon"
      ]
    };
  }

  render() {
    return (
      <div className="FBIForm">
        <form>
          <h3> Enter Victim Data to Receive Suspect </h3>
          {this.state.inputs.map(input => {
            return (
              <input
                key={input}
                name={input}
                placeholder={input.replace("_", " ")}
              />
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
