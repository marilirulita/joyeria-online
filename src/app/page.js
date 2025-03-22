"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Verificar si el producto ya está en el carrito
    const productoExistente = carritoActual.find((item) => item.id === producto.id);
  
    if (productoExistente) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si no está en el carrito, agregarlo con cantidad 1
      carritoActual.push({ ...producto, cantidad: 1 });
    }
  
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
  };

  const verCarrito = () => {
    router.push("/carrito"); // Redirigir al login
  }

  return (
    <div className="m-5">
      <h1>Bienvenido a nuestra joyería</h1>
      <div className="grid grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border p-4">
            <Image 
            src={producto.imagen} 
            alt={producto.nombre} 
            width={100}
            height={100} />
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button onClick={() => agregarAlCarrito(producto)}>
              Agregar al carrito 🛒
            </button>
            <button onClick={() => verCarrito()}>
              Ver carrito 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

