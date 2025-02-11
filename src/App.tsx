import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "./SessionContext/SessionContext";
import Browse from "./pages/Browse";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "../src/components/Navbar";
import { authService } from "./services/authService";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import AnonymousRoute from "./routes/AnonymousRoute";

/* import PrivateRoute from "./routes/PrivateRoute";
import MovieForm from "./components/MovieForm"; */

function App() {
  const session = useContext(SessionContext);

  if (!session || session.isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main>
      <div className="pt-20">
        <Navbar />

        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Rota Protegida - apenas usuários logados podem acessar */}
          {/* <Route path="/browse" element={<Browse /> } /> */}
          {/*  <Route path="/browse" element={authService.isAuthenticated() ? <Browse /> : <Navigate to="/login" />} /> */}{" "}
          {/* Botar esse código dentro de browse */}
          {/*   <Route path="/addmovie" element={<MovieForm />} />  */}
          <Route path="/browse" element={<Browse />} />{" "}
          {/* <PrivateRoute><Browse /></PrivateRoute> */}
          <Route
            path="/login"
            element={
              <AnonymousRoute>
                <Login />
              </AnonymousRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AnonymousRoute>
                <Signup />
              </AnonymousRoute>
            }
          />
          {/* Rotas protegidas */}
          <Route
            path="/profile"
            element={
              authService.isAuthenticated() ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} /> */}
          {/* Redireciona qualquer rota não encontrada para Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
