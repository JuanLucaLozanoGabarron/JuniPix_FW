import React from "react";
import "./style/ai.css";
import Art from "./images/hand.jpeg";

export default function AI() {
  return (
    <div className="cardAi">
      <div className="likeAi">
        <button>
          <img src="" alt="" />
        </button>
      </div>
      <div className="imageAi">
        <img src={Art} alt="" />
      </div>
    </div>
  );
}
