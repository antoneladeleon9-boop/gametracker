import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { registrar } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const ok = await registrar(nombre, email, password);

    if (ok) window.location.href = "/";
  };

  return (
    <div className="contenedor">
      <h1>Registrarse</h1>

      <form onSubmit={manejarSubmit} className="formulario-juego">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tenés cuenta?{" "}
        <a href="/" style={{ color: "#4caf50" }}>Iniciar sesión</a>
      </p>
    </div>
  );
}
