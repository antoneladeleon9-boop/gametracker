<<<<<<< HEAD
import './App.css';

function App() {
  return (
    <div className="container">

      <div className="left-panel">
        <div className="left-panel-content">

          {/* 🔹 TEXTO DE BIENVENIDA AHORA ESTÁ DENTRO DEL PANEL, ENCIMA DEL LOGIN */}
          <h2 className="welcome-title">Bienvenido a GameTracker</h2>
          <p className="welcome-text">Organizá y llevá el registro de tus juegos favoritos</p>
          {/* 🔹 FIN DE LA PARTE AGREGADA */}

          <h2>Iniciar Sesión</h2>

          <form>
            <input type="email" placeholder="Correo electrónico" />
            <input type="password" placeholder="Contraseña" />
            <button type="button">Iniciar sesión</button>
          </form>

          <p>
            ¿No tenés cuenta? <a href="#">Registrate</a>
          </p>
        </div>
      </div>

    </div>
  );
}

export default App;
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { usuario } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Si NO hay usuario → Ir al Login */}
        {!usuario && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Si HAY usuario → Ir al Inicio */}
        {usuario && (
          <>
            <Route path="/" element={<Inicio />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}
>>>>>>> 872d796366e0dd1445a066a94b7dadd9d6f38faa
