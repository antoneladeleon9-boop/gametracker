import express from "express";
import Juego from "../models/Juego.js";

const router = express.Router();

// 📋 Obtener todos los juegos
router.get("/", async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los juegos" });
  }
});

// ➕ Agregar un nuevo juego
router.post("/", async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.json({ mensaje: "Juego agregado con éxito", juego: nuevoJuego });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al agregar juego" });
  }
});

// ✏️ Editar un juego
router.put("/:id", async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(juego);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al editar juego" });
  }
});

// 🗑️ Eliminar un juego
router.delete("/:id", async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar juego" });
  }
});

export default router;
