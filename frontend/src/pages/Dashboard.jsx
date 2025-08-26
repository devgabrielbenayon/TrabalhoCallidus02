// src/pages/Dashboard.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Checkbox,
  FormControlLabel,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  CheckCircle,
  ListAlt,
  HourglassBottom,
  Notifications,
  Settings,
  Menu,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom"; // 👈 import para navegação

import "./dashboard.css"; // mantém o css

const dataBar = [
  { name: "S", value: 6 },
  { name: "T", value: 2 },
  { name: "Q", value: 3 },
  { name: "Q", value: 4 },
  { name: "S", value: 6 },
  { name: "S", value: 5 },
  { name: "D", value: 4 },
];

export default function Dashboard() {
  const navigate = useNavigate(); // 👈 hook de navegação

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ bgcolor: "#fff", color: "black", boxShadow: 1 }}
      >
        <Toolbar>
          <IconButton edge="start">
            <Menu />
          </IconButton>
          <IconButton>
            <Notifications color="primary" />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
          >
            POMODORO APP
          </Typography>
          <IconButton>
            <Settings color="primary" />
          </IconButton>
          <Avatar src="https://via.placeholder.com/40" />
        </Toolbar>
      </AppBar>

      {/* Layout principal */}
      <Box className="dash-main" sx={{ p: 3 }}>
        {/* Coluna Esquerda */}
        <div className="dash-left">
          <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
            <CardContent>
              <CheckCircle fontSize="large" />
              <Typography variant="subtitle1">
                CICLOS DE POMODORO CONCLUÍDOS HOJE
              </Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
            <CardContent>
              <ListAlt fontSize="large" />
              <Typography variant="subtitle1">
                TAREFAS CONCLUÍDAS HOJE
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
            <CardContent>
              <HourglassBottom fontSize="large" />
              <Typography variant="subtitle1">
                TEMPO TOTAL DE FOCO HOJE (MIN)
              </Typography>
              <Typography variant="h4">120</Typography>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: "#40E0D0", borderRadius: 3 }}>
            <CardContent>
              <HourglassBottom fontSize="large" />
              <Typography variant="subtitle1">
                TEMPO PRODUTIVO SEMANA (MIN)
              </Typography>
              <Typography variant="h4">840</Typography>
            </CardContent>
          </Card>
        </div>

        {/* Gap central */}
        <div className="dash-gap" />

        {/* Coluna Direita */}
        <div className="dash-right">
          <Card
            className="big-card"
            sx={{
              borderRadius: 4,
              p: 3,
              bgcolor: "#40E0D0",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Cronômetro e checkboxes */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              {/* Cronômetro */}
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <Typography variant="h3">25:00</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 1,
                      bgcolor: "#000",
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    INICIAR
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#000",
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    PAUSAR
                  </Button>
                </Box>
              </Box>

              {/* Checkboxes */}
              <Box sx={{ flex: 1 }}>
                <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    TAREFA ATUAL
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Estudar"
                    />
                    <FormControlLabel control={<Checkbox />} label="Leitura" />
                    <FormControlLabel control={<Checkbox />} label="Academia" />
                  </Box>

                  {/* 👇 Botão agora navega para o Kanban */}
                  <Button
                    onClick={() => navigate("/kanban")}
                    sx={{
                      mt: 2,
                      bgcolor: "#000",
                      color: "#fff",
                      borderRadius: 3,
                      width: "100%",
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    VISUALIZAR TAREFAS
                  </Button>
                </Card>
              </Box>
            </Box>

            {/* Gráfico */}
            <Card sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                PRODUTIVIDADE SEMANAL
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataBar}>
                  <Bar dataKey="value" fill="#00C49F" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Card>
        </div>
      </Box>
    </Box>
  );
}
