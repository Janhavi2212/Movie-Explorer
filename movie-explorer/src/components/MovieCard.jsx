import React from 'react';
import { IMAGE_BASE_URL } from '../api/tmdbService';

const MovieCard = ({ movie, onSelectMovie }) => (
  <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
    <div
      className="card h-100 bg-dark border-secondary text-white movie-card-hover"
      onClick={() => onSelectMovie(movie.id)}
    >
      <img
        src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}
        className="card-img-top"
        alt={movie.title}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-info">{movie.title}</h5>
        <p className="card-text mt-auto">Rating: {movie.vote_average.toFixed(1)} ⭐</p>
      </div>
    </div>
  </div>
);

export default MovieCard;