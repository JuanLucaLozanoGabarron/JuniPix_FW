import { React} from "react";
import "./style/ai.css";
import Art from "./images/hand.jpeg";
import Heart from "./images/heart.png";

export default function AI() {
  return (
    <div className="cardAi">
      <div className="likeAi">
        <button>
          <img src={Heart} alt="" />
        </button>
      </div>
      <div className="imageAi">
        <img src={Art} alt="" />
      </div>
    </div>
  );
}
