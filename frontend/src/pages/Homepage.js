import React from "react";
import FBIForm from "../components/FBIForm";
import SuspectData from "../components/SuspectData";
import "./Homepage.css";

export default function Homepage(props) {
  return (
    <div className="HomePage">
      <FBIForm />
      <SuspectData />
    </div>
  );
}
