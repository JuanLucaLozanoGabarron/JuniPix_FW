import React from "react";
import Header from "../components/Header";
import "./style/artwork.css";
import Card from "../components/Card";
import Painting from "../paintings.json";

export default function Artwork(props) {
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
          {Painting.map((props) => {
            return (
              <Card
                id={props.id}
                title={props.title}
                author={props.author}
                style={props.style}
                url={props.url}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
