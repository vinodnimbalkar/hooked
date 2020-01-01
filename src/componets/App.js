import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const respose = await fetch(MOVIE_API_URL);
    const jsonResposnse = await respose.json();
    setMovies(jsonResposnse.Search);
    setLoading(false);
  }

  const search = async searchValue => {
    setLoading(true);
    setErrorMessage(null);

    const respose = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`);
    const jsonResponse = await respose.json();
    if (jsonResponse.Response === "True") {
      setMovies(jsonResponse.Search);
      setLoading(false);
    } else {
      setErrorMessage(jsonResponse.Error);
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <Header text="Hooked" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our Movies</p>
      <div className="movies">
        {loading && !errorMessage ? (<span>loading ...</span>) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
      </div>
    </div>
  );
}

export default App;
