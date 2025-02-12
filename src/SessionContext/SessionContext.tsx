import { createContext, useEffect, useState, ReactNode } from "react";
import api from "../services/api"; 



// Define a estrutura do contexto de autenticação

interface TokenPayload {
  id: number;
  isAdmin: boolean;
}

interface SessionContextType {
  token: string | null;
  setToken: (token: string) => void;
  tokenPayload: TokenPayload | null; /* tokenPayload: Record<string, unknown>; */
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextType | /* undefined>(undefined) */ null>(null);

// Define as `props` do `SessionContextProvider`
interface SessionContextProviderProps {
  children: ReactNode;
}

const SessionContextProvider = ({ children }: SessionContextProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verifica se o token é válido
  const verifyToken = async (tokenToVerify: string): Promise<void> => {
    try {
      const response = await api.get("/auth/verify", {
        headers: { Authorization: `Bearer ${tokenToVerify}` },
      });

      if (response.status === 200) {
        replaceToken(tokenToVerify);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

 
  const replaceToken = (newToken: string): void => {
    setToken(newToken);
    setTokenPayload(JSON.parse(atob(newToken.split(".")[1])));
    setIsAuthenticated(true);
  };


  useEffect(() => {
    const storageToken = localStorage.getItem("authToken");

    if (storageToken) {
      verifyToken(storageToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);



  // Função de logout
  const logout = (): void => {
    setToken(null);
    setTokenPayload(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken: replaceToken,
        tokenPayload,
        isAuthenticated,
        isLoading,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
