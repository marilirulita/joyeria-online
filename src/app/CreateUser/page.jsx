'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getUserRole from "@/utils/auth";

export default function CreateUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const router = useRouter();

   useEffect(() => {
      const token = getUserRole();

      if (token === 'admin') {
        setIsAuthenticated(true) 
      } 
      else if (token === 'user') {
        router.push("/");
      }
      else {
        router.push("/login");
      }
  
    }, []);

    if (!isAuthenticated) {
      return <p>Cargando...</p>;
    }

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
        adminToken: "975c60456a92c092ac6d3bd9018b22a2", // Asegúrate de proteger esto
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