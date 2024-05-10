import React from "react";
import Header from "../components/Header";
import AI from "../components/AI";
import "./style/createAi.css";

export default function CreateAI() {
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
          <img src="" alt="" />
          <input
            type="text"
            placeholder="Describe the image you wish to create"
          />
          <button>Generate</button>
        </div>
        <button id="regenerate">Regenerate</button>
        <div className="cardsOfAi">
          <AI />
          <AI />
          <AI />
          <AI />
        </div>
      </div>
    </>
  );
}
