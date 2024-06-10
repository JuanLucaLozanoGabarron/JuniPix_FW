import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./style/likes.css";
import { Link } from "react-router-dom";
import Hand from "../components/images/hand.jpeg";

export default function Likes() {
  const [galleries, setGalleries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Ajout de l'état isLoggedIn

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch("http://localhost:3000/likes");
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
        <Header />
        <div className="likePage">
          <div className="titleOfLikes">
            <hr />
            <h1>Your Likes</h1>
            <hr />
          </div>
          <div className="likesInfo">
            <div className="loginMessage">
              <p>Please login to view your likes.</p>
              <Link to="/login">
                <button id="loginLikes">Login</button>
              </Link>
            </div>
            <div className="imageDecor">
              <img src={Hand} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }

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
