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
  
    if (await userMovieService.addToWatchlist(movieId, token)) {
      alert("✅ Movie added to your watchlist successfully!");
    } else {
        alert("❌ This movie is already in your watchlist.");
        /* alert("❌ An error occurred. Please try again."); */
    }
  };
  

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">All Movies</h2>
  
      {user?.isAdmin && (
        <button
          onClick={handleAddMovie}
          className="mb-6 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Add Movie
        </button>
      )}
  
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col justify-between bg-gray-800 p-4 rounded-lg shadow-lg h-full"
          >
            <div>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-400">{movie.genre}</p>
            </div>
  
            {user?.isAdmin ? (
              <button
                onClick={() => handleDeleteMovie(movie.id)}
                className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>
            ) : (
              <button
                className="mt-4 w-full rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-200"
                onClick={() => handleSelectMovie(movie.id)}
              >
                Add to Watchlist
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
