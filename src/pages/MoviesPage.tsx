import { useContext, useEffect, useState } from "react";
import { Movie, movieService } from "../services/movieService";/* 
import { useAuth } from "../context/AuthContext"; */
import { SessionContext } from "../SessionContext/SessionContext";
import { userMovieService } from "../services/userMovieService";

const MoviesPage = () => {
  const { tokenPayload: user, token } = useContext(SessionContext) ?? {};
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movieService.getMovies().then(setMovies);
  }, []);

  const handleAddMovie = async () => {
    if (!token) return;
    if (!user?.isAdmin) return alert("Only admins can add movies!");
    
    const newMovie = { title: "New Movie", genre: "Drama" };
    await movieService.addMovie(newMovie, token);
    setMovies(await movieService.getMovies()); // Atualiza lista
  };

  const handleDeleteMovie = async (movieId: number) => {
    if (!token) return;
    if (!user?.isAdmin) return alert("Only admins can delete movies!");
    
    await movieService.deleteMovie(movieId, token);
    setMovies(await movieService.getMovies());
  };

  const handleSelectMovie = async (movieId: number) => {
    if (!token) {
      console.warn("No token found");
      return;
    }
  
    try {
      await userMovieService.addToWatchlist(movieId, token);
      alert("✅ Movie added to your watchlist successfully!");
    } catch (error: any) {
      console.error("Error adding movie to watchlist:", error);
      alert("❌ This movie is already in your watchlist.");
    }
  };
  

  return (
    <div>
      <h2>All Movies</h2>
      {user?.isAdmin && <button onClick={handleAddMovie}>Add Movie</button>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.genre})
            {user?.isAdmin ? <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button> : <button className="bg-yellow-50 border-green-400 border rounded p-1" onClick={() => handleSelectMovie(movie.id)}>Add to Watchlist</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
