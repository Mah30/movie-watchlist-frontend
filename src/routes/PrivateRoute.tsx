import { useContext } from "react";
import { SessionContext } from "../SessionContext/SessionContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode; // 
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
 
  const session = useContext(SessionContext);

  if (!session) {
    return <h2>Loading...</h2>;
  }

  const { isAuthenticated, isLoading } = session;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // Se o usuário não estiver autenticado, renderiza os componentes filhos normalmente
  return <>{children}</>;
};

export default PrivateRoute;



/* const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(SessionContext)

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (!isAuthenticated) {
        return (<Navigate to = '/login' />)
    }

    return (children)
}; */