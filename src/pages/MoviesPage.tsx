/* import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";
import { useAuth } from "../context/AuthContext";

const MoviesPage = () => {
  const { user, token } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieService.getMovies().then(setMovies);
  }, []);

  const handleAddMovie = async () => {
    if (!user?.isAdmin) return alert("Only admins can add movies!");
    
    const newMovie = { title: "New Movie", genre: "Drama" };
    await movieService.addMovie(newMovie, token);
    setMovies(await movieService.getMovies()); // Atualiza lista
  };

  const handleDeleteMovie = async (movieId: number) => {
    if (!user?.isAdmin) return alert("Only admins can delete movies!");
    
    await movieService.deleteMovie(movieId, token);
    setMovies(await movieService.getMovies());
  };

  return (
    <div>
      <h2>All Movies</h2>
      {user?.isAdmin && <button onClick={handleAddMovie}>Add Movie</button>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.genre})
            {user?.isAdmin && <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage; */
