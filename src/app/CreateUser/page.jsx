'use client';

import { useState } from "react";

export default function CreateUser() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        email,
        password,
        role,
        adminToken: process.env.ADMIN_SECRET, // Asegúrate de proteger esto
      }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
      <input type="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}