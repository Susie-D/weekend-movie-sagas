import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    })
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchAMovie(action) {
  try {
    const fetchedMovie = yield axios.get(`/api/movies/${action.payload.id}`);
    yield put({
      type: 'SET_MOVIE',
      payload: fetchedMovie.data
    })
  } catch (err) {
    console.log('fetchAMovie error', err)
  }
}

function* fetchAllGenres() {
  try {
    const genresResponse = yield axios.get('/api/genres');
    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data
    })
  } catch (err) {
    console.log('fetchAllGenre error', err)
  }
}

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_MOVIE', fetchAMovie);
  yield takeEvery('FETCH_GENRES', fetchAllGenres);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store a movie returned from the server
const movie = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIE':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movie,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
