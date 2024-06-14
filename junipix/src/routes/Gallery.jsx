import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./style/gallery.css";
import Card from "../components/Card";
import Swal from "sweetalert2";

export default function Gallery() {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGallery();
  }, [id]);

  const fetchGallery = async () => {
    try {
      const response = await fetch(
        `https://junipix-api.onrender.com/likes/${id}`
      );
      if (response.ok) {
        const gallery = await response.json();
        setGallery(gallery);
      } else {
        console.error("Error fetching gallery");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const handleDeleteGallery = async () => {
    console.log("test delete");
    try {
      const response = await fetch(
        `https://junipix-api.onrender.com/likes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Gallery deleted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/likes");
      } else {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error deleting gallery",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!gallery) return <div>Loading...</div>;

  return (
    <>
      <div className="background"></div>
      <Header />
      <div className="likePage">
        <div className="titleOfLikes">
          <Link to="/likes">
            <button>Go to likes</button>
          </Link>
          <hr />
          <h1>{gallery.name}</h1>
          <hr />
          <button onClick={handleDeleteGallery}>Delete Gallery</button>
        </div>
        <div className="listOfLikedArt">
          <div className="listArtPieces">
            {gallery.artpieces.map((artpiece) => (
              <Card
                key={artpiece._id}
                id={artpiece._id}
                title={artpiece.title}
                author={artpiece.author}
                style={artpiece.style}
                url={artpiece.url}
                hideHeartButton={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
