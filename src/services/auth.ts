export const authService = {
    login: (email: string, password: string) => {
      localStorage.setItem("user", JSON.stringify({ email, password }));
      return { email, password };
    },
  
    logout: () => {
      localStorage.removeItem("user");
    },
  
    getUser: () => {
      return JSON.parse(localStorage.getItem("user") || "null");
    },
  
    isAuthenticated: () => {
      return localStorage.getItem("user") !== null;
    },
  };