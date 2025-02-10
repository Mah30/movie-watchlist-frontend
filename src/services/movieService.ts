import api from "./api";
import { movieStatusService } from "./movieStatusService";

interface Movie {
  id: number;
  title: string;
  genre: string;
  status: "To Watch" | "Watched";
  rating?: number;
  userId: number;
}

export const movieService = {
  // Obtém todos os filmes
  getMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get("/movies");
       return response.data;
    } catch (error) {
      console.error("Error retrieving movies:", error);
      return [];
    }
  },

  // Obtém um filme pelo ID
  getMovieById: async (movieId: number): Promise<Movie | null> => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving movie by ID:", error);
      return null;
    }
  },

  // Obtém filmes filtrados por status ("To Watch" ou "Watched")
  getMoviesByStatus: async (status: "To Watch" | "Watched"): Promise<Movie[]> => {
    try {
      const response = await api.get(`/movies/status/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving movies by status:", error);
      return [];
    }
  },

  // Adiciona um novo filme (precisa de autenticação)
  addMovie: async (movie: Movie, token: string) => {
    try {
      const response = await api.post("/movies", movie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  },

  // Atualiza um filme (apenas o usuário autenticado pode editar)
  updateMovie: async (movieId: number, movie: Partial<Movie>, token: string) => {
    try {
      const response = await api.put(`/movies/${movieId}`, movie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  },

  // Deleta um filme (apenas o dono pode excluir)
  deleteMovie: async (movieId: number, token: string) => {
    try {
      await api.delete(`/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  },
};
