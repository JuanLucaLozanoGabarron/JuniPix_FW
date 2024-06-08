import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./style/gallery.css";
import Card from "../components/Card"; // Assurez-vous d'importer le composant Card

export default function Gallery() {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGallery();
  }, [id]);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`http://localhost:3000/likes/${id}`);
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
      const response = await fetch(`http://localhost:3000/likes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Gallery deleted successfully`);
        navigate("/likes");
      } else {
        console.error("Error deleting gallery");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!gallery) return <div>Loading...</div>;

  return (
    <>
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
          <h2>Art pieces</h2>
          <div className="listArtPieces">
            {gallery.artpieces.map((artpiece) => (
              <Card
                key={artpiece._id}
                id={artpiece._id}
                title={artpiece.title}
                author={artpiece.author}
                style={artpiece.style}
                url={artpiece.url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
