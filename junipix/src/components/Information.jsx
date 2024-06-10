import React from "react";
import "./style/information.css";
import { Link } from "react-router-dom";
import AiPix from "./images/AIPIX.jpg";
import Gallery3D from "./images/GALLERY3D.jpg";
import Author from "./images/AUTHOR.jpg";

export default function Information() {
  return (
    <div className="usage">
      <div className="aiFunction">
        <div className="titleInfo">Image Generator</div>
        <div className="explanation">
          <div className="explanationText">
            <p>
              Create your own AI-generated artwork and display it in stunning 3D
              galleries customize your creations by selecting styles and themes
              let the AI bring your vision to life explore endless creative
              possibilities with our intuitive generator join us now and start
              showcasing your unique AI-generated artwork in immersive 3D
              galleries
            </p>
          </div>
          <div className="explanationImg">
            <img src={AiPix} />
          </div>
        </div>
        <Link to="/create-artworks">
          <button>Discover</button>
        </Link>
      </div>
      <div className="galleryFunction">
        <div className="titleInfo">Virtual Gallery</div>
        <div className="explanation">
          <div className="explanationText">
            <p>
              Create your own 3D gallery and share your art with the world
              customize your space by adding images videos and even digital
              sculptures easily share your gallery link with friends and family
              and explore your creativity with our intuitive editor join us now
              and start building your personalized 3D gallery
            </p>
          </div>
          <div className="explanationImg">
            <img src={Gallery3D} alt="" />
          </div>
        </div>
        <Link to="/galleries">
          <button>Discover</button>
        </Link>
      </div>
      <div className="searchFunction">
        <div className="titleInfo">Existing Paints</div>
        <div className="explanation">
          <div className="explanationText">
            <p>
              Explore a vast collection of existing artworks and discover new
              favorites browse through different styles and themes find
              inspiration from artists around the world immerse yourself in
              stunning 3D galleries that bring each piece to life join us now
              and start your journey through an endless gallery of beautiful art
            </p>
          </div>
          <div className="explanationImg">
            <img src={Author} />
          </div>
        </div>
        <Link to="/artworks">
          <button>Discover</button>
        </Link>
      </div>
    </div>
  );
}
