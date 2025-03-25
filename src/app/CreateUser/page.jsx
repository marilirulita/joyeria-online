"use client";

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

    if (token === "admin") {
      setIsAuthenticated(true);
    } else if (token === "user") {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  if (!isAuthenticated) {
    return <p>Cargando...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getUserRole();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        email,
        password,
        role,
        adminToken: token,
      }),
    });

    const data = await response.json();
    setMessage(data.message);
    if (response.ok) {
      router.push("/admin"); // Redirige al panel de administrador
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-17">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Crear Usuario
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="nombre"
              className="w-full px-3 py-2 border rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700">Selecciona el Role:</label>
            <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-md" >
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Crear Usuario
          </button>
          {message && <p className="text-purple-500 my-4">**{message}**</p>}
        </form>
      </div>
    </div>
  );
}
