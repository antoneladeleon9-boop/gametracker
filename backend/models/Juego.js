import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  plataforma: { type: String, required: true },
  genero: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  puntuacion: { type: Number, min: 1, max: 5 },
  portada: { type: String } // URL de imagen
});

export default mongoose.model("Juego", juegoSchema);
