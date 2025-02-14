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
    <div className="relative min-h-screen">
      {/* Imagem de fundo fixa */}
      <div
        className="fixed inset-0 w-full h-full z-[-1]"
        style={{
          backgroundImage: "url('/movie-background.jpg')", // Caminho correto da imagem
          backgroundSize: "1800px 100%", /* cover */
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4, // Ajuste para um fundo sutil
        }}
      ></div>
  
      {/* Conteúdo principal */}
      <div className="p-6 max-w-6xl mx-auto text-white relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🎬 My Watchlist</h1>
  
        {/* Filtro por status */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-semibold text-gray-800">Filter by:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "All" | "To Watch" | "Watched")}
            className="rounded-lg border border-gray-600 bg-gray-800 p-2 text-white"
          >
            <option value="All">All</option>
            <option value="To Watch">To Watch</option>
            <option value="Watched">Watched</option>
          </select>
        </div>
  
        <ul className="mt-4 space-y-4">
          {movies.length === 0 ? (
            <p className="text-gray-400">No movies found in your watchlist.</p>
          ) : (
            movies.map((userMovie) => (
              <li
                key={userMovie.movie.id}
                className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
              >
                <div className="text-lg">
                  <strong>{userMovie.movie.title}</strong> - {userMovie.movie.genre} - <span className="text-gray-400">{userMovie.status}</span>
                </div>
                <div className="flex gap-4 mt-2 md:mt-0">
                  <Button
                    onClick={() => handleUpdateStatus(userMovie.movieId, userMovie.status)}
                    className="rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-300"

                   /*  "rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-200" */
                  >
                    {userMovie.status === "To Watch" ? "Mark as Watched" : "Mark as To Watch"}
                  </Button>
                  <Button
                    onClick={() => handleRemoveMovie(userMovie.movieId)}
                    className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    🗑️ Remove
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
  
};

export default Browse;
