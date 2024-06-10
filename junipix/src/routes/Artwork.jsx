import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import "./style/artwork.css";
import Card from "../components/Card";
import Painting from "../paintings.json";
import NoResultsImage from "./images/noResult.png";

export default function Artwork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPaintings, setFilteredPaintings] = useState(Painting);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchQuery(query);
    handleSearchSubmit(query);
  }, [searchParams]);

  const handleSearchSubmit = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = Painting.filter(
      (painting) =>
        painting.style.toLowerCase().includes(lowerCaseQuery) ||
        painting.author.toLowerCase().includes(lowerCaseQuery) ||
        painting.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPaintings(filtered);
  };

  const pageTitle = searchQuery ? `${searchQuery}` : "Art Gallery";

  const noResults = filteredPaintings.length === 0;

  return (
    <>
      <Header />
      <div className="searchPage">
        {noResults ? (
          <div className="titleOfSearch">
            <hr />
            <h1>No results </h1>
            <hr />
          </div>
        ) : (
          <div className="titleOfSearch">
            <hr />
            <h1>{pageTitle}</h1>
            <hr />
          </div>
        )}
        <div className="cardsOfArtwork">
          {noResults ? (
            <div className="noResults">
              <p>No works of art matching your search - {pageTitle}</p>
              <img id="noResults" src={NoResultsImage} alt="No results" />
            </div>
          ) : (
            filteredPaintings.map((painting) => (
              <Card
                key={painting.id}
                id={painting.id}
                title={painting.title}
                author={painting.author}
                style={painting.style}
                url={painting.url}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
