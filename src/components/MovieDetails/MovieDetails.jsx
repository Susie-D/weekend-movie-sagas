import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieDetails.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function MovieDetails() {
  const dispatch = useDispatch();
  const movie = useSelector((store) => store.movie);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIE' });
  }, []);

  return (
    <div data-testid="movieDetails" className="movie-details-container">
      <Link className="home-btn" to="/">
        <button data-testid="toList">Go Home</button>
      </Link>
      <div className="movie-details-content">
        <div className="movie-details-header">
          <h2>{movie.title}</h2>
          <img src={movie.poster} />
          <h3 className=".movie-details-genre">
            {movie.genres?.map((genre) => {
              return <p>{genre.name}</p>;
            })}
          </h3>
        </div>
        <div className="movie-details-description">
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
