import { useContext } from "react";
import { movieStatusService } from "../services/movieStatusService";
import { SessionContext } from "../SessionContext/SessionContext";

interface Movie {
  id: number;
  title: string;
  genre: string;
  status: "To Watch" | "Watched";
  userId: number;
}

interface MovieCardProps {
  movie: Movie;
  onStatusUpdated: () => void;
}

const MovieCard = ({ movie, onStatusUpdated }: MovieCardProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    return <h2>Loading...</h2>;
  }

  const { token } = session; // aponta existencia do `token`

  const handleToggleStatus = async () => {
    if (!token) {
      alert("You need to be logged in to update the movie status.");
      return;
    }

    try {
      await movieStatusService.toggleMovieStatus(movie.id, movie.status, token);
      onStatusUpdated(); // Atualiza a UI após a mudança
    } catch (error) {
      console.error("Failed to update movie status:", error);
    }
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>Status: {movie.status}</p>
      <button onClick={handleToggleStatus}>
        {movie.status === "To Watch" ? "Mark as Watched" : "Mark as To Watch"}
      </button>
    </div>
  );
};

export default MovieCard;
