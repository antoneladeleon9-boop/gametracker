console.log("🟢 Iniciando servidor GameTracker...");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import juegosRoutes from "./routes/juegos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/juegos", juegosRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("🚀 Servidor GameTracker funcionando correctamente");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
