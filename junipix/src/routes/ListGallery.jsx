import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./style/likes.css";
import { Link } from "react-router-dom";
import Hand from "../components/images/hand.jpeg";
import Swal from "sweetalert2";

export default function ListGalley() {
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

  const handleGalleryClick = (gallery) => {
    if (gallery.artpieces.length < 4) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Minimum of four art pieces required",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    } else {
      window.location.href = `/gallery/${gallery._id}`;
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="likePage">
          <div className="titleOfLikes">
            <hr />
            <h1>Your Galleries</h1>
            <hr />
          </div>
          <div className="likesInfo">
            <div className="loginMessage">
              <p>Please login to view your galleries.</p>
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
          <h1>Your Galleries</h1>
          <hr />
        </div>
        <div className="likesInfo">
          <div className="listOfGallery">
            {galleries.map((gallery) => (
              <div className="galleryItem" key={gallery._id}>
                <p>{gallery.name}</p>
                <button onClick={() => handleGalleryClick(gallery)}>
                  View
                </button>
              </div>
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
