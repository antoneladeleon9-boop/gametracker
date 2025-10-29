import { useEffect, useState } from "react";
import FormularioJuego from "./components/FormularioJuego";
import TarjetaJuego from "./components/TarjetaJuego";
import "./App.css";

export default function App() {
  const [juegos, setJuegos] = useState([]);
  const [juegoEditando, setJuegoEditando] = useState(null);

  // 🔹 Cargar juegos
  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const respuesta = await fetch("http://localhost:5000/api/juegos");
        const datos = await respuesta.json();
        setJuegos(datos);
      } catch (error) {
        console.error("Error al cargar juegos:", error);
      }
    };
    cargarJuegos();
  }, []);

  // 🔹 Agregar juego
  const agregarJuego = async (nuevoJuego) => {
    try {
      const respuesta = await fetch("http://localhost:5000/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoJuego),
      });
      const datos = await respuesta.json();
      setJuegos([...juegos, datos.juego]);
    } catch (error) {
      console.error("Error al agregar juego:", error);
    }
  };

  // 🔹 Eliminar juego
  const eliminarJuego = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/juegos/${id}`, { method: "DELETE" });
      setJuegos(juegos.filter((juego) => juego._id !== id));
    } catch (error) {
      console.error("Error al eliminar juego:", error);
    }
  };

  // 🔹 Editar juego (actualizar)
  const editarJuego = async (juegoActualizado) => {
    try {
      const respuesta = await fetch(
        `http://localhost:5000/api/juegos/${juegoActualizado._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(juegoActualizado),
        }
      );
      const datos = await respuesta.json();
      setJuegos(
        juegos.map((j) => (j._id === datos.juego._id ? datos.juego : j))
      );
      setJuegoEditando(null);
    } catch (error) {
      console.error("Error al editar juego:", error);
    }
  };

  return (
    <div className="contenedor">
      <h1>🎮 Seguimiento del juego</h1>
      <p>Tu biblioteca gamer personalizada</p>

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
