'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useContext } from "react";
import { CarritoContext } from "@/utils/CarritoContext";

export default function Success() {
  const router = useRouter();

  const { borrarCarrito } = useContext(CarritoContext);

  useEffect(() => {
    borrarCarrito();
    }, []);
  
  return (
    <div className="text-center">
      <h1 className="text-green-500 text-2xl font-bold">¡Pago exitoso!</h1>
      <p>Tu compra ha sido confirmada.</p>
      <button onClick={() => router.push("/")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Volver a inicio
      </button>
    </div>
  );
}

