'use client';

import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  // para agregar elementos al carrito
  const agregarAlCarrito = (producto) => {
    let nuevoCarrito = [];
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      productoExistente.cantidad += 1;
      nuevoCarrito = [...carrito];
    } else {
      // Si no está en el carrito, agregarlo con cantidad 1
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // elimina un elemento del carrito
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

  // modifica cantidad de elementos
  const modificarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad > 0) {
      const nuevoCarrito = carrito.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      );
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      setCarrito(nuevoCarrito);
    }
    
  };

  // borrar carrito despues de comprar
  const borrarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  }

  const getTotalPrice = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, modificarCantidad, borrarCarrito, getTotalPrice }}>
      {children}
    </CarritoContext.Provider>
  );
};
