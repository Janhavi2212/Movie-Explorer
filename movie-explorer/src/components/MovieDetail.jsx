import React from 'react';

const MovieDetail = ({ movie, onBack }) => {
  const trailer = movie.videos?.results.find(vid => vid.type === 'Trailer');

  return (
    <div className="bg-dark p-4 p-md-5 rounded text-white">
      <button className="btn btn-outline-info mb-4" onClick={onBack}>
        ← Back to List
      </button>
      
      <h2 className="display-5 text-info fw-bold">{movie.title}</h2>
      <p className="lead mt-3">{movie.overview}</p>
      <p className="fs-5"><strong>Rating:</strong> {movie.vote_average.toFixed(1)} ⭐</p>

      {trailer ? (
        <div className="ratio ratio-16x9 mt-4">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="text-muted mt-4">No trailer available.</p>
      )}
    </div>
  );
};

export default MovieDetail;