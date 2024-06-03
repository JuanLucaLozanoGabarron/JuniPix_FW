import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Art from "../components/images/hand.jpeg";
import Heart from "../components/images/heart.png";
import { Link } from "react-router-dom";
import AI from "../components/AI.jsx";
import "./style/createAi.css";

export default function CreateAI() {
  const [images, setImages] = useState([]);
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const auth = {
    apiKey: `${process.env.REACT_APP_MY_API_KEY}`,
    api: `${process.env.REACT_APP_MY_API}`,
  };

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_MY_API_KEY}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 4,
          size: "256x256",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    setImages(data.data);
    setLoading(false);
  };

  const [showPopAi, setShowPopAi] = useState(false);

  const handleHeartClickAi = () => {
    setShowPopAi(true);
  };

  const handleClosePopAi = () => {
    setShowPopAi(false);
  };

  return (
    <>
      <Header />
      <div className="createPage">
        <div className="titleOfCreation">
          <hr />
          <h1>Create ai art</h1>
          <hr />
        </div>
        <div className="searchAi">
          <input
            type="text"
            ref={inputRef}
            placeholder="Describe the image you wish to create"
          />
          <button onClick={() => imageGenerator()}>Generate</button>
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
        </div>
        <>
          <div className="cardsOfAi">
            {images.map((image, index) => (
              <div className="cardAi">
                <div className="likeAi">
                  <button onClick={handleHeartClickAi}>
                    <img src={Heart} alt="" />
                  </button>
                </div>
                <div className="imageAi">
                  <img
                    key={index}
                    src={image.url === "/" ? Art : image.url}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>

          {showPopAi && (
            <div className="PopUp">
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
                <button onClick={handleClosePopAi}>Fermer</button>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}
