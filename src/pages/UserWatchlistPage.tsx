/* import { useEffect, useState } from "react";
import { userMovieService } from "../services/userMovieService";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserWatchlistPage = () => {
  const { userId } = useParams(); // Pegamos o userId da URL
  const { token } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    userMovieService.getUserWatchlist(Number(userId), token).then(setWatchlist);
  }, [userId, token]);

  return (
    <div>
      <h2>Watchlist of User {userId}</h2>
      {watchlist.length === 0 ? (
        <p>No movies in this user's watchlist.</p>
      ) : (
        <ul>
          {watchlist.map((userMovie) => (
            <li key={userMovie.id}>
              {userMovie.movie.title} - {userMovie.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserWatchlistPage;
 */