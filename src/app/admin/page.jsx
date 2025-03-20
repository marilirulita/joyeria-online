"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <p>Bienvenido al panel de administración.</p>
    </div>
  );
}
