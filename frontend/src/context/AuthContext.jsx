import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // 🔹 Registrar nuevo usuario
  const registrar = async (nombre, email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Registro exitoso. Ahora podés iniciar sesión.");
      } else {
        alert(`❌ Error: ${data.mensaje || "No se pudo registrar."}`);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  };

  // 🔹 Iniciar sesión
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setUsuario({ nombre: data.nombre });
        alert("✅ Sesión iniciada correctamente.");
      } else {
        alert(`❌ ${data.mensaje || "Error en las credenciales."}`);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  };

  // 🔹 Cerrar sesión
  const logout = () => {
    setUsuario(null);
    setToken("");
    localStorage.removeItem("token");
    alert("👋 Sesión cerrada.");
  };

  // 🔹 Verificar si hay sesión activa al cargar
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    if (tokenGuardado) {
      setToken(tokenGuardado);
      setUsuario({ nombre: "Usuario activo" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, registrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
