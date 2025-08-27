import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Kanban from "../pages/Kanban";
import Pomodoro from "../pages/Pomodoro";
import Produtividade from "../pages/Produtividade";
import GerenciarTarefas from "../pages/GerenciarTarefas";
import ConfigConta from "../pages/ConfigConta"; // <- import da nova página
import Layout from "../components/Layout";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Rotas privadas */}
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
        path="/produtividade"
        element={
          <PrivateRoute>
            <Layout>
              <Produtividade />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/configuracoes"
        element={
          <PrivateRoute>
            <Layout>
              <ConfigConta /> {/* <- página de configurações */}
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Página não encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
