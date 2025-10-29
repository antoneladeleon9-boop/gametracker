import { useEffect, useState } from "react";
import FormularioJuego from "./components/FormularioJuego";
import TarjetaJuego from "./components/TarjetaJuego";
import "./App.css";

export default function App() {
  const [juegos, setJuegos] = useState([]);

  // 🔹 Cargar juegos desde el backend
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

  // 🔹 Agregar un nuevo juego
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

  // 🔹 Eliminar un juego
  const eliminarJuego = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/juegos/${id}`, { method: "DELETE" });
      setJuegos(juegos.filter((juego) => juego._id !== id));
    } catch (error) {
      console.error("Error al eliminar juego:", error);
    }
  };

  return (
    <div className="contenedor">
      <h1>🎮 Seguimiento del juego</h1>
      <p>Tu biblioteca gamer personalizada</p>

      <FormularioJuego onAgregar={agregarJuego} />

      <div className="lista-juegos">
        {juegos.length === 0 ? (
          <p>No hay juegos registrados aún.</p>
        ) : (
          juegos.map((juego) => (
            <TarjetaJuego key={juego._id} juego={juego} onEliminar={eliminarJuego} />
          ))
        )}
      </div>
    </div>
  );
}
