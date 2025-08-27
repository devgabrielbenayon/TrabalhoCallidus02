import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Criando o contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // autenticação fake só para começar
    if (email === "admin@email.com" && password === "123456") {
      setUser({ email });
      navigate("/dashboard");
    } else {
      alert("Credenciais inválidas");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir o contexto
export function useAuth() {
  return useContext(AuthContext);
}
