import React from "react";
import "./style/card.css";
import Heart from "./images/heart.png";

export default function Card(props) {
  return (
    <div className="cardArt" key={props.id}>
      <div className="likeArt">
        <button>
          <img src={Heart} alt="like" />
        </button>
      </div>
      <div className="imageArt">
        <img src={props.url} />
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