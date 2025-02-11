import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../../src/SessionContext/SessionContext";
import { movieService } from "../../src/services/movieService";
import { Button } from "flowbite-react";

interface Movie {
  id: number;
  title: string;
  genre: string;
  status: "To Watch" | "Watched";
  rating?: number;
  userId: number;
}

const Profile = () => {


  const { token, tokenPayload } = useContext(SessionContext) ?? {};

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar os filmes do usuário autenticado
  const fetchUserMovies = async () => {
    if (!token || !tokenPayload) return;

    
    setLoading(true);
    try {
      const data = await movieService.getMovies(); // Obtém os filmes do backend
      const userMovies = data.filter((movie) => movie.userId === tokenPayload.id);
      setMovies(userMovies.slice(0, 8));
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Atualizar o status do filme para "To Watch"
  const updateToWatch = async (movieId: number) => {
    if (!token) return;

    try {
      const updatedMovie = await movieService.updateMovie(movieId, { status: "To Watch" }, token);
      if (updatedMovie !== undefined) {
        setMovies(
          movies.map((movie) => (movie.id === movieId ? updatedMovie : movie))
        );
      }
    } catch (error) {
      console.error("Error updating movie status:", error);
    }
  };

  useEffect(() => {
    fetchUserMovies();
  }, []);

  if (loading) return <p className="text-gray-700">Loading movies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Movie Watchlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`https://via.placeholder.com/300x200?text=${movie.title}`}
              alt={movie.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{movie.title}</h3>
              <p className="text-gray-600 text-sm">{movie.genre}</p>
              <p className={`text-sm ${movie.status === "Watched" ? "text-green-500" : "text-blue-500"}`}>
                {movie.status}
              </p>
              <Button
                color="blue"
                onClick={() => updateToWatch(movie.id)}
                className="mt-2 w-full"
              >
                To Watch
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

