import React from "react";
import back from "./images/background.jpeg";
import "./style/background.css";

export default function Background() {
  return (
    <div className="backImage">
      <img src={back} alt="" />
    </div>
  );
}
