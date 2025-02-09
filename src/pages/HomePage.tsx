import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../services/movieService";

interface Movie {
  id: number;
  title: string;
  genre: string;
  status: string;
  rating?: number;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const moviesData = await getMovies();
      if (moviesData) setMovies(moviesData);
    }
    fetchMovies();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteMovie(id);
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div>
      <h1>🎬 My Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> - {movie.genre} - {movie.status}
            <button onClick={() => handleDelete(movie.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
