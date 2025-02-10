import { useContext } from "react";
import { SessionContext } from "../SessionContext/SessionContext";
import { Navigate } from "react-router-dom";

interface AnonymousRouteProps {
  children: React.ReactNode; // Define que `children` pode receber qualquer elemento React
}

const AnonymousRoute = ({ children }: AnonymousRouteProps): JSX.Element => {
 
  const session = useContext(SessionContext);

  if (!session) {
    return <h2>Loading...</h2>;
  }

  const { isAuthenticated, isLoading } = session;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  // Se o usuário não estiver autenticado, renderiza os componentes filhos normalmente
  return <>{children}</>;
};

export default AnonymousRoute;