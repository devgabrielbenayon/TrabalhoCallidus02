// src/pages/Kanban.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Menu,
  Notifications,
  Settings,
  CheckBoxOutlineBlank,
  CheckBox,
} from "@mui/icons-material";

export default function Kanban() {
  const userAvatar = "https://via.placeholder.com/40";

  const tasks = {
    pending: [
      { id: 1, title: "ESTUDOS", date: "25/08/2025", time: "12:15" },
      { id: 2, title: "LEITURA DIÁRIA", date: "25/08/2025", time: "18:00" },
      { id: 3, title: "ACADEMIA", date: "25/08/2025", time: "15:45" },
    ],
    inProgress: [{ id: 4, title: "ESTUDO FINANÇAS", date: "25/08/2025", time: "11:00" }],
    done: [
      { id: 5, title: "MEDITAÇÃO", date: "25/08/2025", time: "07:00" },
      { id: 6, title: "CAFÉ", date: "25/08/2025", time: "08:00" },
      { id: 7, title: "PLANEJAMENTO", date: "25/08/2025", time: "09:00" },
    ],
  };

  const renderTaskCard = (task, done = false) => (
    <Card key={task.id} sx={{ bgcolor: "#40E0D0", borderRadius: 3, width: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            {done ? <CheckBox sx={{ color: "black" }} /> : <CheckBoxOutlineBlank sx={{ color: "black" }} />}
            <Typography sx={{ fontWeight: "bold" }}>{task.title}</Typography>
          </Box>
          <Typography variant="body2">{task.date}</Typography>
          <Typography variant="body2">{task.time}</Typography>
        </Box>
        <Avatar src={userAvatar} />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#fff", color: "black", boxShadow: 1 }}>
        <Toolbar>
          <IconButton edge="start"><Menu /></IconButton>
          <IconButton><Notifications color="primary" /></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
            POMODORO APP
          </Typography>
          <IconButton><Settings color="primary" /></IconButton>
          <Avatar src={userAvatar} />
        </Toolbar>
      </AppBar>

      {/* Wrapper do container branco */}
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          p: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* CONTAINER BRANCO – ocupa 100% */}
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            p: { xs: 2, md: 4 },
          }}
        >
          {/* BOARD EM 3 COLUNAS IGUAIS – ocupa 100% da largura */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 3,
              width: "100%",
            }}
          >
            {/* Coluna PENDENTE */}
            <Box sx={{ display: "grid", gridAutoRows: "min-content", gap: 2 }}>
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
                PENDENTE
              </Typography>
              {tasks.pending.map(renderTaskCard)}
            </Box>

            {/* Coluna EM PROGRESSO */}
            <Box sx={{ display: "grid", gridAutoRows: "min-content", gap: 2 }}>
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
                EM PROGRESSO
              </Typography>
              {tasks.inProgress.map(renderTaskCard)}
            </Box>

            {/* Coluna CONCLUÍDAS */}
            <Box sx={{ display: "grid", gridAutoRows: "min-content", gap: 2 }}>
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
                CONCLUÍDAS
              </Typography>
              {tasks.done.map((t) => renderTaskCard(t, true))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
