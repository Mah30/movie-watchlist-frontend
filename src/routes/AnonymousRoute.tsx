import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth";

// 📌 Bloqueia usuários autenticados de acessarem rotas como Login e Signup
const AnonymousRoute = () => {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AnonymousRoute;