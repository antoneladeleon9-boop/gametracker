function TarjetaJuego({ juego, onEliminar, onEditar }) {
  return (
    <div className={`tarjeta ${juego.completado ? "completado" : ""}`}>
      {/* Imagen del juego */}
      {juego.portada && (
        <img
          src={juego.portada}
          alt={juego.titulo}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}

      {/* Información */}
      <h3>{juego.titulo}</h3>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Género:</strong> {juego.genero}</p>
      {juego.horasJugadas && (
        <p><strong>Horas jugadas:</strong> {juego.horasJugadas}</p>
      )}
      <p><strong>Completado:</strong> {juego.completado ? "✅ Sí" : "❌ No"}</p>
      <p><strong>Puntuación:</strong> {"⭐".repeat(juego.puntuacion)}</p>

      <div className="acciones">
        <button onClick={() => onEditar(juego)}>✏️ Editar</button>
        <button onClick={() => onEliminar(juego._id)}>🗑️ Eliminar</button>
      </div>
    </div>
  );
}

export default TarjetaJuego;
