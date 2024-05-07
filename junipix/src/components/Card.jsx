import React from "react";
import "./style/card.css";

export default function Card() {
  return (
    <div className="cardArt">
      <div className="imageArt"></div>
      <div className="textArt">
        <div className="titleArt">
          <p>title art</p>
        </div>
        <div className="secondInfo">
          <p> author - style</p>
        </div>
      </div>
    </div>
  );
}
