import axios from "axios";
import { authService } from "./authService";


const api = axios.create({
  baseURL: "http://localhost:5005/api", // Ajuste para o endereço do backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    config.headers = config.headers || {};



    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
