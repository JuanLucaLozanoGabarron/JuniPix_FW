import React from "react";
import Header from "../components/Header";
import "./style/artwork.css";
import Card from "../components/Card";

export default function Artwork() {
  return (
    <>
      <Header />
      <div className="searchPage">
        <div className="titleOfSearch">
          <hr />
          <h1>Search</h1>
          <hr />
        </div>
        <div className="cardsOfArtwork">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
