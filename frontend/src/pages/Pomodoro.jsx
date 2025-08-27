import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";

export default function Pomodoro() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Estudar", completed: true },
    { id: 2, title: "Leitura", completed: false },
    { id: 3, title: "Academia", completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        p: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      {/* Cronômetro central */}
      <Box sx={{ flex: 1, minWidth: 280, textAlign: "center" }}>
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
            sx={{ mr: 1, bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
          >
            INICIAR
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
          >
            PAUSAR
          </Button>
        </Box>
      </Box>

      {/* Cards individuais de tarefas */}
      <Box sx={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 2 }}>
        {tasks.map((task) => (
          <Card key={task.id} sx={{ p: 2, borderRadius: 3, bgcolor: "#e0f7f7" }}>
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                }
                label={<Typography sx={{ fontWeight: "bold" }}>{task.title}</Typography>}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
