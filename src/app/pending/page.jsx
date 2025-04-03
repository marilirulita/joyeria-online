'use client';

import { useRouter } from "next/navigation";

export default function Pending() {
  const router = useRouter();
  return (
    <div className="text-center">
      <h1 className="text-green-500 text-2xl font-bold">Pago pendiente...</h1>
      <p>Tu compra esta siendo procesada.</p>
      <button onClick={() => router.push("/")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Volver a inicio
      </button>
    </div>
  );
}
