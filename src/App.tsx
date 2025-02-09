/* import { DarkThemeToggle } from "flowbite-react"; */
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "../src/components/Navbar";
import { authService } from "./services/auth";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
     {/*  <h1 className="text-2xl dark:text-white">White/dark</h1> */}
      {/* <DarkThemeToggle /> */}
      <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authService.isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={authService.isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </div>

    </main>
  );
}

export default App;
