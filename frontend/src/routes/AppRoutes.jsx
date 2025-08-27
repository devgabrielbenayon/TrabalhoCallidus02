import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Kanban from "../pages/Kanban";
import Pomodoro from "../pages/Pomodoro";
import GerenciarTarefas from "../pages/GerenciarTarefas";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
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

      {/* Outras rotas privadas */}
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

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
