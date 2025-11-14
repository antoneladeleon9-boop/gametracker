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
