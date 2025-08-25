import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {user?.email}
      </Typography>
      <Button variant="outlined" color="error" onClick={logout}>
        Sair
      </Button>
    </Container>
  );
}
