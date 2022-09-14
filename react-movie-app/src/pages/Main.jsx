import React, { useEffect, useState, useContext } from "react";
import Movie from "../components/Movie";
import { AuthContext } from "../context/AuthContext";

const FEATURED_API = "https://api.themoviedb.org/3/movie/550?api_key=aa915d26c9bf8c48e9e32224094ff621page=1";
// const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/movie/550?api_key=aa915d26c9bf8c48e9e32224094ff621query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    } else {
      alert("Please login to search a movie!");
    }
  };

  return (
    <>
      <form className="search" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="search"
          placeholder="Search a movie"
          onChange={handleOnChange}
        />
      </form>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;