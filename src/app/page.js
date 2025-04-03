"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { CarritoContext } from "@/utils/CarritoContext"; 

export default function Home() {
  const [productos, setProductos] = useState([]);
  const router = useRouter();
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const mostrarToast = (id) => {
    toast.success('Producto agregado al carrito', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: id,
    });
  };

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    mostrarToast(producto.id);
  };

  const verCarrito = () => {
    router.push("/carrito");
  }

  return (
    <>
      {/* Header con anuncio */}
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Bienvenido a nuestra joyería</h1>
        <p>¡Compra ahora con envío gratis en pedidos mayores a $500!</p>
      </header>

      {/* Sección de productos */}
      <div className="container mx-auto py-10 flex-grow">
        <h2 className="text-2xl font-bold text-center mb-5">Nuestros Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="border p-4 rounded-lg shadow-lg">
            <Image 
            src={producto.imagen} 
            alt={producto.nombre} 
            width={100}
            height={100}
            className="w-full h-58 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{producto.nombre}</h3>
            <p className="text-gray-700">{producto.descripcion}</p>
            <p className="text-gray-800 font-bold">${producto.precio} MXN</p>
            <button 
            className="bg-green-500 text-white px-4 py-2 mt-2 w-full rounded"
            onClick={() => handleAgregarAlCarrito(producto)}>
              Agregar al carrito 🛒
            </button>
            <button 
            className="bg-gray-500 text-white px-4 py-2 mt-2 w-full rounded"
            onClick={() => verCarrito()}>
              Ver carrito 🛒
            </button>
          </div>
        ))}
      </div>
      </div>

    </>
  );
}

