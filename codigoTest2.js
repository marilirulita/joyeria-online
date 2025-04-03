"use client";

import { useState } from "react";
import { useContext } from "react";
import { CarritoContext } from "@/utils/CarritoContext";
import MercadoPago from "@/components/mercadoPago";
import { FaTrash } from "react-icons/fa";

export default function Carrito() {
  const [comprando, setComprando] = useState(false);
  const {
    carrito,
    eliminarDelCarrito,
    modificarCantidad,
    borrarCarrito,
    getTotalPrice,
  } = useContext(CarritoContext);

  /*   const comprar = async () => {
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
  }; */

  // funcion de conpra mercado libre

  const comprar = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productos: carrito }), // Asegúrate de pasar la lista de productos
    });

    const data = await response.json();
    if (data.init_point) {
      window.location.href = data.init_point; // Redirige a la página de pago
    } else {
      console.error("Error al generar la preferencia de pago", data.error);
    }
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
                      onClick={() =>
                        modificarCantidad(item.id, item.cantidad - 1)
                      }
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.cantidad}</span>
                    <button
                      onClick={() =>
                        modificarCantidad(item.id, item.cantidad + 1)
                      }
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
            <p className="text-lg font-bold">
              Total: ${getTotalPrice().toFixed(2)}
            </p>
            {carrito.length > 0 && (
              <button
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={comprar}
                disabled={comprando}
              >
                {comprando ? "Procesando..." : "Comprar"}
              </button> 
            )}
            <MercadoPago />
          </div>
        </div>
      )}
    </div>
  );
}

<div className="container mx-auto p-4">
<div className="text-center mb-6">
  <h2 className="text-2xl font-bold">Shopping Cart</h2>
  <p className="text-gray-600">
    This is an example of Checkout Pro integration of Mercado Pago
  </p>
</div>
<div className="flex flex-col lg:flex-row gap-6">
  <div className="w-full lg:w-2/3">
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-24 h-24">
          <img
            className="object-cover w-full h-full rounded-md"
            alt="Image of a product"
            src="../img/product.png"
          />
        </div>
        <div className="flex-1">
          <h5 className="text-lg font-semibold">Product</h5>
          <div className="text-gray-600">
            <b>Description: </b>
            <span id="product-description">Some book</span>
            <br />
            <b>Author: </b>Dale Carnegie
            <br />
            <b>Number of pages: </b>336
            <br />
            <b>Price:</b> $<span id="unit-price">10</span>
            <br />
          </div>
        </div>
        <div>
          <label htmlFor="quantity" className="font-semibold">
            Quantity
          </label>
          <input
            onChange={updatePrice}
            type="number"
            id="quantity"
            value={orderData.quantity}
            min="1"
            className="w-20 p-2 border rounded-lg text-center"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-1/3">
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold">Cart</h3>
      <div className="flex justify-between py-2 border-b">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-bold" id="cart-total">
          ${orderData.amount}
        </span>
      </div>
      <button
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400"
        onClick={onClick}
        id="checkout-btn"
        disabled={disabled}
      >
        Checkout
      </button>
    </div>
  </div>
</div>
</div>