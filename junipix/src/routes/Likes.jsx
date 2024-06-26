import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./style/likes.css";
import { Link } from "react-router-dom";
import Hand from "../components/images/hand.jpeg";

export default function Likes() {
  const [galleries, setGalleries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch("https://junipix-api.onrender.com/likes");
      const allGalleries = await response.json();

      const userId = localStorage.getItem("id");

      if (!userId) {
        setIsLoggedIn(false);
        return;
      }

      const userGalleries = allGalleries.filter((gallery) => {
        return gallery.userid === userId;
      });

      setGalleries(userGalleries);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <div className="background"></div>
        <Header />
        <div className="likePage">
          <div className="titleOfLikes">
            <hr />
            <h1>Your Likes</h1>
            <hr />
          </div>
          <div className="likesInfo">
            <div className="imageDecor">
              <img src={Hand} alt="" />
            </div>
            <div className="loginMessage">
              <p>Please login to view your likes.</p>
              <Link to="/login">
                <button id="loginLikes">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="background"></div>
      <Header />
      <div className="likePage">
        <div className="titleOfLikes">
          <hr />
          <h1>Your Likes</h1>
          <hr />
        </div>
        <div className="likesInfo">
          <div className="imageDecor">
            <img src={Hand} alt="" />
          </div>
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
        </div>
      </div>
    </>
  );
}
