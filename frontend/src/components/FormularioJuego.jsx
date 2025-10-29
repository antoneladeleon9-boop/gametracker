import { useEffect, useState } from "react";

export default function FormularioJuego({ onAgregar, onEditar, juegoEditando }) {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [portada, setPortada] = useState("");

  useEffect(() => {
    if (juegoEditando) {
      setTitulo(juegoEditando.titulo);
      setPlataforma(juegoEditando.plataforma);
      setGenero(juegoEditando.genero);
      setPortada(juegoEditando.portada);
    } else {
      setTitulo("");
      setPlataforma("");
      setGenero("");
      setPortada("");
    }
  }, [juegoEditando]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!titulo || !plataforma || !genero || !portada) return;

    const nuevoJuego = {
      _id: juegoEditando?._id,
      titulo,
      plataforma,
      genero,
      portada,
    };

    if (juegoEditando) {
      onEditar(nuevoJuego);
    } else {
      onAgregar(nuevoJuego);
    }

    setTitulo("");
    setPlataforma("");
    setGenero("");
    setPortada("");
  };

  return (
    <form className="formulario-juego" onSubmit={manejarEnvio}>
      <h2>{juegoEditando ? "✏️ Editar juego" : "🎮 Agregar nuevo juego"}</h2>
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
      <button type="submit">{juegoEditando ? "Guardar cambios" : "Agregar"}</button>
    </form>
  );
}
