import "./App.css";
import { useEffect, useState } from "react";
import { getMovieList, searchMovieList } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="poster_img"
          />
          <div className="Movie-date">{movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovieList(q);
      // console.log({ q: query });
      setPopularMovies(query.results);
    }
  };

  // console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rey Movie Mania</h1>
        <input
          placeholder="cari film.."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
