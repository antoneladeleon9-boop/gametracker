import { useState, useEffect } from "react";
import axios from "axios";
import TarjetaJuego from "./components/TarjetaJuego";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    completado: false,
    puntuacion: 0,
    portada: ""
  });

  // 🔹 1. Cargar los juegos al iniciar
  useEffect(() => {
    obtenerJuegos();
  }, []);

  const obtenerJuegos = () => {
    axios
      .get("http://localhost:5000/juegos")
      .then((res) => setJuegos(res.data))
      .catch((err) => console.error("Error al obtener juegos:", err));
  };

 const guardarJuego = (e) => {
  e.preventDefault(); // evita que la página se recargue

  axios
    .post("http://localhost:5000/juegos", nuevoJuego)
    .then(() => {
      alert("🎮 Juego agregado con éxito");
      setNuevoJuego({
        titulo: "",
        plataforma: "",
        genero: "",
        completado: false,
        puntuacion: 0,
        portada: ""
      });
      obtenerJuegos(); // recargar lista
    })
    .catch((err) => console.error("Error al agregar juego:", err));
};


  const eliminarJuego = (id) => {
    axios
      .delete(`http://localhost:5000/juegos/${id}`)
      .then(() => obtenerJuegos())
      .catch((err) => console.error("Error al eliminar juego:", err));
  };

  return (
    <div className="contenedor">
      <h1>🎮 Seguimiento del juego</h1>

      {/* Formulario */}
      <form onSubmit={guardarJuego}>
        <input
          type="text"
          placeholder="Título"
          value={nuevoJuego.titulo}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, titulo: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Plataforma"
          value={nuevoJuego.plataforma}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, plataforma: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Género"
          value={nuevoJuego.genero}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, genero: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="URL de la portada"
          value={nuevoJuego.portada}
          onChange={(e) =>
            setNuevoJuego({ ...nuevoJuego, portada: e.target.value })
          }
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista de juegos */}
      {juegos.length === 0 ? (
        <p>No hay juegos registrados aún.</p>
      ) : (
        juegos.map((juego) => (
          <TarjetaJuego
            key={juego._id}
            juego={juego}
            onEliminar={eliminarJuego}
            onEditar={() => {}}
          />
        ))
      )}
    </div>
  );
}

export default App;
