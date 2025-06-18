import React, { useEffect, useState, useMemo } from 'react';
import { fetchPopularMovies, fetchMovieDetails, fetchGenres } from './api/tmdbService';
import { useTheme } from './context/ThemeContext';

import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import LoadingSpinner from './components/LoadingSpinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { theme } = useTheme(); 

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [popularMovies, genreList] = await Promise.all([
          fetchPopularMovies(),
          fetchGenres(),
        ]);
        setMovies(popularMovies);
        setGenres(genreList);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialData();
  }, []);

  const handleSelectMovie = async (id) => {
    setIsLoading(true);
    try {
      const details = await fetchMovieDetails(id);
      setSelectedMovie(details);
      window.scrollTo(0, 0);
    } catch (err) {
      setError("Failed to fetch movie details.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        return selectedGenre ? movie.genre_ids.includes(parseInt(selectedGenre)) : true;
      })
      .filter((movie) => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
  }, [movies, selectedGenre, searchQuery]);


  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-danger mt-5 fs-4">{error}</p>;

    if (selectedMovie) {
      return <MovieDetail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />;
    }
    
    return (
      <div className="row">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelectMovie={handleSelectMovie} />
          ))
        ) : (
          <p className="text-center text-muted mt-5">No movies match your criteria.</p>
        )}
      </div>
    );
  };
  
  return (
    <div data-bs-theme={theme} className="app-container min-vh-100">
      <div className="container py-4">
        <Header
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;