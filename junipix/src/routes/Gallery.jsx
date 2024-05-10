import React from "react";
import AI from "../components/AI";
import Card from "../components/Card";
import Header from "../components/Header";
import "./style/gallery.css";
import { Link } from "react-router-dom";

export default function Gallery() {
  return (
    <>
      <Header />
      <div className="likePage">
        <div className="titleOfLikes">
          <Link to="/likes">
            <button>Go to likes</button>
          </Link>
          <hr />
          <h1>Gallery 1</h1>
          <hr />
          <button>Delete Gallery</button>
        </div>
        <div className="listOfLikedArt">
          <h2>artificial intelligence</h2>
          <div className="listAi">
            <AI />
            <AI />
            <AI />
            <AI />
          </div>
          <h2>Existing paints</h2>
          <div className="listExistingPaints">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
}
