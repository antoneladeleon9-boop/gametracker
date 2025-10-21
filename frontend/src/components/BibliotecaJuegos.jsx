import TarjetaJuego from "./TarjetaJuego";

function BibliotecaJuegos({ juegos }) {
  return (
    <div className="biblioteca">
      {juegos.length === 0 ? (
        <p>No hay juegos registrados aún.</p>
      ) : (
        juegos.map((juego) => <TarjetaJuego key={juego._id} juego={juego} />)
      )}
    </div>
  );
}

export default BibliotecaJuegos;
