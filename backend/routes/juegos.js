import express from "express";
import Juego from "../models/Juego.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// 🟢 Obtener todos los juegos del usuario autenticado
router.get("/", authMiddleware, async (req, res) => {
  try {
    const juegos = await Juego.find({ usuario: req.usuario.id });
    res.json(juegos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los juegos" });
  }
});

// 🟢 Agregar un nuevo juego al usuario autenticado
router.post("/", authMiddleware, async (req, res) => {
  try {
    const nuevoJuego = new Juego({
      ...req.body,
      usuario: req.usuario.id,
    });
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar el juego" });
  }
});

// 🟢 Eliminar un juego del usuario autenticado
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const juego = await Juego.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuario.id,
    });
    if (!juego) {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    }
    res.json({ mensaje: "Juego eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el juego" });
  }
});

export default router;
