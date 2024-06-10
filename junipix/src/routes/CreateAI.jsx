import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Art from "../components/images/hand.jpeg";
import Heart from "../components/images/heart.png";
import "./style/createAi.css";
import { Link } from "react-router-dom";

export default function CreateAI(props) {
  const [images, setImages] = useState([]);
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showPopAi, setShowPopAi] = useState(false);
  const [newGalleryName, setNewGalleryName] = useState("");
  const [existingGalleries, setExistingGalleries] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("id"));

  const handleHeartClickAi = async (image) => {
    setSelectedImage(image);
    setShowPopAi(true);
    await fetchGalleries();
  };

  const handleClosePopUpAi = () => {
    setShowPopAi(false);
  };

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
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

  const fetchGalleries = async () => {
    try {
      const response = await fetch("http://localhost:3000/likes");
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
    if (!selectedImage) return;
    console.log(`Adding to existing gallery: ${galleryId}`);
    try {
      const response = await fetch(`http://localhost:3000/likes/${galleryId}`);
      const gallery = await response.json();

      if (gallery.artpieces.length >= 6) {
        console.log("Maximum art pieces reached for this gallery");
        return;
      }

      const responseAdd = await fetch(
        `http://localhost:3000/likes/${galleryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artpiece: {
              title: `${inputRef.current.value}`,
              author: "AiPix",
              style: "AI",
              url: selectedImage.url,
              userid: userId,
            },
          }),
        }
      );

      if (responseAdd.ok) {
        console.log(`Added to existing gallery: ${galleryId}`);
      } else {
        console.error("Error adding to existing gallery");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateNewGallery = async () => {
    if (!selectedImage) return;

    const newGallery = {
      userid: userId,
      id: new Date().getTime().toString(),
      name: newGalleryName,
      artpieces: [
        {
          title: `${inputRef.current.value}`,
          author: "AiPix",
          style: "AI",
          url: selectedImage.url,
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGallery),
      });

      const gallery = await response.json();
      setExistingGalleries([...existingGalleries, gallery]);
      setShowPopAi(false);
    } catch (error) {
      console.error("Error creating new gallery:", error);
    }
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
              <div className="cardAi" key={index}>
                <div className="likeAi">
                  <button onClick={() => handleHeartClickAi(image)}>
                    <img src={Heart} alt="like" />
                  </button>
                </div>
                <div className="imageAi">
                  <img
                    src={image.url === "/" ? Art : image.url}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>

          {showPopAi && (
            <div className="PopUpAi" key={props.id}>
              <div className="PopUpInfoAi">
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
                <button id="close" onClick={handleClosePopUpAi}>
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}
