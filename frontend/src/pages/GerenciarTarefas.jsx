// src/pages/GerenciarTarefas.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, Add, Event } from "@mui/icons-material";

export default function GerenciarTarefas() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Estudar", date: "2025-08-25", time: "12:15" },
    { id: 2, title: "Leitura", date: "2025-08-25", time: "18:00" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", date: "", time: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.date || !newTask.time) {
      setSnackbar({ open: true, message: "Preencha todos os campos!", severity: "error" });
      return;
    }
    const taskToAdd = { ...newTask, id: Date.now() };
    setTasks([taskToAdd, ...tasks]);
    setNewTask({ title: "", date: "", time: "" });
    setSnackbar({ open: true, message: "Tarefa adicionada!", severity: "success" });
    handleCloseDialog();
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setSnackbar({ open: true, message: "Tarefa removida!", severity: "info" });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Cabeçalho */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Gerenciar Tarefas
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ bgcolor: "#40E0D0", "&:hover": { bgcolor: "#38cfc9" } }}
          onClick={handleOpenDialog}
        >
          Adicionar Tarefa
        </Button>
      </Box>

      {/* Lista de Tarefas */}
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, position: "relative" }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {task.title}
                  </Typography>
                  <IconButton color="error" onClick={() => handleDeleteTask(task.id)}>
                    <Delete />
                  </IconButton>
                </Stack>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <Event sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
                    {task.date} às {task.time}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para adicionar tarefa */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Nome da Tarefa"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Data"
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Horário"
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddTask} variant="contained" sx={{ bgcolor: "#40E0D0", "&:hover": { bgcolor: "#38cfc9" } }}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
