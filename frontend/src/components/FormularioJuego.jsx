import { useState } from "react";

export default function FormularioJuego({ onAgregar }) {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [portada, setPortada] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!titulo || !plataforma || !genero || !portada) return;
    onAgregar({ titulo, plataforma, genero, portada });
    setTitulo("");
    setPlataforma("");
    setGenero("");
    setPortada("");
  };

  return (
    <form className="formulario-juego" onSubmit={manejarEnvio}>
      <h2>🎮 Agregar nuevo juego</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Plataforma"
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
      />
      <input
        type="text"
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de la portada"
        value={portada}
        onChange={(e) => setPortada(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}
