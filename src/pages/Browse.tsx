import { useEffect, useState, useContext } from "react";
import { userMovieService } from "../services/userMovieService";
import { SessionContext } from "../SessionContext/SessionContext";
import { Button } from "flowbite-react";

interface UserMovie {
  id: number;
  movieId: number;
  status: "To Watch" | "Watched";
  rating?: number;
  movie: {
    id: number;
    title: string;
    genre: string;
  };
}

const Browse = () => {
  const { token, tokenPayload } = useContext(SessionContext) ?? {};
  const [movies, setMovies] = useState<UserMovie[]>([]);
  const [filter, setFilter] = useState<"All" | "To Watch" | "Watched">("All");

  const userId: number | undefined = tokenPayload?.id;

  useEffect(() => {
    async function fetchUserMovies() {
      if (!token || !userId) return;

      try {
        let moviesData = await userMovieService.getUserWatchlist(userId, token);
        if (filter !== "All") {
          moviesData = moviesData.filter((m) => m.status === filter);
        }
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    }
    
    fetchUserMovies();
  }, [filter, token, tokenPayload?.id]); 

  // Alterna entre "To Watch" e "Watched"
  const handleUpdateStatus = async (movieId: number, currentStatus: "To Watch" | "Watched") => {
    if (!token) return;

    const newStatus = currentStatus === "To Watch" ? "Watched" : "To Watch";

    try {
      await userMovieService.updateMovieStatus(movieId, newStatus, token);
      setMovies(movies.map((movie) => 
        movie.movieId === movieId ? { ...movie, status: newStatus } : movie
      ));
    } catch (error) {
      console.error("Error updating movie status:", error);
    }
  };

  // Remove um filme da watchlist
  const handleRemoveMovie = async (movieId: number) => {
    if (!token) return;

    try {
      await userMovieService.removeFromWatchlist(movieId, token);
      setMovies(movies.filter((movie) => movie.movieId !== movieId));
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">🎬 My Watchlist</h1>

      {/* Filtro por status */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "All" | "To Watch" | "Watched")}
          className="rounded border p-2"
        >
          <option value="All">All</option>
          <option value="To Watch">To Watch</option>
          <option value="Watched">Watched</option>
        </select>
      </div>

      <ul className="mt-4">
        {movies.length === 0 ? (
          <p>No movies found in your watchlist.</p>
        ) : (
          movies.map((userMovie) => (
            <li key={userMovie.movie.id} className="flex items-center justify-between border-b p-2">
              <div>
                <strong>{userMovie.movie.title}</strong> - {userMovie.movie.genre} - {userMovie.status}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleUpdateStatus(userMovie.movieId, userMovie.status)} color="blue">
                  {userMovie.status === "To Watch" ? "Mark as Watched" : "Mark as To Watch"}
                </Button>
                <Button onClick={() => handleRemoveMovie(userMovie.movieId)} color="red">
                  🗑️ Remove
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Browse;
