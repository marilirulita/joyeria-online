"use client";

import { useState } from "react";
import { useContext } from "react";
import { CarritoContext } from "@/utils/CarritoContext"; 

export default function Carrito() {
  const [comprando, setComprando] = useState(false);
  const { carrito, eliminarDelCarrito, modificarCantidad, borrarCarrito } = useContext(CarritoContext);

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
    <div className="mx-5 mt-17 h-full flex-grow">
      <h1>Tu Carrito 🛍️</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        carrito.map((item, index) => (
          <div key={index} className="border p-4">
            <h2>{item.nombre}</h2>
            <p>${item.precio}</p>
            <p>Cantidad: {item.cantidad}</p>
            <input
              type="number"
              value={item.cantidad}
              min="1"
              onChange={(e) => modificarCantidad(item.id, parseInt(e.target.value))}
            />
            <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
          </div>
        ))
      )}
      {carrito.length > 0 && (
        <button onClick={comprar} disabled={comprando}>
          {comprando ? "Procesando..." : "Comprar"}
        </button>
      )}
    </div>
  );
}
