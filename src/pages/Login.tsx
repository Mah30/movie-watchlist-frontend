
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { authService } from "../services/authService";
import { SessionContext } from "../SessionContext/SessionContext";

const API_URL = import.meta.env.VITE_API_URL;

export function LoginPage(): JSX.Element {
  // 📌 Estados para armazenar email, senha e mensagens
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 📌 Contexto da sessão do usuário
  const session = useContext(SessionContext);
  
  // 📌 Navegação entre páginas
  const navigate = useNavigate();

  // 📌 Garante que o contexto está disponível antes de usar
  if (!session) {
    return <h2>Loading...</h2>;
  }

  // 📌 Obtém `setToken` do contexto para atualizar o estado global após login
  const { setToken } = session;

  // 📌 Manipula o envio do formulário de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reseta erros anteriores
    setSuccess(""); // Reseta mensagens anteriores

    try {
      // 📌 Faz a requisição para o backend com email e senha
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 📌 Verifica se o login foi bem-sucedido
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const responseData = await response.json();

      // 📌 Salva o token no contexto de sessão
      setToken(responseData.token);

      // 📌 Exibe mensagem de sucesso
      setSuccess("Login successful! Redirecting...");

      // 📌 Redireciona o usuário após um pequeno delay
      setTimeout(() => navigate("/profile"), 1500);

    } catch (error) {
      console.error("Error during login:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* 📌 Fundo com gradientes */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_20%,rgba(14,165,233,0.15),transparent_25%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_80%,rgba(29,78,216,0.15),transparent_25%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader>
              <div className="flex flex-col items-center space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h1>
                <p className="text-sm text-gray-400">
                  Enter your credentials to access your account
                </p>
              </div>
            </CardHeader>

            {/* 📌 Formulário de Login */}
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* 📌 Botão de Login */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign In
                </Button>

                {/* 📌 Mensagens de erro/sucesso */}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
              </CardContent>
            </form>

            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
              <Link to="/signup" className="text-sm text-gray-400 hover:text-blue-400">
                Create an account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

