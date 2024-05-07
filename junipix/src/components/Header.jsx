import React from "react";
import "./style/header.css";
import Logo from "./images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">
          <img src={Logo} alt="" />
          <p>JUNIPIX</p>
        </div>
      </Link>
      <div className="navigation">
        <Link to="/artworks">
          <p>Works of Art</p>
        </Link>
        <p>3D Gallery</p>
        <p>Likes</p>
      </div>
      <div className="searchbar">
        <input type="text" placeholder="Search your favourite artpiece" />
        <img src="" alt="" />
      </div>
      <div className="login">
        <button>Login</button>
      </div>
    </div>
  );
}
