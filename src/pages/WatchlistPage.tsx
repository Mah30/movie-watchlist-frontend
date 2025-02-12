/* import { useEffect, useState } from "react";
import { userMovieService } from "../services/userMovieService";
import { useAuth } from "../context/AuthContext";

const WatchlistPage = () => {
  const { user, token } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      userMovieService.getUserWatchlist(user.id, token).then(setWatchlist);
    }
  }, [user, token]);

  const handleUpdateStatus = async (movieId: number, currentStatus: "To Watch" | "Watched") => {
    const newStatus = currentStatus === "To Watch" ? "Watched" : "To Watch";
    await userMovieService.updateMovieStatus(movieId, newStatus, token);
    setWatchlist(await userMovieService.getUserWatchlist(user.id, token));
  };

  const handleRemoveMovie = async (movieId: number) => {
    await userMovieService.removeFromWatchlist(movieId, token);
    setWatchlist(await userMovieService.getUserWatchlist(user.id, token));
  };

  return (
    <div>
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <ul>
          {watchlist.map((userMovie) => (
            <li key={userMovie.id}>
              {userMovie.movie.title} - {userMovie.status}
              <button onClick={() => handleUpdateStatus(userMovie.movieId, userMovie.status)}>
                Mark as {userMovie.status === "To Watch" ? "Watched" : "To Watch"}
              </button>
              <button onClick={() => handleRemoveMovie(userMovie.movieId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchlistPage; */
