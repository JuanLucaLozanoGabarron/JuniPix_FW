import React from "react";
import "./style/card.css";
import Art from "./images/hand.jpeg";

export default function Card() {
  return (
    <div className="cardArt">
      <div className="likeArt">
        <button>
          <img src="" alt="" />
        </button>
      </div>
      <div className="imageArt">
        <img src={Art} alt="" />
      </div>
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
