import React from "react";
import Header from "../components/Header";
import "./style/likes.css";
import Hand from "../components/images/hand.jpeg";
import { Link } from "react-router-dom";

export default function Likes() {
  return (
    <>
      <Header />
      <div className="likePage">
        <div className="titleOfLikes">
          <hr />
          <h1>Your likes</h1>
          <hr />
        </div>
        <div className="likesInfo">
          <div className="listOfGallery">
            <Link to="/gallery-1">
              <div className="gallery1">
                <p>Gallery 1</p>
                <button>View</button>
              </div>
            </Link>
            <div className="gallery2">
              <p>Gallery 2</p>
              <button>View</button>
            </div>
            <div className="gallery3">
              <p>Gallery 3</p>
              <button>View</button>
            </div>
            <div className="gallery4">
              <p>Gallery 4</p>
              <button>View</button>
            </div>
            <div className="gallery5">
              <p>Gallery 5</p>
              <button>View</button>
            </div>
            <div className="gallery6">
              <p>Gallery 6</p>
              <button>View</button>
            </div>
            <div className="gallery7">
              <p>Gallery 7</p>
              <button>View</button>
            </div>
            <div className="gallery8">
              <p>Gallery 8</p>
              <button>View</button>
            </div>
          </div>
          <div className="imageDecor">
            <img src={Hand} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
