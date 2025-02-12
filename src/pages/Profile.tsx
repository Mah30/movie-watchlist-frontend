import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../../src/SessionContext/SessionContext";
import { userMovieService } from "../../src/services/userMovieService";
import { Button } from "flowbite-react";
import MoviesPage from "./MoviesPage";


/* interface UserMovie {
  id: number;
  movieId: number;
  status: "To Watch" | "Watched";
  rating?: number;
  movie: {
    id: number;
    title: string;
    genre: string;
  };
} */

const Profile = () => {
  const { token, tokenPayload } = useContext(SessionContext) ?? {};
/* 
  const [movies, setMovies] = useState<UserMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); */

/*   // Buscar os filmes da watchlist do usuário autenticado
  const fetchUserMovies = async () => {
    if (!token || !tokenPayload) return;
    const data = await userMovieService.getUserWatchlist(tokenPayload.id, token);


    setLoading(true);
    try {
      const data = await userMovieService.getUserWatchlist(tokenPayload.id, token);
      setMovies(data.slice(0, 8)); // Exibir no máximo 8 filmes
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      setError("Failed to load watchlist. Please try again.");
    } finally {
      setLoading(false);
    }
  }; */

  // Atualizar o status do filme para "To Watch" ou "Watched"
/*   const toggleMovieStatus = async (movieId: number, currentStatus: "To Watch" | "Watched") => {
  if (!token) return;

  if (typeof movieId !== "number") {
    console.error("Error: movieId is not a number", movieId);
    return;
  }

  const newStatus = currentStatus === "To Watch" ? "Watched" : "To Watch";

  try {
    const updatedMovie = await userMovieService.updateMovieStatus(movieId, newStatus, token);
    if (updatedMovie) {
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.movieId === movieId ? { ...movie, status: newStatus } : movie
        )
      );
    }
  } catch (error) {
    console.error("Error updating movie status:", error);
  }
}; */


/*   useEffect(() => {
    fetchUserMovies();
  }, []);

  if (loading) return <p className="text-gray-700">Loading movies...</p>;
  if (error) return <p className="text-red-500">{error}</p>; */

  return (
    <div className="max-w-6xl mx-auto p-6">
      <MoviesPage />
      {/* <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Movie Watchlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((userMovie) => (
          <div key={userMovie.movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`https://via.placeholder.com/300x200?text=${userMovie.movie.title}`}
              alt={userMovie.movie.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{userMovie.movie.title}</h3>
              <p className="text-gray-600 text-sm">{userMovie.movie.genre}</p>
              <p className={`text-sm ${userMovie.status === "Watched" ? "text-green-500" : "text-blue-500"}`}>
                {userMovie.status}
              </p>
              <Button
                color="blue"
                onClick={() => toggleMovieStatus(userMovie.movieId, userMovie.status)}
                className="mt-2 w-full"
              >
                {userMovie.status === "To Watch" ? "Mark as Watched" : "Mark as To Watch"}
              </Button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Profile;