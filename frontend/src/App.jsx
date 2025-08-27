// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Pomodoro from "./pages/Pomodoro";
import GerenciarTarefas from "./pages/GerenciarTarefas"; // NOVO
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
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/kanban"
        element={
          <PrivateRoute>
            <Layout>
              <Kanban />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/pomodoro"
        element={
          <PrivateRoute>
            <Layout>
              <Pomodoro />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/gerenciar-tarefas"
        element={
          <PrivateRoute>
            <Layout>
              <GerenciarTarefas />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/nova-tarefa"
        element={
          <PrivateRoute>
            <Layout>
              <div style={{ padding: 24 }}>Adicionar nova tarefa</div>
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/produtividade"
        element={
          <PrivateRoute>
            <Layout>
              <div style={{ padding: 24 }}>Produtividade Detalhada</div>
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/configuracoes"
        element={
          <PrivateRoute>
            <Layout>
              <div style={{ padding: 24 }}>Configurações da Conta</div>
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
