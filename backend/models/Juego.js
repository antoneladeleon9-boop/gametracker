import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  plataforma: { type: String, required: true },
  genero: { type: String, required: true },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  puntuacion: { type: Number, default: 0 },
  portada: { type: String },
});

const Juego = mongoose.model("Juego", juegoSchema);
export default Juego;
