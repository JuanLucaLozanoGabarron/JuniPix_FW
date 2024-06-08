import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./style/likes.css";
import { Link } from "react-router-dom";
import Hand from "../components/images/hand.jpeg";

export default function Likes() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch("http://localhost:3000/likes");
      const galleries = await response.json();
      setGalleries(galleries);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };

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
            {galleries.map((gallery) => (
              <Link to={`/likes/${gallery._id}`} key={gallery._id}>
                <div className="galleryItem">
                  <p>{gallery.name}</p>
                  <button>View</button>
                </div>
              </Link>
            ))}
          </div>
          <div className="imageDecor">
            <img src={Hand} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
