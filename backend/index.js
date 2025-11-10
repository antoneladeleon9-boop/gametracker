import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import juegosRoutes from "./routes/juegos.js";
import resenasRoutes from "./routes/resenas.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((error) => console.error("❌ Error al conectar MongoDB:", error));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/juegos", juegosRoutes);
app.use("/api/resenas", resenasRoutes);

app.get("/", (req, res) => {
  res.send("Servidor GameTracker funcionando correctamente ✅");
});

app.listen(PORT, () => console.log(`🟢 Servidor corriendo en puerto ${PORT}`));
