import { useState } from "react";

function FormularioJuego({ onAgregar }) {
  const [juego, setJuego] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!juego.titulo || !juego.plataforma || !juego.genero) {
      alert("Por favor completa todos los campos");
      return;
    }
    onAgregar(juego);
    setJuego({ titulo: "", plataforma: "", genero: "" });
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <input
        type="text"
        placeholder="Título"
        value={juego.titulo}
        onChange={(e) => setJuego({ ...juego, titulo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Plataforma"
        value={juego.plataforma}
        onChange={(e) => setJuego({ ...juego, plataforma: e.target.value })}
      />
      <input
        type="text"
        placeholder="Género"
        value={juego.genero}
        onChange={(e) => setJuego({ ...juego, genero: e.target.value })}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioJuego;
