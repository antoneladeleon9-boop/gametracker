import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginRegistro from "./components/LoginRegistro";
import FormularioJuego from "./components/FormularioJuego";
import TarjetaJuego from "./components/TarjetaJuego";
import "./App.css";

export default function App() {
  const { usuario, token, logout } = useContext(AuthContext);
  const [juegos, setJuegos] = useState([]);
  const [juegoEditando, setJuegoEditando] = useState(null);

  // 🔹 Cargar juegos del usuario logueado
  useEffect(() => {
    if (!token) return;
    const cargarJuegos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/juegos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setJuegos(data);
      } catch (error) {
        console.error("Error al cargar juegos:", error);
      }
    };
    cargarJuegos();
  }, [token]);

  // 🔹 Agregar juego
  const agregarJuego = async (nuevoJuego) => {
    try {
      const res = await fetch("http://localhost:5000/api/juegos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoJuego),
      });
      const data = await res.json();
      setJuegos([...juegos, data.juego]);
    } catch (error) {
      console.error("Error al agregar juego:", error);
    }
  };

  // 🔹 Eliminar juego
  const eliminarJuego = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/juegos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setJuegos(juegos.filter((j) => j._id !== id));
    } catch (error) {
      console.error("Error al eliminar juego:", error);
    }
  };

  // 🔹 Editar juego
  const editarJuego = async (juegoActualizado) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/juegos/${juegoActualizado._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(juegoActualizado),
        }
      );
      const data = await res.json();
      setJuegos(
        juegos.map((j) => (j._id === data.juego._id ? data.juego : j))
      );
      setJuegoEditando(null);
    } catch (error) {
      console.error("Error al editar juego:", error);
    }
  };

  if (!usuario)
    return (
      <div className="contenedor">
        <LoginRegistro />
      </div>
    );

  return (
    <div className="contenedor">
      <h1>🎮 GameTracker</h1>
      <p>Bienvenido, {usuario.nombre}</p>
      <button className="logout" onClick={logout}>
        Cerrar sesión
      </button>

      <FormularioJuego
        onAgregar={agregarJuego}
        onEditar={editarJuego}
        juegoEditando={juegoEditando}
      />

      <div className="lista-juegos">
        {juegos.length === 0 ? (
          <p>No hay juegos registrados aún.</p>
        ) : (
          juegos.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEliminar={eliminarJuego}
              onEditar={setJuegoEditando}
            />
          ))
        )}
      </div>
    </div>
  );
}
