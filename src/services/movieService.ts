import api from "./api";
/* import { movieStatusService } from "./movieStatusService"; */

export interface Movie {
  id: number;
  title: string;
  genre: string;

}


export const movieService = {
  // Obtém todos os filmes
  getMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get<Array<Movie>>("/movies");
      return response.data;
    } catch (error) {
      console.error("Error retrieving movies:", error);
      return [];
    }
  },

  
  // Obtém um filme global pelo ID
  getMovieById: async (movieId: number): Promise<Movie | null> => {
    try {
      const response = await api.get<Movie>(`/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving movie by ID:", error);
      return null;
    }
  },


  // Obtém filmes filtrados por status ("To Watch" ou "Watched")
  /* getMoviesByStatus: async (
    status: "To Watch" | "Watched",
  ): Promise<Movie[]> => {
    try {
      const response = await api.get<Array<Movie>>(`/movies/status/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving movies by status:", error);
      return [];
    }
  }, */


  // Adiciona um novo filme global (apenas isAdmin)
  addMovie: async (movie: Omit<Movie, "id">, token: string) => {
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
  updateMovie: async (
    movieId: number,
    movie: Partial<Movie>,
    token: string,
  ): Promise<Movie | undefined> => {
    try {
      const response = await api.put<Movie>(`/movies/${movieId}`, movie, {
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
