import api from "./api";

interface AuthResponse {
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  signup: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/signup", { email, password });
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
