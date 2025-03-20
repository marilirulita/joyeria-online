import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Eliminar la cookie con el token
    const response = NextResponse.json({ message: "Logout exitoso" });
    response.cookies.set("token", "", { maxAge: -1 }); // Expirar cookie
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error al hacer logout" }, { status: 500 });
  }
}