import express from "express";
import Juego from "../models/Juego.js";

const router = express.Router();

// ✅ Obtener todos los juegos
router.get("/", async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los juegos", error });
  }
});

// ✅ Agregar un nuevo juego
router.post("/", async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.json({ mensaje: "Juego agregado con éxito", juego: nuevoJuego });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar el juego", error });
  }
});

// ✅ Editar un juego
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const juegoActualizado = await Juego.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ mensaje: "Juego actualizado", juego: juegoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el juego", error });
  }
});

// ✅ Eliminar un juego
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Juego.findByIdAndDelete(id);
    res.json({ mensaje: "Juego eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el juego", error });
  }
});

export default router;
