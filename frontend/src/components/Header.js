import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <header>
      <div className="header_border">
        <h1>Digital Profiler</h1>
        <h4>A Statistiacal Modeler Based on Violent Crime Data</h4>
      </div>
    </header>
  );
}
