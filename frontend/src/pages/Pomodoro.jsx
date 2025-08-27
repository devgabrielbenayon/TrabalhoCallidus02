import React, { useState, useEffect, useRef } from "react";
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
    { id: 1, title: "Estudar", date: "27/08/2025", time: "10:00", completed: true },
    { id: 2, title: "Leitura", date: "27/08/2025", time: "14:00", completed: false },
    { id: 3, title: "Academia", date: "27/08/2025", time: "17:30", completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // CRONÔMETRO
  const [time, setTime] = useState(25 * 60); // 25 minutos
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
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
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            fontSize: "2.5rem",
          }}
        >
          <Typography variant="h2">{formatTime(time)}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setIsRunning(true)}
            sx={{ mr: 1, bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
          >
            INICIAR
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsRunning(false)}
            sx={{ mr: 1, bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
          >
            PAUSAR
          </Button>
          <Button
            variant="contained"
            onClick={() => { setIsRunning(false); setTime(25 * 60); }}
            sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}
          >
            RESET
          </Button>
        </Box>
      </Box>

      {/* Cards individuais de tarefas */}
      <Box sx={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: 2 }}>
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
                label={
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.date} | {task.time}
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
