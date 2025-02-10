/* import api from "./api"; */

interface AuthResponse {
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch("http://localhost:5005/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }
  
    const responseData = await response.json();
    localStorage.setItem("token", responseData.token);
    return responseData;
  },

  signup: async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await fetch("http://localhost:5005/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      throw new Error("Signup failed. Please check your details.");
    }

    return await response.json(); // Returns token and user data
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
