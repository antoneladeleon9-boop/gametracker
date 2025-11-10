import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  titulo: { type: String, required: true },
  genero: { type: String },
  plataforma: { type: String },
  añoLanzamiento: { type: Number },
  desarrollador: { type: String },
  imagenPortada: { type: String },
  descripcion: { type: String },
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
});

const Juego = mongoose.model("Juego", juegoSchema);
export default Juego;
