import React, { useState } from "react";
import "./style/card.css";
import Heart from "./images/heart.png";
import { Link } from "react-router-dom";

export default function Card(props) {
  const [showPop, setShowPop] = useState(false);

  const handleHeartClick = () => {
    setShowPop(true);
  };

  const handleClosePopUp = () => {
    setShowPop(false);
  };
  return (
    <>
      <div className="cardArt" key={props.id}>
        <div className="likeArt">
          <button onClick={handleHeartClick}>
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
      {showPop && (
        <div className="PopUp" key={props.id}>
          <div className="PopUpInfo">
            <h2>Log in or create an account</h2>
            <p>To add this work to your favourites, please</p>
            <div className="loginPopUp">
              <Link to="/login">
                <button>Login</button>
              </Link>
              or
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
            <button onClick={handleClosePopUp}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
}
