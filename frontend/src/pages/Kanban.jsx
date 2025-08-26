// src/pages/Kanban.jsx
import React, { useState } from "react";
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
  Star,
  ArrowBack,
} from "@mui/icons-material";

export default function Kanban() {
  const userAvatar = "https://via.placeholder.com/40";

  const [columns, setColumns] = useState({
    pending: [
      { id: 1, title: "ESTUDOS", date: "25/08/2025", time: "12:15" },
      { id: 2, title: "LEITURA DIÁRIA", date: "25/08/2025", time: "18:00" },
      { id: 3, title: "ACADEMIA", date: "25/08/2025", time: "15:45" },
    ],
    inProgress: [
      { id: 4, title: "ESTUDO FINANÇAS", date: "25/08/2025", time: "11:00" },
    ],
    done: [
      { id: 5, title: "MEDITAÇÃO", date: "25/08/2025", time: "07:00" },
      { id: 6, title: "CAFÉ", date: "25/08/2025", time: "08:00" },
      { id: 7, title: "PLANEJAMENTO", date: "25/08/2025", time: "09:00" },
    ],
  });

  const handleAdvance = (taskId, from) => {
    setColumns((prev) => {
      const task = prev[from].find((t) => t.id === taskId);
      if (!task) return prev;

      const next = {
        pending: [...prev.pending],
        inProgress: [...prev.inProgress],
        done: [...prev.done],
      };

      next[from] = next[from].filter((t) => t.id !== taskId);
      if (from === "pending") next.inProgress = [task, ...next.inProgress];
      else if (from === "inProgress") next.done = [task, ...next.done];

      return next;
    });
  };

  const handleBack = (taskId, from) => {
    setColumns((prev) => {
      const task = prev[from].find((t) => t.id === taskId);
      if (!task) return prev;

      const next = {
        pending: [...prev.pending],
        inProgress: [...prev.inProgress],
        done: [...prev.done],
      };

      next[from] = next[from].filter((t) => t.id !== taskId);
      if (from === "inProgress") next.pending = [task, ...next.pending];
      else if (from === "done") next.inProgress = [task, ...next.inProgress];

      return next;
    });
  };

  const renderTaskCard = (task, columnKey) => {
    const isPending = columnKey === "pending";
    const isInProgress = columnKey === "inProgress";
    const isDone = columnKey === "done";

    return (
      <Card
        key={task.id}
        sx={{
          position: "relative",            // <- permite posicionar a seta no canto
          bgcolor: "#40E0D0",
          borderRadius: 3,
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 7,                         // espaço para a seta no canto
            pb: 5,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              {/* Avançar (check) */}
              {isDone ? (
                <Star sx={{ color: "black" }} />
              ) : (
                <IconButton
                  aria-label="Avançar etapa"
                  onClick={() => handleAdvance(task.id, columnKey)}
                  size="small"
                  sx={{ p: 0.5 }}
                >
                  {isPending ? (
                    <CheckBoxOutlineBlank sx={{ color: "black" }} />
                  ) : (
                    <CheckBox sx={{ color: "black" }} />
                  )}
                </IconButton>
              )}

              <Typography sx={{ fontWeight: "bold" }}>{task.title}</Typography>
            </Box>
            <Typography variant="body2">{task.date}</Typography>
            <Typography variant="body2">{task.time}</Typography>
          </Box>

          <Avatar src={userAvatar} />
        </CardContent>

        {/* Seta de voltar no canto inferior direito (não aparece em Pendente) */}
        {!isPending && (
          <IconButton
            aria-label="Voltar etapa"
            onClick={() => handleBack(task.id, columnKey)}
            size="small"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              p: 0.5,
              zIndex: 1,
            }}
          >
            <ArrowBack sx={{ color: "black" }} />
          </IconButton>
        )}
      </Card>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
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

      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          p: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            p: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 3,
              width: "100%",
            }}
          >
            <Box sx={{ display: "grid", gridAutoRows: "min-content", gap: 2 }}>
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
                PENDENTE
              </Typography>
              {columns.pending.map((t) => renderTaskCard(t, "pending"))}
            </Box>

            <Box sx={{ display: "grid", gridAutoRows: "min-content", gap: 2 }}>
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
                EM PROGRESSO
              </Typography>
              {columns.inProgress.map((t) => renderTaskCard(t, "inProgress"))}
            </Box>

            <Box sx={{ display: "grid", gridAutoRows: "min-content", gap: 2 }}>
              <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}>
                CONCLUÍDAS
              </Typography>
              {columns.done.map((t) => renderTaskCard(t, "done"))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
