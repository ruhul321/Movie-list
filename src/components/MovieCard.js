import React from "react";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const fallbackImage = "placeholder_image.png";

  return (
    <>
      <a
        href={`https://test.create.diagnal.com/images/${movie["poster-image"]}`}
      >
        <div className="movie-card">
          <img
            src={`https://test.create.diagnal.com/images/${movie["poster-image"]}`}
            alt={movie.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            className="movie-card-image"
          />
          <p className="movie-card-title">{movie.name}</p>
        </div>
      </a>
    </>
  );
};

export default MovieCard;
