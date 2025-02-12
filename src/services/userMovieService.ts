import api from "./api";

interface UserMovie {
  id: number;
  userId: number;
  movieId: number;
  status: "To Watch" | "Watched";
  rating?: number;
  movie: {
    id: number;
    title: string;
    genre: string;
  };
}

export const userMovieService = {
  // Obtém a watchlist de um usuário (READ )
  getUserWatchlist: async (userId: number, token: string): Promise<UserMovie[]> => {
    try {
      const response = await api.get<Array<UserMovie>>(`/user-movies/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error retrieving user watchlist:", error);
      return [];
    }
  },

  // Adiciona um filme à watchlist do usuário autenticado (CREATE)
  addToWatchlist: async (movieId: number, token: string) => {
    try {
      const response = await api.post(
        "/user-movies",
        { movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  },

  // Atualiza o status do filme na watchlist (To Watch → Watched) (UPDATE)
  updateMovieStatus: async (movieId: number, status: "To Watch" | "Watched", token: string) => {
    try {
      const response = await api.put(
        `/user-movies/${movieId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating movie status:", error);
    }
  },

  // Remove um filme da watchlist do usuário autenticado (DELETE)
  removeFromWatchlist: async (movieId: number, token: string) => {
    try {
      await api.delete(`/user-movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  },
};
