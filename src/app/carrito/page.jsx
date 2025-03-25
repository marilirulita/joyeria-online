"use client";

import { useState } from "react";
import { useContext } from "react";
import { CarritoContext } from "@/utils/CarritoContext"; 
import { FaTrash } from "react-icons/fa";

export default function Carrito() {
  const [comprando, setComprando] = useState(false);
  const { carrito, eliminarDelCarrito, modificarCantidad, borrarCarrito, getTotalPrice } = useContext(CarritoContext);

  const comprar = async () => {
    setComprando(true);

    try {
      const res = await fetch("/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productos: carrito }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Compra realizada con éxito 🎉");
        borrarCarrito();
      } else {
        alert("Hubo un problema al procesar la compra." + data.error);
      }
    } catch (error) {
      console.error("Error al comprar:", error);
    }

    setComprando(false);
  };

  return (
    <div className="container mx-auto p-6 mt-17">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito de Compras 🛍️</h1>
      {carrito.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-semibold">{item.nombre}</h2>
                  <p className="text-gray-600">${item.precio.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => modificarCantidad(item.id, item.cantidad - 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.cantidad}</span>
                    <button
                      onClick={() => modificarCantidad(item.id, item.cantidad + 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            <p className="text-lg font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
            {carrito.length > 0 && (
        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={comprar} disabled={comprando}>
          {comprando ? "Procesando..." : "Comprar"}
        </button>
      )}
          </div>
        </div>
      )}
    </div>
  );
}
