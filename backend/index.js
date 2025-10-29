import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import juegosRouter from "./routes/juegos.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/juegos", juegosRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(5000, () => console.log("🟢 Servidor corriendo en puerto 5000"));
  })
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));
