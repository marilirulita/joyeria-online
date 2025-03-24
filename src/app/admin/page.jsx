"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductoCard from "@/components/ProductoCard";
import FormularioProducto from "@/components/FormProducto";
import getUserRole from "@/utils/auth";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [editando, setEditando] = useState(false);

  // Función para cargar los productos desde la API
  const cargarProductos = async () => {
    const res = await fetch("/api/productos");
    const data = await res.json();
    setProductos(data);
  };

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

    cargarProductos();

    async function fetchVentas() {
      const res = await fetch("/api/ventas");
      const data = await res.json();
      console.log("Ventas recibidas:", data); // 👈 Imprime los datos en la consola
      setVentas(data);
    }
    fetchVentas();
  }, []);

  if (!isAuthenticated) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <p>Bienvenido al panel de administración.</p>

{/* Sección de Ventas e Inventario*/}
<div>
        <h2 className="text-xl font-semibold">Reportes de Ventas</h2>
        <ul>
        {ventas.map((venta) => 
            venta.productos.map((p) => (
              <li key={p.producto.id} className="border-b py-2">
              {p.producto.nombre} - Cantidad: {p.cantidad} 
            </li>
            ))
          )}
          {ventas.map((venta) => (
            <li key={venta.id} className="border-b py-2">
               Total: ${venta.total}
            </li>
          ))}
        </ul>

        <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => 
            venta.productos.map((p) => (
              <tr key={p.producto.id}>
              <td>{p.producto.nombre}</td>
              <td>{p.cantidad}</td>
              </tr>
            ))
          )}
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td></td>
              <td></td>
              <td>${venta.total.toFixed(2)}</td>
              <td>{new Date(venta.fecha).toLocaleDateString()}</td>
            </tr>    
          ))}
        </tbody>
      </table>
      
      </div> 

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

    </div>
  );
}
