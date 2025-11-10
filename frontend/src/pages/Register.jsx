import { useState } from "react";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("Usuario registrado con éxito ✅");
        setNombre("");
        setEmail("");
        setPassword("");
      } else {
        setMensaje(data.mensaje || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit} className="auth-form">
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
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
