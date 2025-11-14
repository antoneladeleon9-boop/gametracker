import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Registrar usuario
  const registrar = async (nombre, email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();
      return res.ok;
    } catch (error) {
      console.error("Error al registrar:", error);
      return false;
    }
  };

  // Login usuario
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("DATA LOGIN:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUsuario({ nombre: data.nombre || "Usuario" });
        return true;
      } else {
        alert(data.mensaje || "Credenciales incorrectas");
        return false;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    setToken("");
  };

  // Mantener login
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

export const useAuth = () => useContext(AuthContext);
