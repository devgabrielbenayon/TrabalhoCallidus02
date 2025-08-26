import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/kanban"
        element={
          <PrivateRoute>
            <Kanban />
          </PrivateRoute>
        }
      />

      {/* Páginas da sidebar (placeholders, todas protegidas) */}
      <Route
        path="/nova-tarefa"
        element={<PrivateRoute><div style={{ padding: 24 }}>Adicionar nova tarefa</div></PrivateRoute>}
      />
      <Route
        path="/minhas-tarefas"
        element={<PrivateRoute><div style={{ padding: 24 }}>Minhas tarefas</div></PrivateRoute>}
      />
      <Route
        path="/pomodoro"
        element={<PrivateRoute><div style={{ padding: 24 }}>Pomodoro</div></PrivateRoute>}
      />
      <Route
        path="/produtividade"
        element={<PrivateRoute><div style={{ padding: 24 }}>Produtividade Detalhada</div></PrivateRoute>}
      />
      <Route
        path="/configuracoes"
        element={<PrivateRoute><div style={{ padding: 24 }}>Configurações da Conta</div></PrivateRoute>}
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
