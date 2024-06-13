import React, { useState, useEffect } from "react";
import "./style/card.css";
import Heart from "./images/heart.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Card(props) {
  const [showPop, setShowPop] = useState(false);
  const [newGalleryName, setNewGalleryName] = useState("");
  const [existingGalleries, setExistingGalleries] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id"));

  const handleHeartClick = async () => {
    setShowPop(true);
    await fetchGalleries();
  };

  const handleClosePopUp = () => {
    setShowPop(false);
  };

  const fetchGalleries = async () => {
    try {
      const response = await fetch("https://junipix-api.onrender.com/likes");
      const galleries = await response.json();
      const userGalleries = galleries.filter(
        (gallery) => gallery.userid === userId
      );
      setExistingGalleries(userGalleries);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };

  const handleAddToExistingGallery = async (galleryId) => {
    console.log(`Adding to existing gallery: ${galleryId}`);
    try {
      const response = await fetch(
        `https://junipix-api.onrender.com/likes/${galleryId}`
      );
      const gallery = await response.json();

      if (gallery.artpieces.length >= 6) {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Maximum art pieces reached for this gallery",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      const responseAdd = await fetch(
        `https://junipix-api.onrender.com/likes/${galleryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artpiece: {
              title: props.title,
              author: props.author,
              style: props.style,
              url: props.url,
              userid: userId,
            },
          }),
        }
      );

      if (responseAdd.ok) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Added to gallery successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        setShowPop(false);
      } else {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error adding to existing gallery",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateNewGallery = async () => {
    const newGallery = {
      userid: userId,
      id: new Date().getTime().toString(),
      name: newGalleryName,
      artpieces: [
        {
          id: props.id,
          title: props.title,
          author: props.author,
          style: props.style,
          url: props.url,
        },
      ],
    };

    try {
      const response = await fetch("https://junipix-api.onrender.com/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGallery),
      });

      const gallery = await response.json();
      setExistingGalleries([...existingGalleries, gallery]);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Added to gallery successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setShowPop(false);
    } catch (error) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error creating new gallery",
        showConfirmButton: false,
        timer: 2000,
      });
      console.error("Error creating new gallery:", error);
    }
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
          <img src={props.url} alt={props.title} />
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
            {userId ? (
              <>
                <h2>Add to Gallery</h2>
                <p>Choose an option:</p>
                <div className="options">
                  <div>
                    <h3>Add to existing gallery:</h3>
                    <div className="choiseGallery">
                      {existingGalleries.map((gallery) => (
                        <button
                          key={gallery._id}
                          onClick={() =>
                            handleAddToExistingGallery(gallery._id)
                          }
                        >
                          {gallery.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>Create new gallery:</h3>
                    <div className="newGallery">
                      <input
                        type="text"
                        placeholder="Enter new gallery name"
                        value={newGalleryName}
                        onChange={(e) => setNewGalleryName(e.target.value)}
                      />
                      <button onClick={handleCreateNewGallery}>
                        Create new gallery
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>Not Logged In</h2>
                <p>You must be logged in to like art pieces.</p>
                <Link to="/login">
                  <button id="popUpLogin">Go to Login</button>
                </Link>
              </>
            )}
            <button id="close" onClick={handleClosePopUp}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
