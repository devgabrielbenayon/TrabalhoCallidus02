import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    try {
      login(email, password);
    } catch {
      setError("Credenciais inválidas");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",           // ocupa toda a altura da tela
        width: "100%",                // ocupa toda a largura
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e0f7fa",   // fundo azul
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: 3, color: "#0277bd" }}
        >
          Gerenciador de Tarefas
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 2,
              background: "linear-gradient(90deg, #5ce1e6, #5ce1e6)",
              "&:hover": {
                background: "linear-gradient(90deg, #5ce1e6, #5ce1e6)",
              },
            }}
          >
            Entrar
          </Button>
        </Box>

        {error && (
          <Snackbar
            open={true}
            autoHideDuration={4000}
            onClose={() => setError("")}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}
      </Paper>
    </Box>
  );
}
