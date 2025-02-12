import { useContext } from "react";
import { SessionContext } from "../../src/SessionContext/SessionContext";
import { userMovieService } from "../../src/services/userMovieService";

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

interface MovieCardProps {
  movie: UserMovie; 
  onStatusUpdated: () => void;
}

const MovieCard = ({ movie, onStatusUpdated }: MovieCardProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    return <h2>Loading...</h2>;
  }

  const { token } = session; // aponta existência do `token`

  const handleToggleStatus = async () => {
    if (!token) {
      alert("You need to be logged in to update the movie status.");
      return;
    }

    try {
      await userMovieService.updateMovieStatus(movie.movieId, movie.status, token);
      onStatusUpdated(); // Atualiza a UI após a mudança
    } catch (error) {
      console.error("Failed to update movie status:", error);
    }
  };

  return (
    <div className="movie-card">
      <h3>{movie.movie.title}</h3>
      <p>{movie.movie.genre}</p>
      <p>Status: {movie.status}</p>
      <button onClick={handleToggleStatus}>
        {movie.status === "To Watch" ? "Mark as Watched" : "Mark as To Watch"}
      </button>
    </div>
  );
};

export default MovieCard;
