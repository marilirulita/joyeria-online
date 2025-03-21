"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductoCard from "@/components/ProductoCard";
import FormularioProducto from "@/components/FormProducto";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  // const [ventas, setVentas] = useState([]);
  const [editando, setEditando] = useState(false);

  // Función para cargar los productos desde la API
  const cargarProductos = async () => {
    const res = await fetch("/api/productos");
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }

    cargarProductos();

    /*  fetch("/api/ventas")
      .then((res) => res.json())
      .then((data) => setVentas(data)); */
  }, []);

  if (!isAuthenticated) {
    return <p>Cargando...</p>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("token"); // Si guardaste el token aquí
    router.push("/admin/login"); // Redirigir al login
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <p>Bienvenido al panel de administración.</p>
      {/* Este boton va en el navbar */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Cerrar sesión
      </button>

      {/* Sección de productos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Gestión de Productos</h2>
        <button
          onClick={() => setEditando(true)}
          className="bg-blue-500 text-white p-2 rounded my-2"
        >
          Nuevo Producto
        </button>
        {editando && (
          <FormularioProducto
            onActualizar={cargarProductos}
            setEditando={setEditando}
            editando={editando}
          />
        )}
        <ul>
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onActualizar={cargarProductos}
            />
          ))}
        </ul>
      </div>

      {/* {/* Sección de Ventas e Inventario
      <div>
        <h2 className="text-xl font-semibold">Reportes de Ventas</h2>
        <ul>
          {ventas.map((venta) => (
            <li key={venta.id} className="border-b py-2">
              {venta.producto} - Cantidad: {venta.cantidad} - Total: ${venta.total}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
