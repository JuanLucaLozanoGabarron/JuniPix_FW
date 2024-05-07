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
          <h1>Search</h1>
        </div>
        <div className="cardsOfArtwortk">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
