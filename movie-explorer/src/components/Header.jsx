import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = ({
  genres,
  selectedGenre,
  onGenreChange,
  searchQuery,
  onSearchChange,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="mb-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h1 className="fw-bolder text-info">Movie Explorer</h1>
        <button className="btn btn-outline-secondary" onClick={toggleTheme}>
          Toggle {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </div>
      <div className="mt-4 d-flex flex-column flex-md-row gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select
          className="form-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;