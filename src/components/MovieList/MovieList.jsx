import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const getAMovie = (movie) => {
    dispatch({
      type: 'FETCH_MOVIE',
      payload: movie,
    });
    history.push(`/details/${movie.id}`);
  };

  return (
    <>
      <h1>MovieList</h1>
      <div className="movies">
        {movies.map((movie) => {
          return (
            <div data-testid="movieItem" key={movie.id}>
              <h3>{movie.title}</h3>
              <img
                data-testid="toDetails"
                onClick={() => getAMovie(movie)}
                src={movie.poster}
                alt={movie.title}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MovieList;
