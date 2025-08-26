import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão menu (hamburguer) */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "black",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? 0 : "-250px",
          width: "250px",
          height: "100%",
          background: "#2c3e50",
          color: "white",
          padding: "20px",
          transition: "left 0.3s ease",
          zIndex: 999,
        }}
      >
        {/* Botão fechar */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "25px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ✕
        </button>

        {/* Lista de páginas */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>
            <Link to="/nova-tarefa" style={{ color: "white", textDecoration: "none" }}>
              ➕ Adicionar nova tarefa
            </Link>
          </li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>
            <Link to="/minhas-tarefas" style={{ color: "white", textDecoration: "none" }}>
              📋 Minhas tarefas
            </Link>
          </li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>
            <Link to="/pomodoro" style={{ color: "white", textDecoration: "none" }}>
              ⏱️ Pomodoro
            </Link>
          </li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>
            <Link to="/produtividade" style={{ color: "white", textDecoration: "none" }}>
              📊 Produtividade Detalhada
            </Link>
          </li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>
            <Link to="/configuracoes" style={{ color: "white", textDecoration: "none" }}>
              ⚙️ Configurações da Conta
            </Link>
          </li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>
            <Link to="/kanban" style={{ color: "white", textDecoration: "none" }}>
              🗂️ Kanban
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
