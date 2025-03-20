'use client';

import { useState } from "react";

export default function Signup() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
      <input type="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit">Crear Cuenta</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}