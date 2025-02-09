
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner, Button, Card, TextInput, Label, Alert } from "flowbite-react";

import { authService } from "../services/authService";
import { SessionContext } from "../SessionContext/SessionContext";

export function Login(): JSX.Element {
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reseta erros anteriores
    setSuccess(""); // Reseta mensagens anteriores

    try {
      // 📌 Agora estamos usando `authService.login()`
      const responseData = await authService.login(email, password);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 shadow-lg">
        <h3 className="text-center font-bold text-xl mb-4 text-gray-800">Log In</h3>

        {/* 📌 Exibe mensagens de erro/sucesso */}
        {error && <Alert color="failure">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        {/* 📌 Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLFormElement>) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" gradientDuoTone="purpleToBlue" className="w-full" disabled={isLoading}>
            {isLoading && <Spinner size="sm" className="mr-2" />}
            Sign In
          </Button>
        </form>

        <div className="flex justify-between mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
          <Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link>
        </div>
      </Card>
    </div>
  );
}
