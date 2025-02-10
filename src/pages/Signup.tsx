import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner, Button, Card, TextInput, Label, Alert } from "flowbite-react";

import { authService } from "../services/authService";
import { SessionContext } from "../SessionContext/SessionContext";

export function Signup(): JSX.Element {
  
  
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

 
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // session context
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  if (!session) {
    return <h2>Loading...</h2>;
  }

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); 
    setSuccess(""); 

    try {
      // Calls signup API
      await authService.signup(firstName, lastName, email, password);

      setSuccess("Account created successfully! Redirecting...");

      // Redirect user to the profile page after a delay
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error("Error during signup:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 shadow-lg">
        <h3 className="text-center font-bold text-xl mb-4 text-gray-800">Sign Up</h3>

       
        {error && <Alert color="failure">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName" value="First Name" />
            <TextInput
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" value="Last Name" />
            <TextInput
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              required
            />
          </div>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" gradientDuoTone="purpleToBlue" className="w-full" disabled={isLoading}>
            {isLoading && <Spinner size="sm" className="mr-2" />}
            Create Account
          </Button>
        </form>

        <div className="flex justify-between mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
          <Link to="/login" className="text-blue-600 hover:underline">Already have an account? Log in</Link>
        </div>
      </Card>
    </div>
  );
}
