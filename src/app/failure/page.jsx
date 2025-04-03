'use client';

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <div className="text-center">
      <h1 className="text-green-500 text-2xl font-bold">¡Ops algo paso!</h1>
      <p>No se pudo procesar tu pago.</p>
      <button onClick={() => router.push("/")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Volver a inicio
      </button>
    </div>
  );
}