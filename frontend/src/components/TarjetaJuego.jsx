export default function TarjetaJuego({ juego, onEliminar }) {
  return (
    <div className="tarjeta-juego">
      <img src={juego.portada} alt={juego.titulo} />
      <h3>{juego.titulo}</h3>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Género:</strong> {juego.genero}</p>
      <p><strong>Horas jugadas:</strong> {juego.horasJugadas || 0}</p>
      <p><strong>Completado:</strong> {juego.completado ? " Sí" : " No"}</p>
      <p><strong>Puntuación:</strong> {"⭐".repeat(juego.puntuacion || 0)}</p>

      <div className="botones">
        <button className="btn-eliminar" onClick={() => onEliminar(juego._id)}>
           Eliminar
        </button>
      </div>
    </div>
  );
}
