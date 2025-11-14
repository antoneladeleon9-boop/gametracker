import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormularioJuego from "../components/FormularioJuego";
import TarjetaJuego from "../components/TarjetaJuego";
import "../App.css";

export default function Inicio() {
  const { usuario, logout } = useAuth();
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const res = await fetch("http://localhost:5000/api/juegos");
      const data = await res.json();
      setJuegos(data);
    };
    cargar();
  }, []);

  return (
    <div className="contenedor">
      <h1>GameTracker</h1>
      <p>Bienvenido/a, {usuario?.nombre}</p>

      <button onClick={logout} style={{ marginBottom: 20 }}>
        Cerrar Sesión
      </button>

      <FormularioJuego
        onAgregar={async (juegoNuevo) => {
          try {
            const res = await fetch("http://localhost:5000/api/juegos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(juegoNuevo),
            });
            const data = await res.json();

            // Actualiza el estado usando función para evitar problemas
            setJuegos(prevJuegos => [...prevJuegos, data]);
          } catch (error) {
            console.error("Error al agregar juego:", error);
          }
        }}
      />

      <div className="lista-juegos">
        {juegos.map((juego) => (
          <TarjetaJuego
            key={juego._id}
            juego={juego}
            onEliminar={(id) =>
              setJuegos(prevJuegos =>
                prevJuegos.filter(j => j._id !== id)
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
