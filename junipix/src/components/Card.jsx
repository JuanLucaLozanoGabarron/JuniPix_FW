import React from "react";
import "./style/card.css";
import Art from "./images/hand.jpeg";
import Heart from "./images/heart.png";

export default function Card(props) {
  return (
    <div className="cardArt" key={props.id}>
      <div className="likeArt">
        <button>
          <img src={Heart} alt="" />
        </button>
      </div>
      <div className="imageArt">
        <img src={props.url} alt="" />
      </div>
      <div className="textArt">
        <div className="titleArt">
          <p>{props.title}</p>
        </div>
        <div className="secondInfo">
          <p>
            {props.author} - {props.style}
          </p>
        </div>
      </div>
    </div>
  );
}
