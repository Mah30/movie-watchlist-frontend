import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";
import { authService } from "../services/authService"; // Para obter o token do usuário

interface Movie {
  id: number;
  title: string;
  genre: string;
  status: "To Watch" | "Watched";
  rating?: number;
  userId: number;
}

const Browse = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<"All" | "To Watch" | "Watched">("All");

  const token = authService.getToken(); // Obtém o token do usuário autenticado

  useEffect(() => {
    async function fetchMovies() {
      try {
        let moviesData: Movie[] = [];
        if (filter === "All") {
          moviesData = await movieService.getMovies();
        } else {
          moviesData = await movieService.getMoviesByStatus(filter);
        }
        setMovies(moviesData);
      } catch (error) {
        console.error("Error when searching for movies:", error);
      }
    }
    fetchMovies();
  }, [filter]); // Atualiza a lista ao mudar o filtro

  const handleDelete = async (id: number) => {
    if (!token) {
      alert("You need to be logged in to delete a movie.");
      return;
    }
    try {
      await movieService.deleteMovie(id, token);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🎬 My Movie List</h1>

      {/* Filtro por status */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filtered by:</label>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "All" | "To Watch" | "Watched")
          }
          className="rounded border p-2"
        >
          <option value="All">All</option>
          <option value="To Watch">To Watch</option>
          <option value="Watched">Watched</option>
        </select>
      </div>

      <ul className="mt-4">
        {movies.length === 0 ? (
          <p>No movie found</p>
        ) : (
          movies.map((movie) => (
            <li
              key={movie.id}
              className="flex items-center justify-between border-b p-2"
            >
              <div>
                <strong>{movie.title}</strong> - {movie.genre} - {movie.status}
              </div>
              {token && (
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-700"
                >
                  🗑️ Delete
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Browse;

{
  /* <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="mt-2 p-2 bg-gray-100 rounded">
            {movie.title} - {movie.watched ? "Watched" : "To Watch"}
          </li>
        ))}
      </ul> */
}
