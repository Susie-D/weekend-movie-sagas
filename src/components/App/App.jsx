import { Route } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MoviesDetails from '../MovieDetails/MovieDetails';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const movie = useSelector((store) => store.movie);

  let Background = movie.poster;

  let backgroundStyle = {
    backgroundImage: 'url(' + { Background } + ')',
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1>The Movies Saga!</h1>

      <Route path="/" exact>
        <MovieList />
      </Route>

      <Route path="/details">
        <MoviesDetails />
      </Route>

      <Route path="/add-movie">{/* ADD MOVIE */}</Route>
    </div>
  );
}

export default App;
