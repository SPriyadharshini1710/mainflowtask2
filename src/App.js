import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'df6c30c7';  // Replace with your OMDb API key
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch movies without search form event (used for default fetching on component mount)
  const fetchMovies = async (term) => {
    try {
      const response = await axios.get(`${BASE_URL}&s=${term}`);
      setMovies(response.data.Search);  // OMDb API stores results in 'Search'
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    // Fetch default movies (like "superman") on page load
    fetchMovies("superman");
  }, []);  // Empty array means this effect runs once when the component mounts

  // Function to handle movie search triggered by the form
  const searchMovies = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div className="App">
      <h1>OMDb Movie Search</h1>
      {/* Search Form */}
      <form onSubmit={searchMovies}>
        <input 
          type="text" 
          placeholder="Search for a movie..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Movie List */}
      <div className="movie-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
        {movies && movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" style={{ border: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
