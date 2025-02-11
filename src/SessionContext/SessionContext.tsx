import { createContext, useEffect, useState, ReactNode } from "react";

//Define a estrutura do contexto de autenticação
interface SessionContextType {
  token: string | null;
  setToken: (token: string) => void;
  tokenPayload: Record<string, unknown>;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

//obtem do (.env)
const API_URL = import.meta.env.VITE_API_URL;

// Define a estrutura das `props` do `SessionContextProvider`
interface SessionContextProviderProps {
  children: ReactNode; // `children` pode ser qualquer elemento React
}

const SessionContextProvider = ({
  children,
}: SessionContextProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);

  // Estado para armazenar o payload do token (dados do usuário)
  const [tokenPayload, setTokenPayload] = useState<Record<string, unknown>>({});

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const verifyToken = async (tokenToVerify: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${tokenToVerify}`,
        },
      });

      if (response.ok) {
        replaceToken(tokenToVerify);
      } else {
        localStorage.removeItem("authToken"); // Remove o token inválido do localStorage
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  const replaceToken = (newToken: string): void => {
    setToken(newToken);
    setTokenPayload(JSON.parse(atob(newToken.split(".")[1])));
    setIsAuthenticated(true);
    localStorage.setItem("authToken", newToken);
  };

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  /**
   * quando o usuário acessa o site, verifica se há um token salvo no `localStorage`.
   * Se existir, tenta validá-lo com a API (`/auth/verify`).
   */
  useEffect(() => {
    const storageToken = localStorage.getItem("authToken");

    if (storageToken) {
      verifyToken(storageToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  /**
   *  Remove o token do estado e do `localStorage`, desautenticando o usuário.
   */
  const logout = (): void => {
    setToken(null);
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
