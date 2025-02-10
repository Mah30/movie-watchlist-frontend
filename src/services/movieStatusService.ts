import api from "./api";


export const movieStatusService = {
  // Alterna o status entre "To Watch" e "Watched"
  toggleMovieStatus: async (movieId: number, currentStatus: "To Watch" | "Watched", token: string) => {
    try {
      // Define novo status
      const newStatus = currentStatus === "To Watch" ? "Watched" : "To Watch";

      const response = await api.put(
        `/movies/${movieId}`,
        { status: newStatus }, // Atualiza apenas o status
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      return response.data; // Retorna o filme atualizado
    } catch (error) {
      console.error("Error updating movie status:", error);
    }
  },
};
