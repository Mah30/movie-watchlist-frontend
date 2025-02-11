/* import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import CreateMovie from "./CreateMovie"; // Componente para adicionar novos filmes
import { SessionContext } from "../../src/SessionContext/SessionContext";
import { movieService } from "../../src/services/movieService";



interface Movie {
  id: number;
  title: string;
  genre: string;
  status: "To Watch" | "Watched";
  rating?: number;
  userId: number;
}

interface MoviesProps {
  isHomepage?: boolean;
  isUserSpace?: boolean;
  MovieDetails: (props: { movieData: Movie; onBack: () => void }) => JSX.Element;
}

const Movies = ({ isHomepage, isUserSpace, MovieDetails }: MoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { tokenPayload } = useContext(SessionContext);

  // Buscar filmes com `movieService`
  const fetchMovies = async () => {
    setLoading(true);
    setError(null); // Limpa erros anteriores antes de tentar carregar

    try {
      const data = await movieService.getMovies(); // Agora chamamos o serviço de API
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <p className="text-gray-700">Loading movies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const moviesToDisplay = isHomepage
    ? movies.slice(0, 3)
    : isUserSpace
    ? movies.slice(0, 2)
    : movies;

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Your Movie Watchlist</h1>

      {selectedMovie ? (
        <MovieDetails movieData={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moviesToDisplay.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://via.placeholder.com/400?text=${movie.title}`}
                alt={movie.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{movie.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{movie.genre}</p>
                <p className="text-gray-500 text-sm">{movie.status}</p>
                <div className="flex justify-end mt-4">
                  <Link to={`/movies/${movie.id}`}>
                    <Button color="blue">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {tokenPayload?.isAdmin && <CreateMovie onCreate={fetchMovies} />}
    </div>
  );
};

export default Movies; */


//cards de filmes com botões "Add to Watchlist" e "Mark as Watched".

/* import { Button } from "flowbite-react";

const MovieCard = ({ movie, onStatusChange }) => {
  return (
    <div className="card">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <Button onClick={() => onStatusChange(movie.id, "to watch")}>Add to Watchlist</Button>
      <Button onClick={() => onStatusChange(movie.id, "watched")}>Mark as Watched</Button>
    </div>
  );
};

export default MovieCard; */