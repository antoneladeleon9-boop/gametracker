import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // =========================
  // CARGAR USUARIO SI HAY TOKEN
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setUsuario(data.usuario);
      })
      .catch(() => {});
  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.ok) {
        alert(data.mensaje || "Credenciales incorrectas");
        return false;
      }

      localStorage.setItem("token", data.token);
      setUsuario(data.usuario);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // =========================
  // REGISTRO
  // =========================
  const registrar = async (nombre, email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();

      if (!data.ok) {
        alert(data.mensaje || "Error al registrar");
        return false;
      }

      localStorage.setItem("token", data.token);
      setUsuario(data.usuario);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
