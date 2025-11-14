import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Inicio from "./pages/Inicio";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { usuario, login } = useAuth(); // si tu AuthContext tiene login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login) {
      login(email, password); // tu función real de login
    } else {
      alert(`Email: ${email}\nContraseña: ${password}`);
    }
    // Simular usuario para mostrar la página de Inicio
    // En tu caso, reemplaza con tu lógica real
    navigate("/inicio"); 
  };

  return (
    <Routes>
      {/* Login */}
      {!usuario && (
        <>
          <Route
            path="/"
            element={
              <div className="container">
                <div className="left-panel">
                  <div className="left-panel-content">
                    <h2 className="welcome-title">Bienvenido a GameTracker</h2>
                    <p className="welcome-text">
                      Organizá y llevá el registro de tus juegos favoritos
                    </p>

                    <h2>Iniciar Sesión</h2>

                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="button" onClick={handleLogin}>
                        Iniciar sesión
                      </button>
                    </form>

                    <p>
                      ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {/* Inicio */}
      <Route path="/inicio" element={<Inicio />} />
    </Routes>
  );
}
