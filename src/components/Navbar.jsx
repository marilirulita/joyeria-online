"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import getUserRole from "@/utils/auth";

export default function Navbar({ cart }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const pathname = usePathname(); // Detecta cambios en la URL

    useEffect(() => {
      setRole(getUserRole);
      
    }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("token"); // Si guardaste el token aquí
    setRole(false);
  };

  const handleLogin = () => {
    router.push("/login");
  }

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          🛍️ Mi Tienda
        </Link>

        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          <Link href="/">Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/carrito" className="relative">
            Carrito 🛒
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          {role === "admin" && 
          <div>
          <Link className="mx-2" href="/admin">Dashboard</Link>
          <Link href="/CreateUser" className="mx-2">Crear Usuario</Link>
          </div>
          } {/* Solo admins ven esto */}
        </div>
        {/* Botón de logout si hay usuario */}
        { role ? (
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded-md">
            Cerrar sesión
          </button>
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 px-3 py-1 rounded-md">
            Iniciar sesión
          </button>
        )}

        {/* Menú hamburguesa en móvil */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2 bg-gray-800 p-3">
          <Link href="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/productos" onClick={() => setMenuOpen(false)}>Productos</Link>
          <Link href="/carrito" onClick={() => setMenuOpen(false)}>Carrito 🛒</Link>
          {role === "admin" && (
            <Link href="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}
