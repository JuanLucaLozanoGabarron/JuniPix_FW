import React, { useState } from "react";
import "./style/header.css";
import Logo from "./images/logo.png";
import Glass from "./images/glass_black.png";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/artworks?query=${searchQuery}`);
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <p>JUNIPIX</p>
        </div>
      </Link>
      <div className="navigation">
        <Link to="/artworks">
          <p>Works of Art</p>
        </Link>
        <Link to="/galleries">
          <p>3D Gallery</p>
        </Link>
        <Link to="/likes">
          <p>Likes</p>
        </Link>
      </div>
      <form onSubmit={handleSearchSubmit} className="searchbar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your favourite artpiece"
        />
        <button id="buttonSearch" type="submit">
          <img src={Glass} alt="search icon" />
        </button>
      </form>
      <Link to="/login">
        <div className="login">
          <button>Login</button>
        </div>
      </Link>
    </div>
  );
}
