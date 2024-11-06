import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

function App() {
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const movies = await getMovieList();
      setPopularMovie(movies);
    };
    fetchMovie();
  }, []);

  const search = async (q) => {
    if (q.length > 0) {
      const results = await searchMovie(q);
      setPopularMovie(results);
    } else {
      const movies = await getMovieList();
      setPopularMovie(movies);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Movie Maniac</h1>
          <input
            placeholder="Cari Film..."
            className="Movie-search"
            onChange={({ target }) => search(target.value)}
          />
          <div className="Movie-container">
            {popularMovie.map((movie) => (
              <div className="Movie-wrapper" key={movie.id}>
                <div className="Movie-title">{movie.title}</div>
                <img
                  className="Movie-image"
                  src={`${import.meta.env.VITE_BASEIMGURL}${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="Movie-date">{movie.release_date}</div>
                <div className="Movie-rate">{movie.vote_average}/10</div>
              </div>
            ))}
          </div>
        </header>
      </div>
    </>
  );
}
export default App;
