import React, { useEffect, useState, useMemo, useCallback } from 'react';
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

  // Data State
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Pagination & Loading State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const loadNextPage = useCallback(async () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    try {
      const data = await fetchPopularMovies(currentPage + 1);
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setCurrentPage(data.page);
    } catch (err) {
      setError("Failed to load more movies.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentPage, totalPages]);


  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200;

      if (isAtBottom && !searchQuery && !selectedGenre) {
        loadNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery, selectedGenre, loadNextPage]); 

  useEffect(() => {
    const getInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [moviesData, genreList] = await Promise.all([fetchPopularMovies(1), fetchGenres()]);
        setMovies(moviesData.results);
        setCurrentPage(moviesData.page);
        setTotalPages(moviesData.total_pages);
        setGenres(genreList);
      } catch (err) {
        setError("Failed to fetch initial data.");
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
      .filter((movie) => selectedGenre ? movie.genre_ids.includes(parseInt(selectedGenre)) : true)
      .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [movies, selectedGenre, searchQuery]);


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
          {error && <p className="text-center text-danger mt-5 fs-4">{error}</p>}
          
          {selectedMovie ? (
            <MovieDetail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
          ) : (
            <div className="row">
              {filteredMovies.map((movie) => (
                <MovieCard key={`${movie.id}-${movie.release_date}`} movie={movie} onSelectMovie={handleSelectMovie} />
              ))}
            </div>
          )}

          {isLoading && movies.length > 0 && <div className="text-center mt-4"><LoadingSpinner /></div>}
          
          {!isLoading && filteredMovies.length === 0 && !error && (
             <p className="text-center text-muted mt-5">No movies found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;